/**
 * @description 存储配置
 * @author zww
 * @time 2020/09/29
*/

const REDIS_CONF = {
   host: '127.0.0.1',
  port: 6379,
}

const SQL_CONF = {
  host: '127.0.0.1',
  database: 'weibo',
  user: 'root',
  passWord: '989898',
}


module.exports = {
  REDIS_CONF,
  SQL_CONF
}