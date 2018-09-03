const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  username: {type: String, require: true},
  password: {type: String, require: true},
  email: {type: String, required: true},
  userProfileIconUrl: {type: String, required: false}
}, {
  timestamps: true
})

module.exports = userSchema