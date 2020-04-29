const router = require('koa-router')()
const headList = require('../static/js/headList')
router.prefix('/jsonp')

// jsonp返回头像地址
router.get('/headList', async (ctx, next) => {
  // 获取jsonp的callback
  let callbackName = ctx.query.callback || 'callback'
  let returnData = {
    code: 0,
    data: headList
  }
  // jsonp的script字符串
  let jsonpStr = `;${callbackName}(${JSON.stringify(returnData)})`
  // 用text/javascript，让请求支持跨域获取
  ctx.type = 'text/javascript'
  // 输出jsonp字符串
  ctx.body = jsonpStr
})

module.exports = router