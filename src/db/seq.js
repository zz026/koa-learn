const Sequelize = require('sequelize');
const { SQL_CONF } = require('../conf/db')
const { ENV } = require('../utils/env')

const { host, database, user, passWord  } = SQL_CONF

const conf = {
  'dialect': 'mysql',  // 数据库使用mysql
  host, // 数据库服务器ip
  'port': 3306,        // 数据库服务器端口
}

// 测试环境关闭日志
if (ENV === 'test') {
  conf.logging = () => {}
}

const seq = new Sequelize(database, user, passWord, conf);

module.exports = seq
