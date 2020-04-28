const router = require('koa-router')()
const SendSms = require('../utils/sms')
const newCode = require('../utils/code')
const {
  checkName,
  registerUser,
  loginUser }
  = require('../controller/user')
const getValidate = require('../middlewares/validator')
const userValidate = require('../validator/user')
// 前缀
router.prefix('/api/user')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a user api!'
})

// 检查用户名
router.post('/checkName', async (ctx, next) => {
  const { userName } = ctx.request.body
  ctx.body = await checkName(userName)
})

// 注册
router.post('/register', getValidate(userValidate), async (ctx, next) => {
  const { userName, nickName, password, gender } = ctx.request.body
  ctx.body = await registerUser({ userName, nickName, password, gender })
})

// 登录
router.post('/login', async (ctx, next) => {
  const { userName, password } = ctx.request.body
  ctx.body = await loginUser(userName, password)
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
