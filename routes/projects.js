var express = require('express')
var router = express.Router()
const controller = require('../controllers/project')

router.post('/save', controller.save);

module.exports = router;
