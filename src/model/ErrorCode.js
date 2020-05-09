/**
 * @description 错误代码集合
 */

module.exports = {
  jsonErrorCode: {
    code: 10001,
    msg: 'json格式错误'
  },
  hasUserNameCode: {
    code: 10002,
    msg: '手机号已存在'
  },
  userNameErrorCode: {
    code: 10003,
    msg: '手机号不存在，请前往注册'
  },
  userPsdErrorCode: {
    code: 10004,
    msg: '密码错误'
  },
  noLoginCode: {
    code: 10005,
    msg: '尚未登录'
  },
  bigSizeCode: {
    code: 10006,
    msg: '文件过大'
  }
}