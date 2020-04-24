const seq = require('./seq');

require('./model/index');

// 测试连接
seq
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// 同步表结构
seq.sync({
  force: true  // 强制同步，先删除表，然后新建
}).then(() => {
  console.log('sync finish!')
  process.exit()
});