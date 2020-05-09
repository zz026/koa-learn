/**
 * @description 验证是否登录中间件
 * @author zzw
*/

const { ErrorModal } = require('../model/ResponseModal')
const { noLoginCode } = require('../model/ErrorCode')

// api
async function checkLoginApi(ctx, next) {
  // 已登录
  if (ctx.session && ctx.session.userInfo) {
    await next()
    return 
  }
  ctx.body = new ErrorModal(noLoginCode)
}

// 页面
async function checkLoginApiPage(ctx, next) {
  // 已登录
  if (ctx.session && ctx.session.userInfo) {
    await next()
    return 
  }
  const curUrl = ctx.url
  ctx.redirect('/user/login?url=' + encodeURIComponent(curUrl))
}

module.exports = {
  checkLoginApi,
  checkLoginApiPage
}