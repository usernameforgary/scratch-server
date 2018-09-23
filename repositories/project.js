const mongoose = require('mongoose')
const projectSchema = require('../models/project')
const Project = mongoose.model('Project', projectSchema)
const {User} = require('./user')

const Transaction = require('mongoose-transactions')

const transaction = new Transaction()
const PROJECT = 'Project'
const USER = 'User'

const saveProject = (data) => {
  const project = new Project(data)
  return project.save()
}

const updateProjectById = (projectId, updateData) => {
  return Project.findByIdAndUpdate(projectId, updateData)
}

const saveProjectTransaction = async(projectObject) => {
  try{
    const projectId = transaction.insert(PROJECT, projectObject)
    const userDb = await User.findById(projectObject.userId)
    const userProjects = userDb.projects
    userProjects.push(projectId)
    transaction.update(USER, userDb._id, { projects: userProjects} )
    const final = await transaction.run()
    return Promise.resolve(final[0])
  } catch(error) {
    console.dir(error)
    const rollbackObj = await transaction.rollback().catch(e => {
      return Promise.reject(e)
    })
    return Promise.reject(error)
  } finally {
    transaction.clean()
  }
}

module.exports = {
  saveProject,
  saveProjectTransaction,
  updateProjectById,
}