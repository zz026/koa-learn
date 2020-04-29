/**
 * @description 基础模型
 * @author zzw
*/
const { formatTime } = require('../service/_format')

class BaseModal {
  constructor({ code, data, msg }) {
    this.code = code
    this.msg = msg
    if (data) {
      this.data = data
    }
  }
}

/**
 * @description 成功模型
 * @author zzw
 */
class SuccessModal extends BaseModal {
  constructor(data = {}) {
    super({
      code: 0,
      data: formatTime(data),
      msg: '操作成功'
    })
  }
}

/**
 * @description 失败模型
 * @author zzw
*/
class ErrorModal extends BaseModal {
  constructor({ code, msg }) {
    super({
      code,
      msg
    })
  }
}

module.exports = {
  SuccessModal,
  ErrorModal
}