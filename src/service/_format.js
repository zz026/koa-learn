/**
 * @description 数据格式化
 * @author zzw
*/

/**
 * @description 日期格式化，将2020-04-28T07:23:36.311Z转换成时间戳 有密码返回则删除
 * @param {object} obj 返回data
 */
function formatData(obj) {
  if (obj.createdAt) {
    obj.createdAt = new Date(obj.createdAt).getTime()
  }
  if (obj.updatedAt) {
    obj.updatedAt = new Date(obj.updatedAt).getTime()
  }
  if (obj.password) {
    delete obj.password
  }
  return obj
}

module.exports = {
  formatData
}