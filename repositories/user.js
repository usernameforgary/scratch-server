const mongoose = require('mongoose')
const userSchema = require('../models/user')
const User = mongoose.model('User', userSchema)

const saveUser = (data) => {
  const user = new User(data)
  return user.save()
}

const findUserByEmail = (email) => {
  return User.findOne({email: email})
}

module.exports = {
  saveUser,
  findUserByEmail
}