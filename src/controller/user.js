/**
 * @deprecated user controller
 */
const { getUserInfo, createUser } = require('../service/user')
const { SuccessModal, ErrorModal } = require('../model/ResponseModal')
const { hasSameUserNameCode } = require('../model/ErrorCode')

/**
* @deprecated 用户名是否存在
* @param {string} userName 用户名
*/
async function checkName(userName) {
  // 业务逻辑处理
  const userInfo = await getUserInfo(userName)
  if (userInfo) {
    return new ErrorModal(hasSameUserNameCode)
  } else {
    return new SuccessModal()
  }
}

/**
 * @deprecated 注册用户
 * @author zzw
*/
async function registerUser(userInfo) {
  // 判断用户是否存在
  const hasUser = await getUserInfo(userInfo.userName)
  if (hasUser) {
    return new ErrorModal(hasSameUserNameCode)
  }

  // 注册
  try {
    const user = await createUser(userInfo)
    delete user.password
    return new SuccessModal(user)
  } catch(e) {
    return new ErrorModal({
      code: 10002,
      msg: e.errors[0].message
    })
    // return err.errors[0].message
  }
  // console.log('user', user)
}

module.exports = {
  checkName,
  registerUser
}