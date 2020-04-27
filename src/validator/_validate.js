/**
 * @description JSON SCHEMA校验
 * @author zzw
*/

const ajv = require('ajv')

const Ajv = new ajv({
  // allErrors: true // 输出所有错误，比较慢
})
 

/**
 * @description JSON SCHEMA校验
 * @param {Object} schema JSON SCHEMA规则
 * @param {Object} data 待校验数据
 */
function validate(schema, data = {}) {
  var valid = Ajv.validate(schema, data);
  if (!valid) {
    return Ajv.errors[0]
  };
}

module.exports = validate