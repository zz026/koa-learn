/**
 * @description user jsonp router
 * @author zzw
 */
const router = require('koa-router')()
const headList = require('../../static/js/headList')
const seq = require('../../db/seq')
router.prefix('/jsonp')

// jsonp返回头像地址
router.get('/headList', async (ctx, next) => {
  // 获取jsonp的callback
  const callbackName = ctx.query.callback || 'callback'
  const returnData = {
    code: 0,
    data: headList
  }
  // jsonp的script字符串
  const jsonpStr = `;${callbackName}(${JSON.stringify(returnData)})`
  // 用text/javascript，让请求支持跨域获取
  ctx.type = 'text/javascript'
  // 输出jsonp字符串
  ctx.body = jsonpStr
})

// jsonp返回地区
router.get('/area', async (ctx, next) => {
  const res = await seq.query('SELECT * FROM `t_area`', { type: seq.QueryTypes.SELECT })
  // 获取jsonp的callback
  const callbackName = ctx.query.callback || 'callback'
  const returnData = {
    code: 0,
    data: res
  }
  // jsonp的script字符串
  const jsonpStr = `;${callbackName}(${JSON.stringify(returnData)})`
  // 用text/javascript，让请求支持跨域获取
  ctx.type = 'text/javascript'
  // 输出jsonp字符串
  ctx.body = jsonpStr
})

module.exports = router