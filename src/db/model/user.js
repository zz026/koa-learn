/**
 * @description 用户数据模型
 * @author zzw
 */

const seq = require('../seq')
const { STRING, DECIMAL, DATE } = require('sequelize');

const User = seq.define('t_user', {
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
  headImg: {
    type: STRING,
    comment: '头像',
  },
  provinceId: {
    type: STRING(20),
    comment: '省份id',
  },
  cityId: {
    type: STRING(20),
    comment: '城市id',
  },
  // createDate: {
  //   type: DATE,
  // },
  // updateDate: {
  //   type: DATE,
  // },
},
{
  freezeTableName: true, // 默认false修改表名为复数，true不修改表名，与数据库表名同步
  // timestamps: false // 是否自动添加时间戳createAt，updateAt
}
)

module.exports = User