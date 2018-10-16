var express = require('express')
var router = express.Router()
const controller = require('../controllers/project')

router.post('/save', controller.save);
router.post('/delete', controller.deleteById);
router.post('/toggleShare', controller.toggleShareById)
router.post('/getContent', controller.getContentById)
router.get('/getSharedProjects', controller.getSharedProjects)
router.post('/updateDescription', controller.updateProjectDescription)

module.exports = router;
