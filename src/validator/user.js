/**
 * @description 校验规则User
 * @author zzw
*/

const validate = require('./_validate')

const Schema = {
  type: 'object',
  properties: {
    userName: {
      type: 'string',
      pattern: '^1[0-9]{10}$',
    },
    nickName: {
      type: 'string',
      minLength: 2,
      maxLength: 10,
    },
    password: {
      type: 'string',
      minLength: 2,
      maxLength: 16,
    },
    gender: {
      type: 'number',
      minmum: 1,
      maxmum: 3,
    }
  }
}

/**
 * @description 用户数据校验
 * @param {Object} data 用户数据
 */
function userValidate(data = {}) {
  return validate(Schema, data)
}

module.exports = userValidate