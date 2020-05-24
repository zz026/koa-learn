/**
 * @description blogs service
 * @author zzw
 */
const { Blogs, User } = require('../db/model/index')
 
/**
 * @description 创建微博 seq
 * @param {string} userId 用户id
 * @param {string} content 微博内容
 * @param {string} image 图片
 */
async function S_CreateBlog({ userId, content, image }) {
  const result = await Blogs.create({
    userId,
    content,
    image,
  })
  return result.dataValues
}

/**
 * @description 查询微博列表
 * @param {string} userId 用户id
 * @param {number} pageIndex 页数
 * @param {number} pageSize 条数
 */
async function S_GetBlogList({ userId, pageIndex = 1, pageSize = 10 }) {
  const params = {}
  if (userId) {
    params.userId = userId
  }
  // 查询一个列表
  const list = await Blogs.findAndCountAll({
    // attributes: ['title', 'content'],
    limit: pageSize, // 查询条数
    offset: (pageIndex - 1) * pageSize, // 跳过条数
    where: params,
    order: [ // 排序规则
      ['createdAt', 'desc']
    ],
    // 连表查
    include: [
      {
        model: User,
        attributes: ['userName', 'nickName', 'headImg'],
      }
    ]
  })
  const { count, rows: items } = list
  return {
    items: items.map(val => val.dataValues),
    pages: {
      pageIndex,
      pageSize,
      count
    }
  }
}

module.exports = {
  S_CreateBlog,
  S_GetBlogList
}