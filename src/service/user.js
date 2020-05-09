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
 * @param {string} userName 用户名
 * @param {string} password 密码
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


/**
 * @description 修改用户信息
 * @author zzw
 * @param {string} userName 用户名
 * @param {string} nickName 昵称
 * @param {number} gender 性别
 * @param {string} provinceId 省份id
 * @param {string} cityId 城市id
 * @param {string} headImg 头像地址
 */
async function S_UpdateUser({ userName, nickName, gender, provinceId, cityId, headImg }) {
  const params = {
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

/**
 * @description 修改用户密码
 * @author zzw
 * @param {string} userName 用户名
 * @param {string} password 旧密码
 * @param {string} newPassword 新密码
 */
async function S_ChangeUserPwd(userName, password, newPassword) {
  const params = {
    password: doCrypto(newPassword),
  }
  const result = await User.update(params, {
    where: {
      userName,
      password: doCrypto(password),
    }
  })
  return result[0] > 0
}

module.exports = {
  S_GetUserInfo,
  S_CreateUser,
  S_DestroyUser,
  S_UpdateUser,
  S_ChangeUserPwd,
}
