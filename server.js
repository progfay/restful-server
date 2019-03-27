require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const { MONGO_ADDRESS } = process.env
// const User = require('./app/models/user')

mongoose.connect(MONGO_ADDRESS)

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', function (req, res) {
  res.send('Hello! The API is at http://localhost:8080/api')
})

app.post('/signup', (req, res) => {
  const { user_id, password } = req.body
  if (!user_id || !password) {
    res.status(400).send({
      'message': 'Account creation failed',
      'cause': 'required user_id and password'
    })
  }

  if (!user_id.match(/^[0-9a-zA-Z]{6,20}$/)) {
    res.status(400).send({
      'message': 'Account creation failed',
      'cause': 'user_id must be 6 to 20 characters long and only numbers and letter allowed'
    })
  }

  if (!password.match(/^[a-zA-Z0-9!-/:-@¥[-`{-~]{8,20}$/)) {
    res.status(400).send({
      'message': 'Account creation failed',
      'cause': 'password must be 8 to 20 characters long and only numbers, letter and symbols allowed'
    })
  }
})

// app.listen('8080')
// console.log('started http://localhost:8080/')

module.exports = app
