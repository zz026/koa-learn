/**
 * @description 通用路由
 * @author zzw
*/
const router = require('koa-router')()
const koaForm = require('formidable-upload-koa')
const { saveFile } = require('../controller/utils')

router.prefix('/api/utils')

router.post('/upload', koaForm(), async (ctx, next) => {
  const file = ctx.req.files['file']
  const { name, type, size, path } = file
  ctx.body = await saveFile({ name, type, size, path })
})


module.exports = router