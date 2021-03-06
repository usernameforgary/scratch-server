const mongoose = require('mongoose')
const userSchema = require('../models/user')
const User = mongoose.model('User', userSchema)

const saveUser = (data) => {
  const user = new User(data)
  return user.save()
}

const findUserByEmail = (email) => {
  return User.
    findOne({email: email}).
    populate({
      path: 'projects',
      match: { is_active: true},
      options: { sort: { 'updatedAt': -1 } }
    })
}

const findOrAddUserReturnNew = (conditions, updates) => {
  return User.findOneAndUpdate(conditions, updates, {new: true, upsert: true}).
    populate({
      path: 'projects',
      match: { is_active: true},
      options: { sort: { 'updatedAt': -1 } }
    })
}

module.exports = {
  saveUser,
  findUserByEmail,
  findOrAddUserReturnNew,
  User
}