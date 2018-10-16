const { saveUser, findUserByEmail, findOrAddUserReturnNew } = require('../repositories/user')
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

exports.userCookieLogin = async(req, res) => {
  const { s_id, username, account, head_img } = req.body
  if(!s_id) {
    res.preconditionFailed('当前登录用户s_id未提供, 请重新登录')
    return
  }
  try {
    const user = await findOrAddUserReturnNew({s_id: s_id}, {
      username: username,
      account: account,
      userProfileIconUrl: head_img
    })
    res.success({ user: user });
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

exports.userLoginMock = async(req, res) => {
  const {log_account, log_password} = req.body
  res.send({
    status: 1,
    s_id: 'jimmy',
    account: '13585923052',
    head_img: '',
    username: 'Jimmy'
  })
}