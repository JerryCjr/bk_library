import crypto from 'crypto-js';
import appManager from './appManager';
import randomIdHelper from './randomIdHelper';
import userBusiness from './userBusiness';
import { Buffer } from 'buffer';
import axios from 'axios';
import cryptoCore from 'crypto';
import store from './store';

/**
 * 模拟推送消息到自己的接收服务地址
 */
function generateTextMessage({
  toUserName = '',
  fromUserName = '',
  content = ''
} = {}) {
  let createTime = (new Date()).getTime();
  return `<xml><ToUserName><![CDATA[${toUserName}]]></ToUserName><FromUserName><![CDATA[${fromUserName}]]></FromUserName><CreateTime>${createTime}</CreateTime><MsgType><![CDATA[text]]></MsgType><Content><![CDATA[${content}]]></Content><MsgId>${createTime}</MsgId></xml>`;
}

function generateEncryptedMessage({
  toUserName = '',
  encMsg = ''
} = {}) {
  return `<xml><ToUserName><![CDATA[${toUserName}]]></ToUserName><Encrypt><![CDATA[${encMsg}]]></Encrypt></xml>`;
}

function generateAesKeyAndIV(strEncodingAesKey) {
  let buffKey = Buffer.from(strEncodingAesKey + '=', 'base64');
  let buffIV = buffKey.slice(0, 16);
  return {
    buffKey,
    buffIV
  };
}

function htonl(n) {
  let buf = Buffer.alloc(4);
  buf[0] = (n & 0xFF000000) >> 24;
  buf[1] = (n & 0x00FF0000) >> 16;
  buf[2] = (n & 0x0000FF00) >> 8;
  buf[3] = (n & 0x000000FF) >> 0;
  return buf;
}

function padding(n) {
	let len = n % 32;
	if (len == 0) {
		len = 32;
	} else {
		len = 32 - len;
	}
	let buf = Buffer.alloc(len);
	for (let i = 0; i < len; i++) {
		buf[i] = len;
	}
	return buf;
}

async function post(content, appName, userId) {
  let appId = appManager.appNameIds[appName];
  let user = await userBusiness.getUser(userId);
  let openId = user.openIdList[appId];
  let appConfig = appManager.getConfig(appName);
  let token = appConfig.token;
  let nonce = randomIdHelper.newNonce().toString();
  let ts = randomIdHelper.timestamp.toString();

  // 生成signature
  let signature = crypto.SHA1([token, ts, nonce].sort().join('')).toString();
  // 加密发送的消息
  let { buffKey, buffIV } = generateAesKeyAndIV(appConfig.encodingAesKey);
  let rawMessage = generateTextMessage({
    toUserName: appId,
    fromUserName: openId,
    content
  });
  let bytesRandomCode = Buffer.from(randomIdHelper.randomCode());
  let bytesRawMessage = Buffer.from(rawMessage);
  let bytesMsgLen = htonl(bytesRawMessage.length);
  let bytesAppId = Buffer.from(appId);
  let bytesPadding = padding(20 + bytesRawMessage.length + bytesAppId.length);
	let cipher = cryptoCore.createCipheriv('aes-256-cbc', buffKey, buffIV);
	cipher.setAutoPadding(false);
  let encryptedMessage = cipher.update(Buffer.concat([bytesRandomCode, bytesMsgLen, bytesRawMessage, bytesAppId, bytesPadding]), 'binary', 'base64') + cipher.final('base64');
  // 生成msg_signature
  let msgSignature = crypto.SHA1([token, ts, nonce, encryptedMessage].sort().join('')).toString();

  // return {
  //   encXml: generateEncryptedMessage({
  //     toUserName: appId,
  //     encMsg: encryptedMessage
  //   }),
  //   encrypt_type: 'aes',
  //   timestamp: ts,
  //   nonce,
  //   msg_signature: msgSignature,
  //   signature
  // };
  // post消息到微信的推送接口
  let postResult = await axios.post(appConfig.pushUrl, generateEncryptedMessage({
    toUserName: appId,
    encMsg: encryptedMessage
  }), {
    headers:{
      'Content-type': 'text/xml'
    },
    params: {
      encrypt_type: 'aes',
      timestamp: ts,
      nonce,
      msg_signature: msgSignature,
      signature
    }
  });
  userBusiness.sendText(openId, content);
  return postResult.data;
}
// 模拟推送消息到自己的接收服务地址 end

/**
 * 模拟基于formId和公众号发送模版消息
 */
const templateRegex = /(\{\{[^\{\}]*\}\})/g; // eslint-disable-line no-useless-escape
async function send(toUserOpenId, accessToken, templateId, data, miniprogramPage, miniprogramAppId = null, outterUrl = null) {
  let { userId, appId } = await userBusiness.getUserByOpenId(toUserOpenId);
  let isWxa = appManager.isWxa(appId);
  /**
   * template:
   *
    {
      "templateId": "wDYzYZVxobJivW9oMpSCpuvACOfJXQIoKUm0PY397Tc",
      "title": "购买成功通知",
      "content": "购买地点{{keyword1.DATA}}\n购买时间{{keyword2.DATA}}\n物品名称{{keyword3.DATA}}\n"
    }
   */
  let template = null;
  if (isWxa) {
    template = await store.getTemplateById(appId, accessToken, templateId);
  }
  else {
    template = await store.getOfficeAccountTemplateById(appId, accessToken, templateId);
  }
  let matchItems = template.content.match(templateRegex);
  let finalContent = template.content;
  matchItems.forEach(item => {
    finalContent = finalContent.replace(item, convertToRealValue(item, data));
  });
  let templateMessage = {
    title: template.title,
    content: finalContent,
    miniprogramPage
  };
  if (!isWxa) {
    templateMessage.miniprogramAppName = appManager.getAppNameById(miniprogramAppId);
    templateMessage.outterUrl = outterUrl;
  }
  store.pushMessage(userId, appId, {
    from: appManager.getAppNameById(appId),
    to: userId,
    templateMessage,
    timestamp: (new Date()).getTime()
  });
}

function convertToRealValue(match, data) {
  let property = match.substr(2, match.length - 4).split('.')[0];
  return data[property] ? data[property].value : `no ${property} data`;
}
// 模拟基于formId和公众号发送模版消息 end

export default {
  post,
  send
};
