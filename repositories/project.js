const mongoose = require('mongoose')
const projectSchema = require('../models/project')
const Project = mongoose.model('Project', projectSchema)

const saveProject = (data) => {
  const project = new Project(data)
  return project.save()
}

module.exports = {
  saveProject,
}