/**
 * @description blogs controller
 */

// 返回模型
const { SuccessModal, ErrorModal } = require('../model/ResponseModal')
// service层
const {
  S_CreateBlog,
} = require('../service/blogs')

/**
 * @description 创建微博
 * @param {string} userId 用户id
 * @param {string} content 微博内容
 * @param {string} image 图片
 */
async function C_CreateBlog({ userId, content, image }) {
  try {
    const blog = await S_CreateBlog({ userId, content, image })
    return new SuccessModal(blog)
  } catch(e) {
    return ErrorModal({
      msg: e
    })
  }
}

module.exports = {
  C_CreateBlog
}