const express = require('express')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

// Mongoose & DB
const mongoose = require('mongoose')
const connect = () => mongoose.connect('mongodb://localhost/test')
connect()
mongoose.connection.on('error', console.error)
mongoose.connection.on('disconnected', connect)

const app = express()

// // set if behind proxy
// app.set('trust proxy', 1) 
app.use(session({
  secret: 'keyboard dog',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

// Env setup
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

// Routing
const index = require('./routes/index')
const users = require('./routes/users')
const foods = require('./routes/foods')
const exercises = require('./routes/exercises')
const progress = require('./routes/progress')

app.use('/api', index)
app.use('/api/users', users)
app.use('/api/foods', foods)
app.use('/api/exercises', exercises)
app.use('/api/progress', progress)

app.use((err, req, res, _) => {
  let status = 500
  switch(err.name) {
    case 'ValidationError':
      status = 400
      break
  }
  return res.status(status).json({
    type: err.name,
    message: err.message
  })
})

module.exports = app

