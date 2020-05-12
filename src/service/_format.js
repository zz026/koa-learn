/**
 * @description 数据格式化
 * @author zzw
*/

/**
 * @description 日期格式化，将2020-04-28T07:23:36.311Z转换成时间戳 有密码返回则删除
 * @param {object} obj 返回data
 */
function formatData(data) {
  if (!data && typeof data !== 'object') {
    return data
  }
  // 取出可枚举属性
  const array = Object.keys(data)
  for (let index1 = 0; index1 < array.length; index1++) {
    const element = array[index1];
    // 数组
    if (Array.isArray(data[element])) {
      for (let index2 = 0; index2 < data[element].length; index2++) {
        formatData(data[element][index2])
      }
      continue;
    }
    switch (element) {
    // 返回时间戳
    case 'createdAt':
    case 'updatedAt':
      data[element] = new Date(data[element]).getTime()
      break;
    // 不返回密码
    case 'password':
      delete data[element]
    default:
      break;
    }
  }
  return data
}

module.exports = {
  formatData
}