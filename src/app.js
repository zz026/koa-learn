const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
// 环境变量
const { ENV } = require('./utils/env')
// 密钥
const { Session_SCERET_KEY } = require('./conf/sceretKey')
// session
const session = require('koa-generic-session')
const redisStore = require('koa-redis')
const { REDIS_CONF } = require('./conf/db')
// api路由
const index = require('./routes/index')
const users = require('./routes/users')
const utils = require('./routes/utils')
// 页面路由
const userPage = require('./routes/views/userPage')
const errorPage = require('./routes/views/errorPage')
// jsonp
const jsonpRouter = require('./routes/jsonp')


// error handler
onerror(app)
// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/static'))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

// logger dev环境下
if (ENV === 'dev') {
  app.use(async (ctx, next) => {
    const start = new Date()
    await next()
    const ms = new Date() - start
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
  })
}

//session 配置
app.keys = [Session_SCERET_KEY]
app.use(session({
  key: 'weibo.sid', // cookie name 默认是koa.sid
  prefix: 'weibo:sess:', // redis key的前缀 默认是koa.sess:
  cookie: {
    path: '/',
    httpOnly: true, // 只能server修改
    maxAge: 60 * 60 * 1000, // 过期时间 单位ms
  },
  // ttl: 60 * 60 * 1000, // 过期时间 单位ms
  store: redisStore({
    all: `${REDIS_CONF.host}:${REDIS_CONF.port}`,
  }),
}))



// routes
// api
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(utils.routes(), utils.allowedMethods())
// jsonp
app.use(jsonpRouter.routes(), jsonpRouter.allowedMethods())
// pages
app.use(userPage.routes(), userPage.allowedMethods())
app.use(errorPage.routes(), errorPage.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
  ctx.body = {
    code: 1,
    msg: JSON.stringify(err)
  }
});

module.exports = app
