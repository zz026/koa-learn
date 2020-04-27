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
      pattern: '^[a-zA-Z][a-zA-Z0-9]+$',
      minLength: 4,
      maxLength: 20,
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