const express = require('express')
const router = express.Router()

const { verify_token } = require('../middlewares/auth')
const controller = require('../controllers/booking')

router.use(verify_token)

/**
 * @swagger
 * /bookings/all:
 *   get:
 *     summary: Get all bookings that belong to the currently-logged-in user
 *     tags: [Bookings]
 *     responses:
 *       200:
 *         description: List of bookings
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Booking'
 */
router.get('/all', controller.getBookings)

/**
 * @swagger
 * /bookings/add:
 *   post:
 *     summary: Create a new booking
 *     tags: [Bookings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [slotId, startTime, endTime, totalAmount]
 *             properties:
 *               slotId:      { type: string }
 *               startTime:   { type: string, format: date-time }
 *               endTime:     { type: string, format: date-time }
 *               totalAmount: { type: number }
 *     responses:
 *       201:
 *         description: Booking created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Booking'
 *       400:
 *         description: Validation error
 */
router.post('/add', controller.addBooking)

/**
 * @swagger
 * /bookings/cancel/{id}:
 *   patch:
 *     summary: Cancel an existing booking
 *     tags: [Bookings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Booking cancelled
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Booking'
 *       400:
 *         description: Validation / business-logic error
 */
router.patch('/cancel/:id', controller.cancelBooking)

module.exports = router
