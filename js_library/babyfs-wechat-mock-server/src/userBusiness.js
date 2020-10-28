/**
 * 用户登录的状态变更之后要保存到store里
 */
import store from './store';
import randomIdHelper from './randomIdHelper';
import appManager from './appManager';
import axios from 'axios';

const baseUser = {
  nickName: 'mock昵称',
  gender: 0,
  language: 'zh_CN',
  city: '北京',
  province: '北京',
  country: '中国',
  avatarUrl: 'https://s0.babyfs.cn/m/static/img/baowan@2x.40ec362.png',
  unionId: '',
  openIdList: {},
  loginInfoList: {}
};

async function generateUser(userid) {
  if (userid === undefined || userid === null) {
    throw new Error('请输入userid');
  }
  let user = await store.getItem(userid);
  if (user) {
    throw new Error(`${userid}该mock微信账户已经存在`);
  }
  //创建新的mock微信账户
  user = Object.assign({}, baseUser, {
    nickName: `mock_nick_${userid}`,
    gender: Math.floor(3 * Math.random()),
    unionId: `mock_unionid_${randomIdHelper.getUniqueId()}`,
    openIdList: {},
    loginInfoList: {}
  });
  let appids = Object.keys(appManager.apps);
  appids.forEach(appid => {
    user.openIdList[appid] = `mock_openid_${randomIdHelper.getUniqueId()}`;
  });
  await store.setItem(userid, user);
  return user;
}

async function getUser(userid) {
  let user = await store.getItem(userid);
  if (user) {
    return user;
  }
  else {
    throw new Error(`${userid}该mock微信账户不存在`);
  }
}

async function saveLoginInfo(userid, appid, loginInfo) {
  let user = await getUser(userid);
  let validApp = appid in appManager.apps;
  if (!validApp) {
    throw new Error(`${appid}是无效的微信应用`);
  }
  user.loginInfoList[appid] = loginInfo;
  await store.setItem(userid, user);
}

async function getRawData(userid) {
  let user = await getUser(userid);
  return {
    nickName: user.nickName,
    gender: user.gender,
    language: user.language,
    city: user.city,
    province: user.province,
    country: user.country,
    avatarUrl: user.avatarUrl
  };
}

async function getImportantData(userid, appid) {
  let user = await getUser(userid);
  let openId = user.openIdList[appid];
  if (!openId) {
    throw new Error(`${userid}不存在对应${appid}微信应用的openId`);
  }
  return {
    openId,
    nickName: user.nickName,
    gender: user.gender,
    city: user.city,
    province: user.province,
    country: user.country,
    avatarUrl: user.avatarUrl,
    unionId: user.unionId,
    watermark: {
      appid,
      timestamp: (new Date()).getTime()
    }
  };
}

async function getUserByCode(appid, code) {
  let users = await store.getItemList();
  let entry = users.find(entry => {
    let u = entry[1];
    let loginInfo = u.loginInfoList[appid];
    if (loginInfo) {
      return loginInfo.code === code;
    }
    else {
      return false;
    }
  });
  if (!entry) {
    throw new Error('code无效');
  }
  let userid = entry[0];
  let user = entry[1];
  let loginInfo = user.loginInfoList[appid];
  //使用code查询过一次就将code置为失效
  loginInfo.code = undefined;
  await store.setItem(userid, user);
  return user;
}

async function getUserByOnlyCode(code) {
  let users = await store.getItemList();
  let appid = null;
  let entry = users.find(entry => {
    let u = entry[1];
    let loginInfoKV = Object.entries(u.loginInfoList).find(kvp => kvp[1].code === code);
    if (loginInfoKV) {
      appid = loginInfoKV[0];
      return true;
    }
    else {
      return false;
    }
  });
  if (!entry) {
    throw new Error('code无效');
  }
  let userid = entry[0];
  let user = entry[1];
  let loginInfo = user.loginInfoList[appid];
  //使用code查询过一次就将code置为失效
  loginInfo.code = undefined;
  await store.setItem(userid, user);
  return { user, appid };
}

async function getUserIdList() {
  let users = await store.getItemList();
  return users.map(entry => entry[0]);
}

async function getFullUserData() {
  return await store.getItemList();
}

async function getUserByOpenId(openId) {
  let users = await store.getItemList();
  let userId = null;
  let appId = null;
  for (let i = 0; i < users.length; ++i) {
    let entry = users[i];
    let uid = entry[0];
    let udata = entry[1];
    let kvAppOpenId = Object.entries(udata.openIdList).find(kv => {
      return kv[1] === openId;
    });
    if (kvAppOpenId) {
      userId = uid;
      appId = kvAppOpenId[0];
      break;
    }
  }
  if (userId && appId) {
    return { userId, appId };
  }
  else {
    throw new Error(`根据OpenId${openId}没有找到对应的UserId和AppId`);
  }
}

/**
 * 使用mock微信向App发送消息
 */
async function sendText(fromUserOpenId, content = '') {
  let { userId, appId } = await getUserByOpenId(fromUserOpenId);
  store.pushMessage(userId, appId, {
    from: userId,
    to: appManager.getAppNameById(appId),
    content,
    timestamp: (new Date()).getTime()
  });
}

/**
 * 给这个mock微信回复文本客服消息
 */
async function replyText(toUserOpenId, content = '') {
  let { userId, appId } = await getUserByOpenId(toUserOpenId);
  store.pushMessage(userId, appId, {
    from: appManager.getAppNameById(appId),
    to: userId,
    content,
    timestamp: (new Date()).getTime()
  });
}

/**
 * 给这个mock微信回复图片客服消息
 */
async function replyImage(toUserOpenId, accessToken, mediaId = '') {
  let { userId, appId } = await getUserByOpenId(toUserOpenId);
  store.pushMessage(userId, appId, {
    from: appManager.getAppNameById(appId),
    to: userId,
    image: `https://api.weixin.qq.com/cgi-bin/media/get?access_token=${accessToken}&media_id=${mediaId}`,
    timestamp: (new Date()).getTime()
  });
}

export default {
  generateUser,
  getUser,
  saveLoginInfo,
  getRawData,
  getImportantData,
  getUserByCode,
  getUserByOnlyCode,
  getUserByOpenId,
  getUserIdList,
  getFullUserData,
  sendText,
  replyText,
  replyImage
};
