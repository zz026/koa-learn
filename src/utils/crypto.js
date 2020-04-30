/**
 * @description 加密
 * @author zzw
*/

const crypto = require('crypto')
const { CRYPTO_SCERET_KEY } = require('../conf/sceretKey')

/**
 * @description md5 加密16位
 * @param {string} text 加密明文
*/
function _MD5(text) {
  const md5 = crypto.createHash('md5')
  const psd = md5.update(text).digest('hex')
  console.log('psd', psd)
  return psd
}

/**
 * @description 加密方法 加盐
 * @param {string} text 加密明文
*/
function doCrypto(text) {
  const str = `password=${text}&key=${CRYPTO_SCERET_KEY}`
  return _MD5(str)
}

module.exports = doCrypto