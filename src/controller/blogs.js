/**
 * @description blogs controller
 */

// 返回模型
const { SuccessModal, ErrorModal } = require('../model/ResponseModal')
// service层
const {
  S_CreateBlog,
  S_GetBlogList
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

/**
* @description 查询微博列表
* @param {string} userId 用户名
* @param {number} pageIndex 页数
* @param {number} pageSize 条数
*/
async function C_GetBlogList({ userId, pageIndex, pageSize }) {
  // 业务逻辑处理
  const list = await S_GetBlogList({ userId, pageIndex, pageSize })
  if (list) {
    return new SuccessModal(list)
  } else {
    return new ErrorModal()
  }
}

module.exports = {
  C_CreateBlog,
  C_GetBlogList
}