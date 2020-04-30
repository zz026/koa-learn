/*
* @description user model test
* @author zzw
* */

const { User } = require('../../src/db/model/index')

test('测试user model属性', () => {
  const user = User.build({
    userName: 'zhangsan',
    nickName: '张三',
    password: '123456',
  })
  expect(user.userName).toBe('zhangsan')
  expect(user.nickName).toBe('张三')
  expect(user.password).toBe('123456')
  expect(user.gender).toBe(3)
})


