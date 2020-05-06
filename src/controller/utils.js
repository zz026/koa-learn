/**
 * @description 工具controller
 * @author zzw
 */
const fs = require('fs-extra')

async function saveFile({ name, type, size, path }) {
  return {
    code: 0,
    name, type, size, path
  }
}

module.exports = {
  saveFile
}