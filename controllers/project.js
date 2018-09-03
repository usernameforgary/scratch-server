const { saveProject } = require('../repositories/project')
const logger = require('../utilities/logger')
const path = require('path')
const multer = require('multer')

const PROJECT_PATH = path.join(__dirname, '../public/uploaded/')
const PROJECT_URL = `/public/uploaded/`

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
    const projectUrl = `${PROJECT_URL}${fileName}`
    try {
      const saveRes = await saveProject({
        userId: userId,
        projectUrl: projectUrl
      })
      res.success({
        id: saveRes._id,
        userId: saveRes.userId,
        projectUrl: saveRes.projectUrl
      })
    } catch(err) {
      res.preconditionFailed(`项目保存失败, db error: ${err.message}`)
    }
  } catch(err) {
    res.preconditionFailed(err.message || err)
  }
}