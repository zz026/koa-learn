/**
 * @description 用户数据模型
 * @author zzw
 */

const seq = require('../seq')
const { STRING, DECIMAL } = require('sequelize');

const User = seq.define('user', {
  userName: {
    type: STRING(20),
    allowNull: false, // 不能为空
    unique: true, // 唯一
    comment: '用户名 唯一',
  },
  nickName: {
    type: STRING(20),
    allowNull: false, // 不能为空
    comment: '昵称',
  },
  password: {
    type: STRING(50),
    allowNull: false, // 不能为空
    comment: '密码',
  },
  gender: {
    type: DECIMAL,
    allowNull: false, // 不能为空
    defaultValue: 3,
    comment: '性别 (1男 2女3 保密)',
  },
  logo: {
    type: STRING,
    comment: '头像',
  },
  cityId: {
    type: STRING(20),
    comment: '城市id',
  },
})

module.exports = User