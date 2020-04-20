/*
 @description 阿里云发送短信 需填入accessKeyId和accessKeySecret
 @author zzw
*/
const Core = require('@alicloud/pop-core');

const client = new Core({
  accessKeyId: 'accessKeyId', // 需填入自己的accessKeyId
  accessKeySecret: 'accessKeySecret', // 需填入自己的accessKeySecret
  endpoint: 'https://dysmsapi.aliyuncs.com',
  apiVersion: '2017-05-25'
});

const params = {
  RegionId: 'cn-hangzhou',
  SignName: '星辰小站',
  TemplateCode: 'SMS_186599576',
}

// 阿里错误代码
const aliErrCode = {
  'isv.MOBILE_NUMBER_ILLEGALError': '非法手机号',
  'isv.DAY_LIMIT_CONTROL': '触发日发送限额',
  'isv.AMOUNT_NOT_ENOUGH': '当前账户余额不足',
}

/**
 * @param {string} PhoneNumbers 手机号码
 * @param {string} code 验证码 
 * @description 发送阿里短信
 * @author zzw
 */
function SendSms(phone, code = 520) {
  return new Promise((resolve, reject) => {
    if (!phone) {
      reject('请传入手机号~！')
      return false
    }
    client.request('SendSms', {
      ...params,
      PhoneNumbers: phone,
      TemplateParam: JSON.stringify({ code })
    }, { method: 'POST' }).then((result) => {
      console.log('SMS-SUCCESS:', phone, code);
      resolve(result)
    }, (error) => {
      console.error('SMS-ERROR:', error.name);
      reject(aliErrCode[error.name] || error.name)
    })
  })
}

module.exports = SendSms;