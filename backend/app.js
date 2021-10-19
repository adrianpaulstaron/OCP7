require('dotenv').config()
const express = require('express')
const app = express()
const path = require ('path');
const cors = require('cors');
const helmet = require("helmet");


/* -------------- SÉCURITÉ -------------- */

/* CROSS ORIGIN RESOURCE SHARING CORS */
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(helmet());

var RateLimit = require('express-rate-limit');
app.enable('trust proxy'); // only if you're behind a reverse proxy (Heroku, Bluemix, AWS if you use an ELB, custom Nginx setup, etc) 
var limiter = new RateLimit({
  windowMs: 15*60*1000, // 15 minutes 
  max: 10000, // limit each IP to 100 requests per windowMs 
  delayMs: 0 // disable delaying - full speed until the max limit is reached 
});
//  apply to all requests 
app.use(limiter);


app.use('/images', express.static(path.join(__dirname, 'images')));

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


// Middleware
app.use(express.json())

app.use('/api/users', usersRoutes)
app.use('/api/posts', postsRoutes)
app.use('/api/comments', commentsRoutes)

module.exports = app; 