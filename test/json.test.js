/**
 * @description json test
 * @author zzw
 */

  const server = require('./server');

  test('json返回数据正确', async () => {
    const res = await server.get('/json2')
    expect(res.body).toEqual({
      title: 'koa2 json2',
    })
  })

  test('测试登录', async () => {
    const res = await server.post('/json2').send({
      userName: 'zhangsan',
      passWord: '123456'
    })
    expect(res.body).toEqual({
      title: '登录成功',
    })
  })