/**
 * @description user controller
 */
const { S_GetUserInfo, S_CreateUser, S_DestroyUser, S_UpdateUser } = require('../service/user')
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
async function C_CheckName(userName) {
  // 业务逻辑处理
  const userInfo = await S_GetUserInfo(userName)
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
async function C_RegisterUser(userInfo) {
  // 判断用户是否存在
  const hasUser = await S_GetUserInfo(userInfo.userName)
  if (hasUser) {
    return new ErrorModal(hasUserNameCode)
  }

  // 注册
  try {
    const user = await S_CreateUser(userInfo)
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
async function C_LoginUser(ctx, userName, password) {
  const userInfo = await S_GetUserInfo(userName, password)
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
async function C_DeleteUser(userName, password) {
  const result = await S_DestroyUser(userName, password)
  if (result) {
    return new SuccessModal()
  } else {
    return new ErrorModal(userPsdErrorCode)
  }
}

/**
 * @description 退出登录
 * @author zzw
 * @param {object} ctx ctx 
 */
async function C_LogoutUser(ctx) {
  delete ctx.session.userInfo
  return new SuccessModal()
}

/**
 * @description 获取用户详情
 * @author
 */
async function C_GetUserINfo(ctx) {
  const userInfo = await S_GetUserInfo(ctx.session.userInfo.userName)
  // 用户信息存在session
  ctx.session.userInfo = userInfo
  return new SuccessModal(userInfo)
}

/**
 * @description 更新用户信息
 * @author
 */
async function C_UpdateUser(ctx, { nickName, gender, provinceId, cityId, headImg }) {
  const { userName } = ctx.session.userInfo
  const result = await S_UpdateUser({ userName, nickName, gender, provinceId, cityId, headImg })
  if (result) {
    // 更新用户信息
    const userInfo = await S_GetUserInfo(userName)
    ctx.session.userInfo = userInfo
    return new SuccessModal()
  } else {
    return new ErrorModal(userPsdErrorCode)
  }
}

module.exports = {
  C_CheckName,
  C_RegisterUser,
  C_LoginUser,
  C_DeleteUser,
  C_LogoutUser,
  C_GetUserINfo,
  C_UpdateUser
}
