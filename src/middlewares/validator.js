/**
 * @description JSON SCHEMA校验中间件
 * @author zzw
*/

const { ErrorModal } = require('../model/ResponseModal')
const { jsonErrorCode } = require('../model/ErrorCode')

function getValidate(userValidateFunc) {
  // 定义中间件函数
  async function validate(ctx, next) {
    const data = ctx.request.body
    const error = userValidateFunc(data)
    console.log('userValidateFunc error：', error)
    if (error) {
      // 验证失败
      return ctx.body = new ErrorModal({
        ...jsonErrorCode,
        msg: error.dataPath + '：' + error.message
      })
    }
    // 验证成功
    await next()
  }
  // 返回中间件
  return validate
}

module.exports = getValidate;
