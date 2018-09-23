var express = require('express')
var router = express.Router()
const controller = require('../controllers/project')

router.post('/save', controller.save);
router.post('/delete', controller.deleteById);
router.post('/getContent', controller.getContentById)

module.exports = router;
