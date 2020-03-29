/**
 * @description 生成随机六位数验证
 * @author zzw
 */

function newCode() {
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += Math.floor(Math.random()*10);
  }
  return code
}

module.exports = newCode;