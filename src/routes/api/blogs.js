/**
 * @description blog router
 * @author zzw
 */

const router = require('koa-router')()
const { checkLoginApi } = require('../../middlewares/checkLogin')
const {
  C_CreateBlog,
  C_GetBlogList
} = require('../../controller/blogs')
const xss = require('xss');
const getValidate = require('../../middlewares/validator')
const blogValidate = require('../../validator/blogs')

// 前缀
router.prefix('/api/blogs')

// 创建微博
router.post('/create', checkLoginApi, getValidate(blogValidate), async (ctx, next) => {
  const { content, image } = ctx.request.body
  const userInfo = ctx.session.userInfo
  ctx.body = await C_CreateBlog({
    userInfo,
    content: xss(content),
    image
  })
})

// 查询微博列表
router.get('/getList', async (ctx, next) => {
  const { pageIndex, pageSize } = ctx.query
  console.log(pageSize)
  ctx.body = await C_GetBlogList({
    pageIndex: Number(pageIndex),
    pageSize: Number(pageSize)
  })
})


module.exports = router