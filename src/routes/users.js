const router = require('koa-router')()
const SendSms = require('../utils/sms')
const newCode = require('../utils/code')
router.prefix('/users')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

router.post('/sms', async (ctx, next) => {
  const params = JSON.parse(ctx.request.body)
  const code = newCode()
  console.log('params', params)
  console.log('code', code)
  if (params.phone) {
    const smsResult = await SendSms(
      params.phone,
      code
    )
    console.log('smsResult', smsResult)
    ctx.body = {
      code: 0,
      phone: params.phone,
      // smsResult: smsResult
    }
  } else {
    ctx.body = {
      code: 11,
      msg: '手机号不存在'
    }
  }
})

module.exports = router
