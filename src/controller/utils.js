/**
 * @description 工具controller
 * @author zzw
 */
const fsExtra = require('fs-extra')
const { SuccessModal, ErrorModal } = require('../model/ResponseModal')
const { bigSizeCode } = require('../model/ErrorCode')
const { parseTime } = require('../utils/index')
const { RESOURCE_PATH } = require('../conf/savePath')
const path = require('path')
// 最大体积10M
const max_Size = 1024 * 1024 * 10

// 是否需要创建目录
fsExtra.pathExists(RESOURCE_PATH).then(exist => {
  if (!exist) {
    fsExtra.ensureDir(RESOURCE_PATH)
  }
})

/**
 * 
 * @param {string} name 文件名
 * @param {string} type 文件类型
 * @param {number} size 文件体积大小
 * @param {string} path 文件路径
 * @description 文件保存
 * @author zzw
 */
async function C_SaveFile({ name, type, size, filePath }) {
  if (size > max_Size) {
    // 删除文件
    await fsExtra.remove(filePath)
    return new ErrorModal(bigSizeCode)
  }

  // 重新定义文件名，防止重复
  const fileName = parseTime(Date.now(), 'yyyyMMdd-HHmmss') + '.' + name
  // // 存储目的地
  const distFilePath = path.join(RESOURCE_PATH, fileName)
  // 移动文件
  await fsExtra.move(filePath, distFilePath)
  
  return new SuccessModal('/' + fileName)
}

module.exports = {
  C_SaveFile
}