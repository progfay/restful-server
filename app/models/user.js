const mongoose = require('mongoose')
const Schema = mongoose.Schema

module.exports = mongoose.model('User', new Schema({
  user_id: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  nickname: String,
  comment: String
}))
