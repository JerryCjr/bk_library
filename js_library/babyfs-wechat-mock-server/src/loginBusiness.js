import crypto from 'crypto-js';
import randomIdHelper from './randomIdHelper';
import userBusiness from './userBusiness';

const iv = 'ABCDEF1234123412';

async function wxaLogin(userid, appid) {
  let key = randomIdHelper.aesKey();
  let truekey = crypto.enc.Utf8.parse(key);
  let trueiv = crypto.enc.Utf8.parse(iv);

  //生成session_key
  let aesKey = truekey;
  let sessionKey = crypto.enc.Base64.stringify(aesKey);
  let base64_iv = crypto.enc.Base64.stringify(trueiv);
  let code = 'mock_' + crypto.MD5(`code_${sessionKey}`).toString();

  let userInfo = await userBusiness.getRawData(userid);
  let rawData = JSON.stringify(userInfo);
  //生成userinfo的签名
  let signature = crypto.SHA1(`${rawData}${sessionKey}`).toString();
  let importantData = JSON.stringify(await userBusiness.getImportantData(userid, appid));
  let encryptedData = aesEncrypt(aesKey, trueiv, importantData);

  await userBusiness.saveLoginInfo(userid, appid, {
    key,
    sessionKey,
    code,
    userInfo,
    rawData,
    signature,
    encryptedData,
    base64_iv
  });

  return code;
}

async function code2Session(appid, secret, code, grantType) {
  try {
    let user = await userBusiness.getUserByCode(appid, code);
    return {
      openid: user.openIdList[appid],
      session_key: user.loginInfoList[appid].sessionKey,
      unionid: user.unionId,
      errcode: 0,
      errMsg: ''
    };
  }
  catch (e) {
    if (e.message === 'code无效') {
      return {
        errcode: 40029,
        errMsg: e.message
      };
    }
    else {
      return {
        errcode: -1,
        errMsg: '系统繁忙，此时请开发者稍候再试'
      };
    }
  }
}

async function getUserInfo(userid, appid) {
  let user = await userBusiness.getUser(userid);
  let loginInfo = user.loginInfoList[appid];
  if (!loginInfo) {
    throw new Error('请先登录');
  }
  return {
    userInfo: loginInfo.userInfo,
    rawData: loginInfo.rawData,
    signature: loginInfo.signature,
    encryptedData: loginInfo.encryptedData,
    iv: loginInfo.base64_iv
  };
}

function aesEncrypt(key, iv, data) {
  let encryptResult = crypto.AES.encrypt(data, key, {
    iv: iv,
    mode: crypto.mode.CBC,
    padding: crypto.pad.Pkcs7
  });
  return encryptResult.toString();
}

async function ofaLogin(userid, appid) {
  let code = `mock_code_${randomIdHelper.getUniqueId()}`;
  let accessToken = `mock_access_${randomIdHelper.getUniqueId()}`;
  let refreshToken = `mock_refresh_${randomIdHelper.getUniqueId()}`;
  await userBusiness.saveLoginInfo(userid, appid, {
    code,
    accessToken,
    refreshToken
  });

  return code;
}

async function code2AccessToken(appid, secret, code, grantType) {
  try {
    let res = await userBusiness.getUserByOnlyCode(code);
    let user = res.user;
    appid = res.appid;
    return {
      access_token: user.loginInfoList[appid].accessToken,
      expires_in: 7200,
      refresh_token: user.loginInfoList[appid].refreshToken,
      openid: user.openIdList[appid],
      scope: 'snsapi_userinfo',
      unionid: user.unionId
    };
  }
  catch (e) {
    if (e.message === 'code无效') {
      return {
        errcode: 40029,
        errMsg: 'invalid code'
      };
    }
    else {
      return {
        errcode: -1,
        errMsg: '系统繁忙，此时请开发者稍候再试'
      };
    }
  }
}

export default {
  login: wxaLogin,
  code2Session,
  getUserInfo,
  ofaLogin,
  code2AccessToken
};
