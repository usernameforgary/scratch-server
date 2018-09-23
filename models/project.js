const mongoose = require('mongoose')
const Schema = mongoose.Schema

const projectSchema = new Schema({
  userId: {type: Schema.Types.ObjectId, ref: 'User'},
  projectName: {type: String},
  projectIcon: {type: String},
  projectUrl: {type: String, require: true},
  is_active: {type: Boolean, required: true, default: true},
  project_description: {type: String},
  operation_description: {type: String},
  is_public: {type: Boolean, required: true, default: false}
},{
  timestamps: true
})

module.exports = projectSchema 