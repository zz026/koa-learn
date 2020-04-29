/**
 * @description user service
 * @author zzw
 */

const { User } = require('../db/model/index')
const doCrypto = require('../utils/crypto')

/**
 * @description 获取用户信息
 * @param {string} userName 用户名
 * @param {string} password 密码
 */
async function getUserInfo(userName, password) {
  const params = {
    userName
  }
  const attributes = ['id', 'userName', 'nickName', 'gender', 'cityId', 'headImg']
  if (password) {
    // Object.assign(params, {
    //   password: doCrypto(password)
    // })
    attributes.push('password')
  }
  const result = await User.findOne({
    attributes: attributes,
    where: params
  })
  if (result === null) {
    // 未找到
    return result
  }
  return result.dataValues
}

/**
 * @description 注册 创建用户
 * @param {object} userInfo 用户对象
 */
async function createUser({ userName, password, nickName, gender, headImg }) {
  const result = await User.create({
    userName,
    password: doCrypto(password),
    nickName,
    gender,
    headImg
  })
  return result.dataValues
}


module.exports = {
  getUserInfo,
  createUser
}
