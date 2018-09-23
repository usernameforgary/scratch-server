const { saveUser, findUserByEmail} = require('../repositories/user')
const logger = require('../utilities/logger')
const crypto = require('../utilities/customCrypto')

//User Sign up
//TODO international error message
exports.login = async(req, res) => {
  const { user } = req.body;
  if(!user) {
    res.preconditionFailed('请完善用户信息')
    return
  }
  if(!user.email) {
    res.preconditionFailed('请完善邮箱信息')
    return
  }
  try {
    const dbUser = await findUserByEmail(user.email)
    if(!dbUser) {
      res.preconditionFailed('当前用户不存在')
      return
    }
    if(!(crypto.decrypt(user.password) === crypto.decrypt(dbUser.password))) {
      res.preconditionFailed('用户名或密码不正确')
      return
    }
    res.success({ user: dbUser});
  } catch(err) {
    logger.log('error', `login error, ${err.message}`)
    res.preconditionFailed(err.message)
  }
}

//User register
//TODO international error message
exports.register = async(req, res) => {
  const { user } = req.body;
  //TODO should use validation modules(express validation or joi for example) check request data
  if(!user) {
    res.preconditionFailed('请完善用户信息')
    return
  }
  if(!user.email) {
    res.preconditionFailed('请完善邮箱信息')
    return
  }
  try {
    const existUser = await findUserByEmail(user.email)
    if(existUser) {
      res.preconditionFailed('用户已存在')
      return
    }
  } catch (err) {
    logger.log('error', `register catch error, ${err.message}`)
    res.preconditionFailed(err)
    return
  }

  try {
    const insertUserRes = await saveUser(user)
    res.success({ user: insertUserRes});
  } catch (err) {
    logger.log('error', `register catch error, ${err.message}`)
    res.preconditionFailed(err)
  } 
}