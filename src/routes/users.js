const router = require('koa-router')()
const SendSms = require('../utils/sms')
const newCode = require('../utils/code')
router.prefix('/api/user')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

router.post('/login', async (ctx, next) => {
  const { userName, password } = ctx.request.body
  ctx.body = {
    userName,
    password
  }
})

router.post('/sms', async (ctx, next) => {
  console.log('ctx.request.body', ctx.request.body)
  const params = ctx.request.body
  // const params = JSON.parse(JSON.stringify(ctx.request.body))
  const code = newCode()
  console.log('code', code)
  try {
    const smsResult = await SendSms(
      params.phone,
      code
    )
    console.log('smsResult', smsResult)
    ctx.body = {
      code: 0,
      phone: params.phone,
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
