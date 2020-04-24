/**
 * @deprecated user service
 * @author zzw
 */

const { User } =  require('../db/model/index')

/**
 * @deprecated 获取用户信息
 * @param {string} userName 用户名
 * @param {string} password 密码
 */
async function getUserInfo(userName, password) {
  const params = {
    userName
  }
  if (password) {
    Object.assign(params, { password })
  }
  const result = await User.findOne({
    attributes: ['id', 'userName', 'nickName', 'cityId', 'logo'],
    where: params
  })
  if (result === null) {
    // 未找到
    return result
  }
  return result.dataValues
}

module.exports = {
  getUserInfo
}