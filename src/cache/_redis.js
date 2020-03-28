/**
 * @description  连接Redis的方法
 * @author zww
 * @time 2020/09/29
 */

const redis = require('redis')
const { REDIS_CONF } = require('../conf/db')

// 创建客户端
const redisClient = redis.createClient(
  REDIS_CONF.port, // 端口号
  REDIS_CONF.host // ip
)

redisClient.on('error', error => {
  console.error('redis error', error)
})

/**
 * @description 存储Redis
 * @param {string} key 键
 * @param {string} val 值
 * @param {number} timeout 过期时间，单位s
 */
function set(key, val, timeout = 60 * 60) {
  if (typeof val === 'object') {
    val = JSON.stringify(val)
  }
  redisClient.set(key, val)
  redisClient.expire(key, timeout)
}

/**
 * @description 读取Redis
 * @param {string} key 键
 */
function get(key) {
  return new Promise(((resolve, reject) => {
    redisClient.get(key, (err, val) => {
      if (err) {
        reject(err)
        return
      }
      // 值空可能是过期被清掉了
      if (!val) {
        reject(err)
        return
      }
      try {
        resolve(JSON.parse(val))
      } catch {
        resolve(val)
      }
    })
  }))
}

module.exports = {
  set,
  get
}