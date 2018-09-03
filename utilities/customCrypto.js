const CryptoJS = require('crypto-js')
const config = require('../config')

exports.encrypt = function(text) {
  return CryptoJS.AES.encrypt(text, config.CRYPTO_CONFIG.secretKey).toString()
}

exports.decrypt = function(text) {
  const bytes = CryptoJS.AES.decrypt(text, config.CRYPTO_CONFIG.secretKey)
  return bytes.toString(CryptoJS.enc.Utf8);
}