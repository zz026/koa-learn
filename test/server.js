/**
 * @description jest server
 * @author zzw
 */

 const request = require('supertest')
 const server = require('../src/app').callback()

 module.exports = request(server)