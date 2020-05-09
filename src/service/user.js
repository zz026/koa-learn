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
async function S_GetUserInfo(userName, password) {
  const params = {
    userName
  }
  const attributes = ['id', 'userName', 'nickName', 'gender', 'provinceId', 'cityId', 'headImg']
  if (password) {
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
async function S_CreateUser({ userName, password, nickName, gender, provinceId, cityId, headImg }) {
  const result = await User.create({
    userName,
    password: doCrypto(password),
    nickName,
    gender,
    provinceId,
    cityId,
    headImg
  })
  return result.dataValues
}

/**
 * @description 删除用户
 * @param {string} userName 
 * @param {string} password 
 */
async function S_DestroyUser(userName, password) {
  const result = await User.destroy({
    where: {
      userName,
      password: doCrypto(password),
    }
  })
  return result > 0
}

async function S_UpdateUser({ userName, nickName, gender, provinceId, cityId, headImg }) {
  let params = {
    headImg,
    nickName,
    gender,
    provinceId,
    cityId,
  }
  const result = await User.update(params, {
    where: {
      userName
    }
  })
  return result[0] > 0
}

module.exports = {
  S_GetUserInfo,
  S_CreateUser,
  S_DestroyUser,
  S_UpdateUser
}
