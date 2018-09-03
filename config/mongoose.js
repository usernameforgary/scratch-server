const config = require('./index') 
const mongoose = require('mongoose')

module.exports = function(app) {
  const mongoConfig = config.MONGO_CONFIG
  mongoose.connect(mongoConfig.mongoUrl, { 
    useNewUrlParser: true,
    user: mongoConfig.user,
    pass: mongoConfig.pass
  })
  mongoose.Promise = global.Promise

  process.on('SIGINT', cleanup)
  process.on('SIGTERM', cleanup)
  process.on('SIGHUP', cleanup)

  if(app) {
    app.set('mongoose', mongoose)
  }
}

function cleanup() {
  mongoose.connection.close(function() {
    process.exit(0)
  })
}
