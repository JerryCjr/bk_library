import wxapi from 'babyfs-wxapp-api';
import ajax from 'babyfs-wxapp-request';
import storage from 'babyfs-wxapp-storage';
import mockWechat from 'babyfs-wxapp-mock';

/**
 * @func 获取用户信息
 * @param {object} e
 * @param {string} wxApp 小程序对应的key
 * @param {function} successCallback 成功回调
 * @param {function} failCallback 失败回调
 */
let bindgetuserinfo = async function (e, wxApp, successCallback, failCallback) {
  if (mockWechat.enableMock) {
    let sessionId = storage.getData('session_id');
    let token = storage.getData('token');
    if (!sessionId) await getSession(wxApp);
    let res = await wxapi.getUserInfoAsync();
    let wxGroupKey = {
      'wx_encrypted_data': res.encryptedData,
      'wx_iv': res.iv
    };
    if (!token) await getToken(wxGroupKey); // token 已存在不再调用 wxx_login 否则报错
    successCallback && successCallback(res.userInfo);
  } else {
    if (e.detail.errMsg === 'getUserInfo:ok') {
      let userInfo = {
        ...e.detail['userInfo']
      };
      let wxGroupKey = {
        'wx_encrypted_data': e.detail.encryptedData,
        'wx_iv': e.detail.iv
      };
      let token = storage.getData('token');
      if (!token) { // token 已存在不再调用 wxx_login 否则报错
        try {
          await getToken(wxGroupKey);
          successCallback && successCallback(userInfo);
        } catch (error) {
          console.log(error);
          await getSession(wxApp);
          failCallback && failCallback(error);
        }
      };
    } else {
      console.log(e.detail.errMsg);
      failCallback && failCallback(e);
    }
  }
};

let getToken = async function (wxGroupKey) {
  let params = null;
  let options = null;
  params = {
    ...wxGroupKey
  };
  params['wx_session_id'] = storage.getData('session_id');
  options = {
    url: '/api/user/wxx_login',
    data: params
  };
  let r = await ajax.POST(options);
  if (r) {
    storage.setData('token', r.token);
    storage.setData('uid', r.user.id);
    storage.setData('token_init_ts', +new Date());
  }
};

let getSession = async function (wxApp) {
  let r = await wxapi.loginAsync();
  if (r) {
    let options = {
      url: '/api/user/wxx_session',
      data: {
        wx_js_code: r.code,
        wx_app: wxApp
      }
    };
    let res = await ajax.POST(options);
    if (res) {
      storage.setData('session_id', res.session_id);
      storage.setData('session_id_init_ts', +new Date());
    }
  }
};

let checkSession = async function (wxApp) {
  console.log('checkSession');
  let sessionId = storage.getData('session_id');
  if (!sessionId) {
    await getSession(wxApp);
  } else {
    // 2小时失效
    let lastSessionTs = storage.getData('session_id_init_ts');
    let du = +new Date() - lastSessionTs;
    if (du >= 2 * 60 * 60 * 1000) {
      await getSession(wxApp);
    }
  }
  let r;
  try {
    r = await wxapi.checkSessionAsync();
  } catch (error) {
    console.log(error);
    if (error.errMsg === 'checkSession:fail Error: session time out, need relogin') {
      await getSession(wxApp);
    }
  }
  if (r) { // checkSession 未过期
    console.log(r);
  }
};

export default {
  bindgetuserinfo,
  checkSession
};
