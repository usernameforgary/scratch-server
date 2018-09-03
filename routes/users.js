var express = require('express');
var router = express.Router();
const controller = require('../controllers/user')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/signin', controller.login);

router.post('/signup', controller.register)

module.exports = router;
