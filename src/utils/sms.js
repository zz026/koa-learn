const Core = require('@alicloud/pop-core');

const client = new Core({
  accessKeyId: 'LTAI4Fmf9KTTB4oBNXJV3mxQ',
  accessKeySecret: 'Ia1FBOHuDPmdoM535FfgaELRdcty8X',
  endpoint: 'https://dysmsapi.aliyuncs.com',
  apiVersion: '2017-05-25'
});

const params = {
  "RegionId": "cn-hangzhou",
  // "PhoneNumbers": "13715016626",
  "SignName": "星辰小站",
  "TemplateCode": "SMS_186599576",
  // "TemplateParam": "{\"code\":\"520\"}"
}

const requestOption = {
  method: 'POST'
};

/**
 * 
 * @param {string} PhoneNumbers 手机号码
 * @param {string} code 验证码 
 */
function SendSms(phone, code = 520) {
  if (!phone) {
   return console.error('请传入手机号')
  }
  return new Promise((resolve, reject) => {
    client.request('SendSms', {
      ...params,
      PhoneNumbers: phone,
      // TemplateParam: { "code": code.toString() }
      TemplateParam: "{\"code\":" + code + "}"
    }, requestOption).then((result) => {
      console.log(JSON.stringify(result));
      resolve(JSON.stringify(result))
    }, (ex) => {
      console.log(ex);
      reject('ex', ex)
    })
  })
}

module.exports = SendSms;