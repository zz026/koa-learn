/**
 * @description 校验规则User
 * @author zzw
*/

const validate = require('./_validate')

const Schema = {
  type: 'object',
  properties: {
    content: {
      type: 'string',
      maxLength: 255
    },
    image: {
      type: 'string',
      maxLength: 255
    },
  }
}

/**
 * @description 微博数据校验
 * @param {Object} data 博客数据
 */
function blogValidate(data = {}) {
  return validate(Schema, data)
}

module.exports = blogValidate