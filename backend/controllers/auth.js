// controllers/auth.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');      // Sequelize model
const transporter = require('../utils/email');
require('dotenv').config();

const SECRET = process.env.JWT_SECRET;

/* -------------------------------------------------------------------------- */
/*  SIGN-UP                                                                   */
/* -------------------------------------------------------------------------- */
exports.signup = async (req, res) => {
  const { names, email, password, role } = req.body;

  try {
    // Sequelize: findOne uses `where`
    const existing = await User.findOne({ where: { email } });
    if (existing) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password and embed it in the e-mail-verification token
    const hashed = await bcrypt.hash(password, 10);
    const token  = jwt.sign(
      { names, email, password: hashed, role },
      SECRET,
      { expiresIn: '15m' }
    );

    const url = `http://localhost:45000/auth/verify?token=${token}`;

    // Send verification e-mail
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Verify your email',
      html: `
        <h3>Verify your email</h3>
        <h4>PMS is trying to verify your email address for registration.</h4>
        <h4>Click <a href="${url}">here</a> to verify your email address.</h4>
      `,
    });

    res.status(201).json({ message: 'Verification email sent successfully.' });
  } catch (e) {
    console.error('Signup error: ', e);
    res.status(500).json({ message: 'Internal server error' });
  }
};

/* -------------------------------------------------------------------------- */
/*  LOGIN                                                                     */
/* -------------------------------------------------------------------------- */
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Sequelize: where clause
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ message: 'Invalid email or password' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

    if (!user.isVerified) {
      return res.status(401).json({ message: 'Email not verified' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role, name: user.names },
      SECRET,
      { expiresIn: '10h' }
    );

    res.json({ token });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

/* -------------------------------------------------------------------------- */
/*  VERIFY EMAIL                                                              */
/* -------------------------------------------------------------------------- */
exports.verify = async (req, res) => {
  const { token } = req.query;

  try {
    // Decode data embedded in the token
    const { names, email, password, role } = jwt.verify(token, SECRET);

    // Check again if user already exists
    const existing = await User.findOne({ where: { email } });
    if (existing) return res.status(400).json({ message: 'User already exists' });

    // Create user (isVerified defaults to false, override to true)
    await User.create({ names, email, password, role, isVerified: true });

    // Redirect to front-end login page
    return res.redirect('http://localhost:8080/login');
  } catch (err) {
    console.error('Verification error:', err);
    return res.status(400).json({ message: 'Invalid or expired token' });
  }
};

/* -------------------------------------------------------------------------- */
/*  GET PROFILE                                                               */
/* -------------------------------------------------------------------------- */
exports.get_profile = async (req, res) => {
  try {
    // `findByPk` = find by primary key
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ['password'] },
    });

    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    console.error('Profile fetch error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
