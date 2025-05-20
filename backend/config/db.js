// const mongoose = require( 'mongoose' )

// MONGO_URI = 'mongodb://127.0.0.1:27017/parking-management-system'

// const db_connection = async() => {
//     mongoose.connect( MONGO_URI, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true
//     } ).then( () => console.log( 'Connected to mongo successfully ✅' ) )
//         .catch( e => console.log( 'Connection to mongo failed ❌: ', e ) )
// }

// module.exports = db_connection



const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    logging: false,
  }
)

module.exports = sequelize