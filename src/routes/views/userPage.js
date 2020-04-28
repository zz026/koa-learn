const router = require('koa-router')()

router.prefix('/user')

// 登录页
router.get('/login', async (ctx, next) => {
  await ctx.render('login', {
    userInfo: ctx.session.userInfo || {}
  })
})
// 注册页
router.get('/register', async (ctx, next) => {
  await ctx.render('register', {
    userInfo: ctx.session.userInfo || {}
  })
})

module.exports = router