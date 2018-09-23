const {
  saveProject,
  saveProjectTransaction,
  updateProjectById,
} = require('../repositories/project')
const logger = require('../utilities/logger')
const path = require('path')
const multer = require('multer')
const fs = require('fs')

const PROJECT_PATH = path.join(__dirname, '../public/uploaded/')
const PROJECT_URL = `/uploaded/`
const PUBLIC_PATH = path.join(__dirname, '../public')

function saveProjectToDisk(req, res, projectPath) {
  let fileName = ''
  const storage = multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, PROJECT_PATH)
    },
    filename: (req, file, callback) => {
      fileName = file.originalname
      callback(null, file.originalname)
    }
  })
  const upload = multer({storage: storage}).any()
  return new Promise((resolve, reject) => {
    upload(req, res, err => {
      if(err) {
        reject(`保存文件失败，${err.message}`)
      } else {
        resolve(fileName)
      }
    })
  })
} 

exports.save = async(req, res) => {
  try {
    const fileName = await saveProjectToDisk(req, res)
    const userId = req.body.userId
    if(!userId) {
      res.preconditionFailed(`项目保存失败, user id not provide`)
      return
    }
    const projectUrl = `${PROJECT_URL}${fileName}`
    try {
      const projectName = fileName.substring(fileName.indexOf('_') + 1, fileName.lastIndexOf('.'))
      const projectId = req.body.projectId
      const saveAsCopy = req.body.saveAsCopy.toLowerCase() === 'true'
      let projectRes = null;
      if((projectId !== 'null') && (projectId !== '') && !saveAsCopy) {
        console.dir(`......update exist project...`)
        projectRes = await updateProjectById(projectId, {
          projectName: projectName,
          projectUrl: projectUrl
        })
      } else {
        console.dir('.....save new project....')
        projectRes = await saveProjectTransaction({
          userId: userId,
          projectUrl: projectUrl,
          projectName: projectName
        })
      }
      res.success({
        userId: userId,
        project: projectRes 
      })
    } catch(err) {
      res.preconditionFailed(`项目保存失败, db error: ${err.message}`)
    }
  } catch(err) {
    res.preconditionFailed(err.message || err)
  }
}

exports.deleteById = async (req, res) => {
  const projectId = req.body.projectId
  if(!projectId) {
    res.preconditionFailed(`Select project need to be deleted`)
    return
  }
  try{
    const updateRes = await updateProjectById(projectId, {is_active: false})
    res.success({
      projectId: projectId,
      deleted: true
    })
  } catch(err) {
    res.preconditionFailed(err.message || err)
  }
}

exports.getContentById = async(req, res) => {
  const project = req.body.project
  if(!(project || project.projectUrl)) {
    res.preconditionFailed(`No project or project id provider`)
    return
  }
  const filePath = path.join(PUBLIC_PATH, project.projectUrl)
  try {
    const result = fs.readFileSync(filePath)
    res.success({
      result: result
    })
  } catch(e) {
    console.dir(e)
    res.preconditionFailed(`Read file failed`)
  }
}