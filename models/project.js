const mongoose = require('mongoose')
const Schema = mongoose.Schema

const projectSchema = new Schema({
  userId: {type: Schema.Types.ObjectId, ref: 'User'},
  projectUrl: {type: String, require: true}
})

module.exports = projectSchema 