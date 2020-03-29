/**
 * @description jest serve
 * @author zzw
 */

 const request = require('supertest')
 const server = require('../app').callback()

 module.exports = request(server)