const consts = require('../../consts')

const MONGO_CONFIG = {
  host: "127.0.0.1",
  port: 27017,
  mongoUrl: "mongodb://localhost:27017/scratch",
  logLevel: "debug",
  secret: "scratch123",
  user: 'scratch',
  pass: 'scratch123'
}

const CRYPTO_CONFIG = {
  secretKey: 'KuDingProgramming'
}

module.exports = {
  MONGO_CONFIG,
  CRYPTO_CONFIG,
}