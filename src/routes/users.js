const router = require('koa-router')()
const SendSms = require('../utils/sms')
const newCode = require('../utils/code')
router.prefix('/api/user')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

// 注册
router.post('/register', async (ctx, next) => {
  const { userName, nickName, password } = ctx.request.body
  ctx.body = {
    code: 0,
    data: {
      userName,
      nickName,
      password
    }
  }
})

// 登录
router.post('/login', async (ctx, next) => {
  const { userName, password } = ctx.request.body
  ctx.body = {
    code: 0,
    data: {
      userName,
      password
    }
  }
})

// 发送短信
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
