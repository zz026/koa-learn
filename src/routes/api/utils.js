/**
 * @description 通用路由
 * @author zzw
*/
const router = require('koa-router')()
const koaForm = require('formidable-upload-koa')
const SendSms = require('../../utils/sms')
const newCode = require('../../utils/code')
const { C_SaveFile } = require('../../controller/utils')

router.prefix('/api/utils')

router.post('/upload', koaForm(), async (ctx, next) => {
  const file = ctx.req.files['file']
  const { name, type, size, path } = file
  ctx.body = await C_SaveFile({ name, type, size, filePath: path })
})

// 发送短信
router.post('/sms', async (ctx, next) => {
  const { phone } = ctx.request.body
  const code = newCode()
  console.log('code', code)
  try {
    const smsResult = await SendSms(
      phone,
      code
    )
    console.log('smsResult', smsResult)
    ctx.body = {
      code: 0,
      phone,
      msg: smsResult.Message
    }
  } catch(err) {
    ctx.body = {
      code: 11,
      msg: err
    }
  }
})

module.exports = router