/**
 * @description 数据格式化
 * @author zzw
*/

/**
 * @description 日期格式化，将2020-04-28T07:23:36.311Z转换成时间戳 有密码返回则删除
 * @param {object} obj 返回data
 */
function formatData(obj) {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const element = obj[key];
      // 对象
      if (Object.prototype.toString.call(element) === '[object Object]') {
        formatData(element)
      }
      // 数组，则循环调用
      if (Array.isArray(element)) {
        for (let index = 0; index < element.length; index++) {
          formatData(element[index])
        }
      }
      switch (key) {
      // 返回时间戳
      case 'createdAt':
      case 'updatedAt':
        obj[key] = new Date(element).getTime()
        break;
      // 不返回密码
      case 'password':
        delete obj[key]
      default:
        break;
      }
    }
  }
  return obj
}

module.exports = {
  formatData
}