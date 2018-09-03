var express = require('express');
var crypto = require('../utilities/customCrypto')
var router = express.Router();

const mongoose = require('../config/mongoose')
/* GET home page. */
router.get('/', function(req, res, next) {
  const hello = 'Hello world'
  const encryptStr = crypto.encrypt(hello)
  console.dir(encryptStr)
  console.dir(crypto.decrypt(encryptStr))
  res.render('index', { title: 'Express' });
});

module.exports = router;
