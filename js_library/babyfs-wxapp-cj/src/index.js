import storage from 'babyfs-wxapp-storage';

// sessionId 指的是一个会话的id 触发一次onLaunch算作一次会话(注意区别checksessionid)
let sessionId = 0;

// replaceStr
function replaceStr(s) {
  return s.replace(/([A-Z])/g, '_$1').toLowerCase();
}

/**
 * @description
 * @author Jerry Cheng
 * @date 2019-01-23
 * @export
 * @param {boolean} [DEBUG=false] debug参数
 * @param {string} APPID 'wxa_sagittarius'
 * @param {array} OPTIONS 公共参数数组
 */
export default function (DEBUG = false, APPID, OPTIONS) {
  // deviceId
  const localDeviceId = storage.getData('device_id');
  let deviceId = 0;
  if (localDeviceId) {
    deviceId = localDeviceId;
  } else {
    deviceId = 'wxx' + +new Date() + Math.floor(Math.random() * 1e7);
    storage.setData('device_id', deviceId);
  }

  let d = function (t, lifeCycle, callback) {
    if (t[lifeCycle]) {
      let s = t[lifeCycle];
      t[lifeCycle] = function (t) {
        callback.call(this, t, lifeCycle);
        s.call(this, t);
      };
    } else {
      t[lifeCycle] = function (t) {
        callback.call(this, t, lifeCycle);
      };
    }
  };

  let c = function (t, a, e) {
    if (t[a]) {
      var s = t[a];
      t[a] = function (t) {
        var n = s.call(this, t);
        e.call(this, [t, n], a);
        return n;
      };
    } else {
      t[a] = function (t) {
        e.call(this, t, a);
      };
    }
  };

  function appLifeFunc(t, lifeCycle) {
    if (lifeCycle === 'onLaunch') {
      this['cj'] = new G(this);
      this.cj_showoption = typeof t !== 'undefined' ? t : {};
    }
    let _event = 'app_stat';
    let i = {
      life_cycle: lifeCycle
    };
    if (lifeCycle === 'onLaunch') sessionId = 'wxx' + +new Date() + Math.floor(Math.random() * 1e7);
    if (lifeCycle === 'onShow') this['app_showtime'] = +new Date();
    if (lifeCycle === 'onHide') {
      this['app_hidetime'] = +new Date();
      i['show_duration'] = this['app_hidetime'] - this['app_showtime'];
    }
    storePoints(this, _event, i);
    if (lifeCycle === 'onHide') {
      console.log('push');
      pushPoints(this);
    }
  }

  function pageLifeFunc(t, lifeCycle) {
    let _this = this;
    let _app = getApp();
    let _event = 'page_stat';
    _this.cj_start_time = Date.now();
    _app.cj_last_page = _this['__route__'];
    let i = {
      life_cycle: lifeCycle,
      cur_page: _this['__route__'],
      page_options: _this.options
    };
    if (lifeCycle === 'onLoad') _app[_this['__route__'] + '_loadtime'] = +new Date();
    if (lifeCycle === 'onShow') _app[_this['__route__'] + '_showtime'] = +new Date();
    if (lifeCycle === 'onUnload') {
      _app[_this['__route__'] + 'unloadtime'] = +new Date();
      i['load_duration'] = _app[_this['__route__'] + 'unloadtime'] - _app[_this['__route__'] + '_loadtime'];
    }
    if (lifeCycle === 'onHide') {
      _app[_this['__route__'] + 'hidetime'] = +new Date();
      i['show_duration'] = _app[_this['__route__'] + 'hidetime'] - _app[_this['__route__'] + '_showtime'];
    }
    if (_app['cj_page_last_page']) i['last_page'] = _app['cj_page_last_page'];
    if (lifeCycle === 'onShow') _app.cj_page_last_page = _this['__route__'];
    storePoints(_app, _event, i);
  }

  function storePoints(_app, en, data) {
    let pointsPara = {
      sid: sessionId,
      en: en,
      ct: +new Date(),
      data: data || {}
    };

    if (!_app.globalData) _app.globalData = {};
    if (!_app.globalData['pointsEvents']) _app.globalData['pointsEvents'] = [];
    const appDeviceIdExisted = _app.cj_showoption && _app.cj_showoption.query && _app.cj_showoption.query.deviceId;
    let commonPoint = {
      deviceId: appDeviceIdExisted ? _app.cj_showoption.query.deviceId : deviceId, // deviceId 为驼峰式 业务上向上兼容数据
      app_ops: _app.cj_showoption,
      uid: storage.getData('uid') || 0
    };

    if (OPTIONS && OPTIONS.length) {
      OPTIONS.forEach(key => {
        commonPoint[replaceStr(key)] = _app.globalData[key];
      });
    }

    Object.assign(pointsPara.data, commonPoint);
    _app.globalData.pointsEvents.push(pointsPara);
    // 小程序自定义埋点集成
    try {
      wx.reportAnalytics(en, data);
    } catch (error) {
      console.log(error);
    }

    if (DEBUG) {
      console.log(pointsPara);
      console.log(_app.globalData.pointsEvents);
    }
  }

  function pushPoints(_app) {
    let url = _app.globalData.host + '/act/log/xiao_app';
    let token = storage.getData('token');
    let sys = wx.getSystemInfoSync();
    let sysInfo = sys.system.toLowerCase();
    let plat = sysInfo.indexOf('ios') > -1 ? 1 : sysInfo.indexOf('android') > -1 ? 2 : '';
    let uid = storage.getData('uid');
    let para = {
      uid: uid || 0,
      app_id: APPID,
      events: _app.globalData.pointsEvents
    };
    let r = 0;
    const headerStaticParams = `version=${sys.version}&sys_version=${sys.SDKVersion}&device=${sys.system}&deviceId=${deviceId}&platform=${plat}`;
    let i = function () {
      wx.request({
        url: url,
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'X-Auth-Token': token,
          'X-Static-Params': headerStaticParams
        },
        data: JSON.stringify(para),
        method: 'POST',
        success: function () {
          console.log('push success');
          _app.globalData.pointsEvents = [];
        },
        fail: function () {
          console.log('push fail');
          if (r < 2) {
            r++;
            i();
          } else {
            storage.setData({
              key: 'pointsEvents',
              data: _app.globalData.pointsEvents
            });
            _app.globalData.pointsEvents = [];
          }
        }
      });
    };
    i();
  }

  function G(t) {
    this.app = t;
  }

  G.prototype['sendEvent'] = function (t, a) {
    h(this.app, t, a);
  };

  let h = function (a, n, r) {
    if (typeof a['cj_showoption'] === 'undefined') {
      a['cj_showoption'] = {};
    }
    storePoints(a, n, r);
  };

  let N = App;
  // eslint-disable-next-line no-global-assign
  App = function (t) {
    let arr = ['onLaunch', 'onUnlaunch', 'onShow', 'onHide', 'onError'];
    for (let i = 0; i < arr.length; i++) {
      d(t, arr[i], appLifeFunc);
    }
    N(t);
  };
  let J = Page;
  // eslint-disable-next-line no-global-assign
  Page = function (t) {
    let arr = ['onLoad', 'onUnload', 'onShow', 'onHide', 'onReachBottom', 'onPullDownRefresh'];
    for (let i = 0; i < arr.length - 1; i++) {
      d(t, arr[i], pageLifeFunc);
    }
    if (typeof t['onShareAppMessage'] !== 'undefined') {
      c(t, 'onShareAppMessage', pageLifeFunc);
    }
    J(t);
  };
}
