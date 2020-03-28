const Sequelize = require('sequelize');

const seq = new Sequelize(
	'test', // 数据库名
	'root',   // 用户名
	'989898',   // 用户密码
	{
		'dialect': 'mysql',  // 数据库使用mysql
		'host': 'localhost', // 数据库服务器ip
		'port': 3306,        // 数据库服务器端口
	}
);

seq
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });