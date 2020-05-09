/**
 * @description user api router
 * @author zzw
 */
const router = require('koa-router')()
const {
  C_CheckName,
  C_RegisterUser,
  C_LoginUser,
  C_DeleteUser,
  C_LogoutUser,
  C_GetUserINfo,
  C_UpdateUser
}
  = require('../../controller/user')
const { checkLoginApi } = require('../../middlewares/checkLogin')
const getValidate = require('../../middlewares/validator')
const userValidate = require('../../validator/user')
// 前缀
router.prefix('/api/user')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a user api!'
})

// 检查用户名
router.post('/checkName', async (ctx, next) => {
  const { userName } = ctx.request.body
  ctx.body = await C_CheckName(userName)
})

// 注册
router.post('/register', getValidate(userValidate), async (ctx, next) => {
  const { userName, nickName, password, gender, provinceId, cityId, headImg } = ctx.request.body
  ctx.body = await C_RegisterUser({ userName, nickName, password, gender, provinceId, cityId, headImg })
})

// 登录
router.post('/login', async (ctx, next) => {
  const { userName, password } = ctx.request.body
  ctx.body = await C_LoginUser(ctx, userName, password)
})

// 删除
router.post('/delete', checkLoginApi, async (ctx, next) => {
  const { userName, password } = ctx.request.body
  ctx.body = await C_DeleteUser(userName, password)
})

// 退出登录
router.post('/logout', checkLoginApi, async (ctx, next) => {
  ctx.body = await C_LogoutUser(ctx)
})

// 获取用户详情
router.post('/getUserInfo', checkLoginApi, async (ctx, next) => {
  ctx.body = await C_GetUserINfo(ctx)
})

// 更新用户信息
router.post('/update', checkLoginApi, getValidate(userValidate), async (ctx, next) => {
  const { nickName, gender, provinceId, cityId, headImg } = ctx.request.body
  ctx.body = await C_UpdateUser(ctx, { nickName, gender, provinceId, cityId, headImg  })
})

module.exports = router
