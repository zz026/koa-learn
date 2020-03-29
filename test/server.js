/**
 * @description jest server
 * @author zzw
 */

 const request = require('supertest')
 const server = require('../app').callback()

 module.exports = request(server)