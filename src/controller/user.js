/**
 * @description user controller
 */
const { getUserInfo, createUser, destroyUser } = require('../service/user')
const { SuccessModal, ErrorModal } = require('../model/ResponseModal')
const {
  jsonErrorCode,
  hasUserNameCode,
  userNameErrorCode,
  userPsdErrorCode,
} = require('../model/ErrorCode')
const doCrypto = require('../utils/crypto')
// const { set } = require('../cache/_redis')

/**
* @description 用户名是否存在
* @param {string} userName 用户名
*/
async function checkName(userName) {
  // 业务逻辑处理
  const userInfo = await getUserInfo(userName)
  if (userInfo) {
    return new ErrorModal(hasUserNameCode)
  } else {
    return new SuccessModal()
  }
}

/**
 * @description 注册用户
 * @author zzw
*/
async function registerUser(userInfo) {
  // 判断用户是否存在
  const hasUser = await getUserInfo(userInfo.userName)
  if (hasUser) {
    return new ErrorModal(hasUserNameCode)
  }

  // 注册
  try {
    const user = await createUser(userInfo)
    delete user.password
    return new SuccessModal(user)
  } catch(e) {
    return new ErrorModal({
      ...jsonErrorCode,
      msg: e.errors[0].message
    })
  }
}

/**
 * @description 登录login
 * @author zzw
 * @param {Object} ctx koa2 ctx
 * @param {string} userName 用户名
 * @param {string} password 密码
 */
async function loginUser(ctx, userName, password) {
  const userInfo = await getUserInfo(userName, password)
  // 用户不存在
  if (!userInfo) {
    return new ErrorModal(userNameErrorCode)
  }
  // 密码一致
  if (userInfo.password === doCrypto(password)) {
    delete userInfo.password
    // 用户信息存在session
    ctx.session.userInfo = userInfo
    return new SuccessModal(userInfo)
  } else {
    return new ErrorModal(userPsdErrorCode)
  }
}

/**
 * @description 删除用户
 * @author zzw
 * @param {string} userName 用户名
 * @param {string} password 密码
 */

async function deleteUser(userName, password) {
  const result = await destroyUser(userName, password)
  console.log('result', result)
  if (result) {
    return new SuccessModal()
  } else {
    return new ErrorModal(userPsdErrorCode)
  }
}

module.exports = {
  checkName,
  registerUser,
  loginUser,
  deleteUser
}
