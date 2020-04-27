const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!',
    name: '微博',
    flag: false,
    list: [
      { id: 1, name: '苹果' },
      { id: 2, name: '香蕉' }
    ]
  })
})

router.get('/json', async (ctx, next) => {
  const session = ctx.session
  session.viewNum = session.viewNum == null ? 0 : session.viewNum + 1
  ctx.body = {
    title: 'koa2 json',
    viewNum: session.viewNum
  }
})

router.get('/json2', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json2',
  }
})

module.exports = router
