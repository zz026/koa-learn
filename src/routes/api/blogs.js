/**
 * @description blog router
 * @author zzw
 */

const router = require('koa-router')()
const { checkLoginApi } = require('../../middlewares/checkLogin')
const {
  C_CreateBlog
} = require('../../controller/blogs')
// 前缀
router.prefix('/api/blogs')

// 创建微博
router.post('/create', checkLoginApi, async (ctx, next) => {
  const { content, image } = ctx.request.body
  const { id: userId } = ctx.session.userInfo
  ctx.body = await C_CreateBlog({ userId, content, image })
})
module.exports = router