/**
 * @description 用户页面 router
 * @author zzw
 */
const router = require('koa-router')()
const { checkLoginApiPage } = require('../../middlewares/checkLogin')

router.prefix('/user')

// 登录页
router.get('/login', async (ctx, next) => {
  await ctx.render('user/login', {
    userInfo: ctx.session.userInfo || {}
  })
})

// 注册页
router.get('/register', async (ctx, next) => {
  await ctx.render('user/register', {
    userInfo: ctx.session.userInfo || {}
  })
})

// 个人中心页
router.get('/setting', checkLoginApiPage, async (ctx, next) => {
  await ctx.render('user/setting', {
    userInfo: ctx.session.userInfo || {}
  })
})

// 修改密码页
router.get('/changePwd', checkLoginApiPage, async (ctx, next) => {
  await ctx.render('user/changePwd', {
    userInfo: ctx.session.userInfo || {}
  })
})

module.exports = router