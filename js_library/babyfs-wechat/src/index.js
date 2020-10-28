/**
* 主模块文件
*/
import 'babel-polyfill';
import env from 'babyfs-env';
import url from 'babyfs-url';
import ajaxRequest from 'babyfs-request';
import wx from 'babyfs-wechat-jssdk';
import wxApiConfig from './wechat.config';

let ajax = ajaxRequest.createInstance();

function notEmpty(name) {
  throw new Error(`${name}不能为空`);
}

const wxWrapper = {
  share({
    title = notEmpty('分享标题'),
    desc = '',
    link = notEmpty('分享链接'),
    imgUrl = 'https://i.s.babyfs.cn/op/1/47ff244ff71b478f9586f0b095fb0f94.jpg'
  } = {}) {
    // 设置分享文案
    wx.updateAppMessageShareData({
      title,
      desc,
      link,
      imgUrl
    }, function(res) {
      //这里是回调函数
      console.log(res);
    });

    wx.updateTimelineShareData({
      title,
      link,
      imgUrl
    }, function(res) {
      //这里是回调函数
      console.log(res);
    });

    wx.onMenuShareTimeline({
      title,
      link,
      imgUrl,
      success: function () {
        console.log('通过旧版分享到朋友圈接口分享成功');
      }
    });
    wx.onMenuShareAppMessage({
      title,
      desc,
      link,
      imgUrl,
      success: function () {
        console.log('通过旧版分享给朋友接口分享成功');
      }
    });
  },
  closeWindow() {
    return wx.closeWindow();
  },
  hideMenuItems({
    menuList = []
  }) {
    return wx.hideMenuItems({
      menuList
    });
  },
  showMenuItems({
    menuList = []
  }) {
    return wx.showMenuItems({
      menuList
    });
  },
  getNetworkType() {
    return new Promise((resolve, reject) => {
      wx.getNetworkType({
        success: function (res) {
          resolve(res);
        },
        fail(err) {
          reject(err);
        }
      });
    });
  },
  startRecord() {
    return new Promise((resolve, reject) => {
      wx.startRecord({
        success: function(res){
          resolve(res);
        },
        fail: function(err) {
          reject(err);
        }
      });
    });
  },
  stopRecord() {
    return new Promise((resolve, reject) => {
      wx.stopRecord({
        success: function(res){
          resolve(res);
        },
        fail: function(err) {
          reject(err);
        }
      });
    });
  },
  uploadVoice({
    localId = 0,
    isShowProgressTips = 1
  } = {}) {
    return new Promise((resolve, reject) => {
      wx.uploadVoice({
        localId,
        isShowProgressTips,
        success: function(res){
          resolve(res);
        },
        fail: function(err) {
          reject(err);
        }
      });
    });
  },
  stopVoice({
    localId = 0
  } = {}) {
    return new Promise((resolve, reject) => {
      wx.stopVoice({
        localId,
        success: function(res){
          resolve(res);
        },
        fail: function(err) {
          reject(err);
        }
      });
    });
  }
};

function askAuthority(wxApp, reUri = location.href) {
  //请求微信服务号授权，如果是在微信外的场景，会跳到请在微信客户端打开链接的页面
  let reUrl = url.addParameter({
    ts: (new Date()).getTime()
  }, reUri);
  let authUrl = `${env.wapi_api}/m/wx/login?re_url=${encodeURIComponent(reUrl)}&wx_app=${wxApp}`;
  window.location.replace(authUrl);
}

async function jssdkReady(wxApp, url = window.location.href.split('#')[0], debug = false) {
  if (env.app !== env.EnumApp.weixin) {
    throw new Error('不是在微信中打开，无法调用jssdk');
  }
  let res = await ajax.get(`${env.wapi_api}/wx/js_api_conf`, {
    wx_app: wxApp,
    url
  });
  if (res.success) {
    return await new Promise((resolve, reject) => {
      wx.ready(function () {
        resolve(wxWrapper);
      });
      wx.error(function (res) {
        reject(new Error(JSON.stringify(res)));
      });
      wx.config({
        debug,
        appId: res.data.appId,
        timestamp: res.data.timestamp,
        nonceStr: res.data.nonceStr,
        signature: res.data.signature,
        jsApiList: wxApiConfig.apiList,
        openTagList: wxApiConfig.openTagList
      });
    });
  }
  else {
    throw new Error(`获取微信jssdk config失败:${res.msg}`);
  }
}

export default {
  askAuthority,
  jssdkReady
};
