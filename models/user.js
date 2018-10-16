const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  s_id: {type: String, required: true},
  account: {type: String},
  username: {type: String, require: true},
  password: {type: String},
  email: {type: String, required: true},
  userProfileIconUrl: {type: String, required: false},
  projects: [{type: Schema.Types.ObjectId, ref: 'Project'}]
}, {
  timestamps: true
})

module.exports = userSchema