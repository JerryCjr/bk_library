import request from 'babyfs-wxapp-request';
import store from 'babyfs-wxapp-storage';

const apps = {
  'wxa_pro': 'wx68fe0b8e2cab69fd',
  'wxa_fission': 'wx52aded02662a2b00',
  'wxa_light': 'wx611d41bed764ab6c',
  'wxa_punch': 'wxe0e427abe3107108',
  'wxa_primer': 'wx864ae00f1004181d',
  'wxa_manage': 'wx476345d8a57b9557',
  'wxa_sagittarius': 'wx9c4276aa6e07f1be'
};
let currentWxaUserId;
let currentWxaAppid;
let currentWxaAppName;
const mockWechatKey = 'babyfs_mock_wechat';
function enableMockWxa() {
  currentWxaUserId = store.getData(mockWechatKey);
  if (currentWxaAppid && currentWxaUserId) {
    return true;
  } else {
    return false;
  }
}

const originLogin = wx.login;
const newLogin = function ({
  timeout = undefined,
  success = (res) => { },
  fail = () => { },
  complete = () => { }
} = {}) {
  if (enableMockWxa()) {
    request.GET({
      url: 'https://m.babyfs.cn/mock/wx/login',
      isAbsoluteUrl: true,
      data: {
        userid: currentWxaUserId,
        appid: currentWxaAppid
      }
    }).then(data => {
      success({
        code: data
      });
    }).catch(error => {
      fail(error);
    });
  } else {
    originLogin.call(wx, {
      timeout,
      success,
      fail,
      complete
    });
  }
};

const originCheckSession = wx.checkSession;
const newCheckSession = function ({
  success = (res) => { },
  fail = () => { },
  complete = () => { }
} = {}) {
  if (enableMockWxa()) {
    success();
  } else {
    originCheckSession.call(wx, {
      success,
      fail,
      complete
    });
  }
};

const originGetUserInfo = wx.getUserInfo;
const newGetUserInfo = function ({
  withCredentials = true,
  lang = 'en',
  success = (res) => { },
  fail = () => { },
  complete = () => { }
} = {}) {
  if (enableMockWxa()) {
    request.GET({
      url: 'https://m.babyfs.cn/mock/wx/getuserinfo',
      isAbsoluteUrl: true,
      data: {
        userid: currentWxaUserId,
        appid: currentWxaAppid
      }
    }).then(data => {
      success(data);
    }).catch(error => {
      fail(error);
    });
  } else {
    originGetUserInfo.call(wx, {
      withCredentials,
      lang,
      success,
      fail,
      complete
    });
  }
};

Object.defineProperties(wx, {
  login: {
    value: newLogin,
    writable: true,
    enumerable: true,
    configurable: true
  },
  checkSession: {
    value: newCheckSession,
    writable: true,
    enumerable: true,
    configurable: true
  },
  getUserInfo: {
    value: newGetUserInfo,
    writable: true,
    enumerable: true,
    configurable: true
  }
});

function init(wxaName) {
  currentWxaAppName = wxaName;
  currentWxaAppid = apps[wxaName];
}

function switchUser(complete) {
  request.GET({
    url: 'https://m.babyfs.cn/mock/wx/user/list',
    isAbsoluteUrl: true
  }).then(userIds => {
    let wxaUserId = store.getData(mockWechatKey);
    if (wxaUserId) {
      let idx = userIds.findIndex(elem => elem === wxaUserId);
      if (idx > -1) {
        userIds[idx] = `${userIds[idx]} (current)`;
        userIds.push('当前微信账户');
      } else {
        userIds.push('当前微信账户 (current)');
      }
    } else {
      userIds.push('当前微信账户 (current)');
    }
    wx.showActionSheet({
      itemList: userIds,
      success(res) {
        // 先清除本地缓存
        clearStorage();
        if (res.tapIndex < userIds.length - 1) {
          // 缓存这次选择的mock账户
          store.setData(mockWechatKey, userIds[res.tapIndex]);
        }

        wx.showModal({
          title: '提示',
          content: '请打开调试模式并重启小程序以使用新的账户登录。android可以直接杀掉小程序进程，ios可以直接杀掉微信进程。',
          showCancel: false
        });
      },
      fail(res) {
        wx.showModal({
          title: '提示',
          content: res.errMsg,
          showCancel: false
        });
      },
      complete
    });
  }).catch(() => {
    wx.showModal({
      title: '提示',
      content: '获取mock账户列表失败',
      showCancel: false
    });
    if (complete) {
      complete.call();
    }
  });
}

function sendContactMessage(content) {
  if (!enableMockWxa()) {
    wx.showModal({
      title: '提示',
      content: '未开启mock功能',
      showCancel: false
    });
    return;
  }
  request.POST({
    url: 'https://m.babyfs.cn/mock/wx/message/custom/post',
    isAbsoluteUrl: true,
    data: {
      content,
      wx_app: currentWxaAppName,
      userid: currentWxaUserId
    },
    type: 1
  }).catch(error => {
    wx.showModal({
      title: '提示',
      content: error.message,
      showCancel: false
    });
  });
}

function clearStorage() {
  store.remove('token', true);
  store.remove('uid', true);
  store.remove('session_id', true);
  store.remove(mockWechatKey);
}

export default {
  init,
  switchUser,
  get enableMock() {
    return enableMockWxa();
  },
  sendContactMessage
};
