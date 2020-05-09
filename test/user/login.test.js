/**
 * @description 登录功能
 * @author zzw
 */
const server = require('../server');

const oneUser = {
  userName: `${Date.now()}`.slice(0, 11),
  password: 'psd123456',
  nickName: 'nickName',
  gender: 2,
  headImg: 'http://106.13.204.211/headList/6.jpg'
}
let cookie = ''

console.log('oneUser：', oneUser)

/**
 * 注册
 */
test('注册成功', async () => {
  const res = await server
  .post('/api/user/register')
  .send(oneUser)

  console.log('··········register.body：··········', res.body)
  expect(res.body.code).toBe(0)
})


test('注册失败--用户名重复情况', async () => {
  const res = await server
  .post('/api/user/register')
  .send(oneUser)

  expect(res.body.code).toBe(10002)
})

/**
 * 登录
 */
test('登录成功', async () => {
  const res = await server
    .post('/api/user/login')
    .send({
      userName: oneUser.userName,
      password: oneUser.password
    })

  console.log('······login.body：··········', res.body)
  cookie = res.header['set-cookie'].join(';')
  expect(res.body.code).toBe(0)
})

test('登录失败 用户名不存在', async () => {
  const res = await server
    .post('/api/user/login')
    .send({
      userName: Date.now(),
      password: oneUser.password
    })

  expect(res.body.code).toBe(10003)
})

test('登录失败 密码不一致', async () => {
  const res = await server
    .post('/api/user/login')
    .send({
      userName: oneUser.userName,
      password: Date.now()
    })

  expect(res.body.code).toBe(10004)
})

/**
 * 退出
*/

test('退出登录', async () => {
  const res = await server
    .post('/api/user/logout')
    .set('cookie', cookie)

  expect(res.body.code).toBe(0)
})


/**
 * 删除
 * 需再次登录，因为前面退出登录了
*/
test('登录成功', async () => {
  const res = await server
    .post('/api/user/login')
    .send({
      userName: oneUser.userName,
      password: oneUser.password
    })

  cookie = res.header['set-cookie'].join(';')
  expect(res.body.code).toBe(0)
})
test('删除用户', async () => {
  const res = await server
    .post('/api/user/delete')
    .set('cookie', cookie)
    .send({
      userName: oneUser.userName,
      password: oneUser.password
    })

  expect(res.body.code).toBe(0)
})