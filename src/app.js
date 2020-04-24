const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
// session
const session = require('koa-generic-session')
const redisStore = require('koa-redis')
const { REDIS_CONF } = require('./conf/db')

const index = require('./routes/index')
const users = require('./routes/users')
const userPage = require('./routes/views/userPage')
const errorPage = require('./routes/views/errorPage')

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

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})


//session 配置
app.keys = ['weibo']
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
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(userPage.routes(), userPage.allowedMethods())
app.use(errorPage.routes(), errorPage.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
