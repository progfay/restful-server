require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const Users = require('./Users')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/signup', (req, res) => {
  const { user_id, password } = req.body
  if (!user_id || !password) {
    res.status(400).send({
      'message': 'Account creation failed',
      'cause': 'required user_id and password'
    })
    return
  }

  if (!user_id.match(/^[0-9a-zA-Z]{6,20}$/)) {
    res.status(400).send({
      'message': 'Account creation failed',
      'cause': 'user_id must be 6 to 20 characters long and only numbers and letter allowed'
    })
    return
  }

  if (!password.match(/^[a-zA-Z0-9!-/:-@¥[-`{-~]{8,20}$/)) {
    res.status(400).send({
      'message': 'Account creation failed',
      'cause': 'password must be 8 to 20 characters long and only numbers, letter and symbols allowed'
    })
    return
  }

  if (user_id in Users) {
    res.status(400).send({
      'message': 'Account creation failed',
      'cause': 'already same user_id is used'
    })
    return
  }

  Users[user_id] = { user_id, password, nickname: user_id, comment: '' }
  res.status(200).send({
    message: 'Account successfully created',
    user: { user_id, nickname: user_id }
  })
})

app.get('/users/:user_id', function (req, res) {
  if (!req.headers.authorization) {
    res.statusMessage(400).send({ 'message': 'Authentication Faild' })
    return
  }

  if (req.headers.authorization) {

  }

  res.send('Hello! The API is at http://localhost:8080/api')
})

app.use(function (req, res, next) {
  res.status(404)
  res.end('page not found')
})

app.listen(process.env.PORT || '8080')
