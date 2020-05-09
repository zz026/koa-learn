/**
 * @description blogs service
 * @author zzw
 */
const { Blogs } = require('../db/model/index')

 
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


module.exports = {
  S_CreateBlog
}