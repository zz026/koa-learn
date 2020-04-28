/**
 * @description user controller
 */
const { getUserInfo, createUser } = require('../service/user')
const { SuccessModal, ErrorModal } = require('../model/ResponseModal')
const {
  jsonErrorCode,
  hasUserNameCode,
  userNameErrorCode,
  userPsdErrorCode,
} = require('../model/ErrorCode')
const doCrypto = require('../utils/crypto')

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
*/
async function loginUser(userName, password) {
  const userInfo = await getUserInfo(userName, password)
  // 用户不存在
  if (!userInfo) {
    return new ErrorModal(userNameErrorCode)
  }
  // 密码一致
  console.log(userInfo)
  if (userInfo.password === doCrypto(password)) {
    delete userInfo.password
    return new SuccessModal(userInfo)
  } else {
    return new ErrorModal(userPsdErrorCode)
  }
}

module.exports = {
  checkName,
  registerUser,
  loginUser
}
