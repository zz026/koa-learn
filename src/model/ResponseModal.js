/**
 * @deprecated 基础模型
 * @author zzw
*/
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
 * @deprecated 成功模型
 * @author zzw
 */
class SuccessModal extends BaseModal {
  constructor(data = {}) {
    super({
      code: 0,
      data,
      msg: '操作成功'
    })
  }
}

/**
 * @deprecated 失败模型
 * @author zzw
*/
class ErrorModal extends BaseModal {
  constructor({ code, msg }) {
    super({
      code,
      msg: msg.replace(/must be unique/ , '必须唯一!')
    })
  }
}

module.exports = {
  SuccessModal,
  ErrorModal
}