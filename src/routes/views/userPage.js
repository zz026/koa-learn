const router = require('koa-router')()

router.prefix('/user')

router.get('/login', async (ctx, next) => {
  await ctx.render('login')
})

module.exports = router