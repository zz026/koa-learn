/**
 * @description 登录功能
 * @author zzw
 */
const server = require('../server');
const testUser = require('./user')

const oneUser = {
  userName: `${Date.now()}`.slice(0, 11),
  password: 'psd123456',
  nickName: 'nickName',
  gender: 2,
  headImg: 'http://106.13.204.211/headList/6.jpg',
  provinceId: '130000',
  cityId: '130300',

}
let cookie = ''


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
 * 修改用户信息
 */
test('修改用户信息', async () => {
  const res = await server
    .post('/api/user/update')
    .set('cookie', cookie)
    .send(testUser)
  expect(res.body.code).toBe(0)
})

/**
 * 查询用户信息
 */
test('查询用户信息', async () => {
  const result = {
    ...testUser,
    gender: testUser.gender.toString(),
    userName: oneUser.userName
  }
  delete result.password
  const res = await server
    .post('/api/user/getUserInfo')
    .set('cookie', cookie)
    .send(testUser)
  expect({
    ...res.body.data,
    id: '99099'
  }).toStrictEqual(result)
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
 * 修改密码
*/
test('修改密码 登录成功', async () => {
  const res = await server
    .post('/api/user/login')
    .send({
      userName: oneUser.userName,
      password: oneUser.password
    })

  console.log('res.header', res.header)
  cookie = res.header['set-cookie'].join(';')
  expect(res.body.code).toBe(0)
})
test('修改密码', async () => {
  const res = await server
    .patch('/api/user/changePwd')
    .set('cookie', cookie)
    .send({
      password: oneUser.password,
      newPassword: testUser.password
    })
  expect(res.body.code).toBe(0)
})


/**
 * 删除
 * 需再次登录，因为前面退出登录了 使用新密码
*/
test('删除 登录成功', async () => {
  const res = await server
    .post('/api/user/login')
    .send({
      userName: oneUser.userName,
      password: testUser.password
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
      password: testUser.password
    })

  expect(res.body.code).toBe(0)
})
