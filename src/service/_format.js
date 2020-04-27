/**
 * @description 数据格式化
 * @author zzw
*/

function _formatUserPic(obj) {
  if (obj.logo === null) {
    obj.logo = 'aaa'
  }
  return obj
}