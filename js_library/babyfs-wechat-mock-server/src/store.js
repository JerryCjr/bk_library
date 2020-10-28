import path from 'path';
import fileHelper from './fileHelper';
import axios from 'axios';

const baseDirectory = __dirname;
const storeFileName = path.resolve(baseDirectory, '../content/', 'wechat-users.json');
let userData = null;

async function load() {
  if (userData) {
    return;
  }
  let flag = await fileHelper.exist(storeFileName);
  if (flag) {
    userData = require(storeFileName);
  }
  else {
    userData = {};
  }
}

async function sync() {
  if (userData) {
    await fileHelper.write(storeFileName, JSON.stringify(userData, null, 2));
  }
}

async function setItem(userid, data) {
  await load();
  userData[userid] = data;
  await sync();
}

async function getItem(userid) {
  await load();
  let user = userData[userid];
  if (user) {
    return user;
  }
  else {
    return null;
  }
}

async function getItemList() {
  await load();
  return Object.entries(userData);
}

let messageSession = {};
function pushMessage(userId, appId, message) {
  let sessionPerUser = messageSession[userId];
  if (!sessionPerUser) {
    sessionPerUser = {};
    messageSession[userId] = sessionPerUser;
  }
  let sessionPerUserApp = sessionPerUser[appId];
  if (!sessionPerUserApp) {
    sessionPerUserApp = [];
    sessionPerUser[appId] = sessionPerUserApp;
  }
  sessionPerUserApp.push(message);
  if (sessionPerUserApp.length > 20) {
    sessionPerUserApp.splice(0, sessionPerUserApp.length - 20);
  }
}
function getMessageList(userId, appId) {
  let sessionPerUser = messageSession[userId];
  if (!sessionPerUser) {
    sessionPerUser = {};
    messageSession[userId] = sessionPerUser;
  }
  let sessionPerUserApp = sessionPerUser[appId];
  if (!sessionPerUserApp) {
    sessionPerUserApp = [];
    sessionPerUser[appId] = sessionPerUserApp;
  }
  return sessionPerUserApp;
}

let messageTemplateWarehouse = {};
async function getTemplateById(appId, accessToken, templateId) {
  let messageTemplateList = messageTemplateWarehouse[appId];
  if (!messageTemplateList) {
    messageTemplateList = [];
    messageTemplateWarehouse[appId] = messageTemplateList;
  }

  let template = messageTemplateList.find(item => item.templateId === templateId);
  while (!template) {
    if ((messageTemplateList.length % 20) > 0) {
      break;
    }
    let templateResult = await axios.post(`https://api.weixin.qq.com/cgi-bin/wxopen/template/list?access_token=${accessToken}`, {
      offset: messageTemplateList.length / 20,
      count: 20
    }, {
      headers: {
        'Content-type': 'application/json'
      }
    });
    templateResult = templateResult.data;
    if (templateResult.errcode === 0) {
      let tempList = templateResult.list.map(item => {
        return {
          templateId: item.template_id,
          title: item.title,
          content: item.content
        };
      });
      messageTemplateList.push(...tempList);
      template = tempList.find(item => item.templateId === templateId);
    }
    else {
      throw new Error(templateResult.errmsg);
    }
  }
  if (template) {
    return template;
  }
  else {
    throw new Error('no matched template!');
  }
}
async function getOfficeAccountTemplateById(appId, accessToken, templateId) {
  let messageTemplateList = messageTemplateWarehouse[appId];
  if (!messageTemplateList) {
    messageTemplateList = [];
    messageTemplateWarehouse[appId] = messageTemplateList;
  }

  let template = messageTemplateList.find(item => item.templateId === templateId);
  if (template) {
    return template;
  }
  else {
    let templateResult = await axios.get(`https://api.weixin.qq.com/cgi-bin/template/get_all_private_template?access_token=${accessToken}`, {
      headers: {
        'Content-type': 'application/json'
      }
    });
    templateResult = templateResult.data;
    if (!templateResult.errcode || templateResult.errcode === 0) {
      let tempList = templateResult.template_list.map(item => {
        return {
          templateId: item.template_id,
          title: item.title,
          content: item.content
        };
      });
      messageTemplateList.push(...tempList);
      template = tempList.find(item => item.templateId === templateId);
      return template;
    }
    else {
      throw new Error(templateResult.errmsg);
    }
  }
}

export default {
  getItem,
  setItem,
  getItemList,
  pushMessage,
  getMessageList,
  getTemplateById,
  getOfficeAccountTemplateById
};
