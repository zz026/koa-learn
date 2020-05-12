/**
 * @description 工具函数
 * @author zzw
 */

/**
 * @description 将日期格式化成指定格式的字符串
 * @param {date|number} date 要格式化的日期，不传时默认当前时间，也可以是一个时间戳
 * @param {string} fmt 目标字符串格式，支持的字符有：y,M,d,q,w,H,h,m,S，默认：yyyy-MM-dd HH:mm:ss
 * @returns 返回格式化后的日期字符串
 */
function parseTime (date = new Date(), fmt) {
  date = typeof date === 'number' ? new Date(date) : date
  fmt = fmt || 'yyyy-MM-dd HH:mm:ss'
  const obj =
    {
      'y': date.getFullYear(), // 年份，注意必须用getFullYear
      'M': date.getMonth() + 1, // 月份，注意是从0-11
      'd': date.getDate(), // 日期
      'q': Math.floor((date.getMonth() + 3) / 3), // 季度
      'w': date.getDay(), // 星期，注意是0-6
      'H': date.getHours(), // 24小时制
      'h': date.getHours() % 12 === 0 ? 12 : date.getHours() % 12, // 12小时制
      'm': date.getMinutes(), // 分钟
      's': date.getSeconds(), // 秒
      'S': date.getMilliseconds() // 毫秒
    }
  const week = ['天', '一', '二', '三', '四', '五', '六']
  for (const i in obj) {
    fmt = fmt.replace(new RegExp(i + '+', 'g'), function (m) {
      let val = obj[i] + ''
      if (i === 'w') return (m.length > 2 ? '星期' : '周') + week[val]
      for (let j = 0, len = val.length; j < m.length - len; j++) val = '0' + val
      return m.length === 1 ? val : val.substring(val.length - m.length)
    })
  }
  return fmt
}

/**
 * @description 深拷贝
 * @param {object,array} source 需要深拷贝的对象或数组
 * @returns 返回深拷贝后数据
 */
function deepClone (source) {
  if (!source && typeof source !== 'object') {
    throw new Error('请传入object或array')
  }
  const targetObj = source.constructor === Array ? [] : {}
  for (const keys in source) {
    if (source.hasOwnProperty(keys)) {
      if (source[keys] && typeof source[keys] === 'object') {
        targetObj[keys] = source[keys].constructor === Array ? [] : {}
        targetObj[keys] = deepClone(source[keys])
      } else {
        targetObj[keys] = source[keys]
      }
    }
  }
  return targetObj
}

/**
 * @description 生成随机字符串
 * @param {number} num 生成几位数的随机字符串
 * @author zzw
 */
function generateRandomString(num) {
  const chars = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
  let res = '';
  for(let ia = 0; ia < num ; ia ++) {
    var id = Math.ceil(Math.random() * (chars.length - 1));
    res += chars[id];
  }
  return res;
}

module.exports = {
  parseTime,
  deepClone,
  generateRandomString
}