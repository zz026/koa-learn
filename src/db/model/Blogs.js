/**
 * @description 微博数据模型
 * @author zzw
 */

const seq = require('../seq')
const { INTEGER, STRING } = require('sequelize');

const Blogs = seq.define('t_blogs', {
  userId: {
    type: INTEGER,
    allowNull: false, // 不能为空
    comment: '用户id',
  },
  content: {
    type: STRING(255),
    allowNull: false, // 不能为空
    comment: '微博内容',
  },
  image: {
    type: STRING,
    comment: '图片地址',
  }
},
{
  freezeTableName: true, // 默认false修改表名为复数，true不修改表名，与数据库表名同步
  // timestamps: false // 是否自动添加时间戳createAt，updateAt
}
)

module.exports = Blogs