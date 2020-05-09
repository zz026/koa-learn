/**
 * @description 数据模型入口文件
 * @author zzw
 */

const User = require('./User')
const Blogs = require('./Blogs')

// 创建外键 查询微博时查出用户
Blogs.belongsTo(User, {
  foreignKey: 'userId'
})

// 查询用户，查出微博
// User.hasMany(Blogs, {
//   foreignKey: 'userId'
// })

module.exports = {
  User,
  Blogs
}