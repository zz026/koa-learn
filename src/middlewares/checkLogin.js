/**
 * @description 验证是否登录中间件
 * @author zzw
*/

const { ErrorModal } = require('../model/ResponseModal')
const { noLoginCode } = require('../model/ErrorCode')

async function checkLogin(ctx, next) {
  // 已登录
  if (ctx.session && ctx.session.userInfo) {
    await next()
    return 
  }
  ctx.body = new ErrorModal(noLoginCode)
}

module.exports = {
  checkLogin
}