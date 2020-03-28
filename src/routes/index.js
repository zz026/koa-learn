const router = require('koa-router')()

router.get('/', async (ctx, next) => {
   await ctx.render('index', {
    title: 'Hello Koa 2!',
    name: '张三',
    flag: false,
    list: [
      { id: 1, name: '苹果' },
      { id: 2, name: '香蕉' }
    ]
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  const session = ctx.session
  session.viewNum = session.viewNum == null ? 0 : session.viewNum + 1
  ctx.body = {
    title: 'koa2 json',
    viewNum: session.viewNum
  }
})

module.exports = router
