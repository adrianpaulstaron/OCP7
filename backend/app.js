require('dotenv').config()
const express = require('express')
const app = express()
const path = require ('path');

// const { Sequelize, Model, DataTypes } = require('sequelize');
// sequelize = await new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
//   host: process.env.DB_HOST,
//   port: process.env.DB_HOST_PORT,
//   dialect: 'mysql'
// });  


const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: process.env.DB_HOST_PORT,
  dialect: 'mysql'
});

const usersRoutes = require('./routes/users')
const postsRoutes = require('./routes/posts')
const commentsRoutes = require('./routes/comments')


async function CoTest() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
CoTest()

// const userRoutes = require('./routes/user')
const helmet = require("helmet");

app.use(helmet());

// le front et le back tournent sur la même machine, on avait donc une erreur car il s'agit d'une violation des règles de sécurité de cors
// on autorise donc l'url sur laquelle on fait tourner le front, pour le développement
// const cors = require('cors');
// app.use(cors({
//     origin: 'http://localhost:8081'
// }));

var RateLimit = require('express-rate-limit');
app.enable('trust proxy'); // only if you're behind a reverse proxy (Heroku, Bluemix, AWS if you use an ELB, custom Nginx setup, etc) 
var limiter = new RateLimit({
  windowMs: 15*60*1000, // 15 minutes 
  max: 50, // limit each IP to 100 requests per windowMs 
  delayMs: 0 // disable delaying - full speed until the max limit is reached 
});
//  apply to all requests 
app.use(limiter);

// Middleware
app.use(express.json())

// const mongoose = require('mongoose');
// main().catch(err => console.log(err));
// // on connecte mongoose à la bonne bdd
// async function main() {
//   await mongoose.connect(process.env.DB_CONNECT_URI);
// }

app.use('/api/users', usersRoutes)
app.use('/api/posts', postsRoutes)
app.use('/api/comments', commentsRoutes)

module.exports = app; 