/**
* 主模块文件
*/
import 'babel-polyfill';
import $jsbridge from 'babyfs-jsbridge';
import $url from 'babyfs-url';
import $wechat from 'babyfs-wechat';
import $cookie from 'babyfs-cookie';

import preEnv from './preEnv';
import { userLogout } from './api';

const dDay = 7;
const rootDomain = '.babyfs.cn';
/**
 * 是否登录
 */
function getIsLogin() {
  return !!($cookie.get('ba_a_uid') && String($cookie.get('ba_a_uid')) === '1');
}

/**
 * 获取urlToken
 */
function getUrlToken() {
  const result = $url.analyze(location.href);
  const queryArr = Object.keys(result.query);
  let token = '';
  if (queryArr.length) {
    queryArr.forEach(el => {
      el.toLowerCase().indexOf('token') !== -1 && (token = result.query[el]);
    });
  }
  return token;
}

/**
* @description 获取运行环境
* @param {Number} envApp
* @param {String} appId
*/
function getEnvApp(envApp, appId) {
  return new Promise((resolve, reject) => {
    let aimEnvApp = -1;
    if (envApp > -1) {
      aimEnvApp = envApp;
      resolve(aimEnvApp);
    } else {
      preEnv(appId).then(eApp => {
        aimEnvApp = eApp;
        resolve(aimEnvApp);
      }).catch(err => {
        reject(err);
      });
    }
  });
}

/**
* @description 设置cookie
* @param {String} key
* @param {*} value
* @param {Number} day
* @param {String} domain
* @param {String} appId
*/
function commonSetCookie(key, value, day, domain) {
  let d = new Date();
  let seconds = d.getSeconds();
  d.setSeconds(seconds + (day - 0) * 24 * 60 * 60);
  let aimDomain = location.hostname.indexOf('.babyfs.cn') > -1 ? domain : location.hostname;
  $cookie.set(key, value, { expires: d, domain: aimDomain });
}

/**
 * @param {Number} day
 * @param {String} domain
 * @description 设置uid
 */
function setUid(day = dDay, domain = rootDomain) {
  commonSetCookie('ba_a_uid', 1, day, domain);
}

/**
 * @param {String} token
 * @param {Number} day
 * @param {String} domain
 * @description 设置token
 */
function setToken(token = '', day = dDay, domain = rootDomain) {
  if (token) {
    commonSetCookie('X-Root-Auth-Token', token, day, domain);
  } else {
    console.error('token is not found');
  }
}

// ------------------三种登录态设置方式--------------------
/**
* app登录
*/
function appLogin() {
  $jsbridge.callHandler('goToLogin');
}

/**
* @param {String} appId
* @description 微信登录
*/
function wxLogin(appId = '', reUri = location.href) {
  if (appId) {
    $wechat.askAuthority(appId, reUri);
  } else {
    console.error('appId is not found');
  }
}

/**
 * @param {String} token
 * @param {Number} day
 * @param {String} domain
 * @description 设置uid&token
 */
function setUidToken(token = '', day = dDay, domain = rootDomain) {
  setUid(day, domain);
  setToken(token, day, domain);
}

// -----------------------------------------------------

/**
 * @param {String} token
 * @param {Number} day
 * @param {String} domain
 * @param {Boolean} isGetUrlToken
 * @description 清理登录态设置token
 */
function commonSetUidToken({token = '', day = dDay, domain = rootDomain, isGetUrlToken = true} = {}) {
  return new Promise((resolve, reject) => {
    let aimToken = isGetUrlToken ? (token || getUrlToken()) : token;
    if (aimToken) {
      babyfsLogout().then(() => {
        setUidToken(aimToken, day, domain);
        const t = setTimeout(() => {
          resolve({ success: true });
          clearTimeout(t);
        }, 0);
      }).catch(err => {
        reject({
          success: false,
          error: err,
          msg: 'user logout fail'
        });
      });
    } else {
      reject({
        success: false,
        error: null,
        msg: 'token is not found'
      });
    }
  });
}

/**
 * 浏览器登录
 */
function browserLogin() {
  console.log('方法开发中');
}

/**
* babyfsLogout
*/
function babyfsLogout() {
  return new Promise((resolve, reject) => {
    // 移除非服务端设置的token(本域和根域)
    $cookie.remove('X-Auth-Token');
    $cookie.remove('X-Root-Auth-Token');
    $cookie.remove('ba_a_uid');
    $cookie.remove('X-Auth-Token', { domain: rootDomain });
    $cookie.remove('X-Root-Auth-Token', { domain: rootDomain });
    $cookie.remove('ba_a_uid', { domain: rootDomain });
    // 移除weblog模块_uid(建议站点优先使用此方法)
    sessionStorage.removeItem('_uid');
    userLogout()
    .then(() => {resolve({ success: true });})
    .catch(err => reject({
      success: false,
      error: err,
      msg: 'user logout fail'
    }));
  });
};

/**
* @param {Number} envApp
* @param {String} appId
* @param {String} token
* @param {Number} day
* @param {String} domain
* @param {Boolean} isGetUrlToken
* @param {Function} ieCallback
* @description 公共登录方法
*/
function babyfsLogin ({ envApp = -1, appId = '',reUri = location.href, token = '', day = dDay, domain = rootDomain, isGetUrlToken = true, ieCallback } = {}) {
  return new Promise((resolve, reject) => {
    getEnvApp(envApp, appId)
    .then(eApp => {
      if (eApp === 13) {
        commonSetUidToken({token, day, domain, isGetUrlToken}).then(data => {
          resolve(data);
        }).catch(err => {
          reject(err);
        });
      } else {
        if (!getIsLogin()) {
          if (eApp === 1) {
            appLogin();
          } else if (eApp === 2) {
            wxLogin(appId, reUri);
          } else {
            if (ieCallback && typeof ieCallback === 'function') {
              ieCallback();
            } else {
              console.error('the wrong type of ieCallback or method is not found');
            }
          }
        } else {
          resolve({ success: true });
        }
      }
    }).catch(err => {
      reject(err);
    });
  });
};

const o = new Object();
o.isLogin = false;
o.setUid = setUid;
o.setToken = setToken;
o.setUidToken = setUidToken;
o.appLogin = appLogin;
o.wxLogin = wxLogin;
o.commonSetUidToken = commonSetUidToken;
o.babyfsLogout = babyfsLogout;
o.babyfsLogin = babyfsLogin;

Object.defineProperty(o, 'isLogin', {
  enumerable: true,
  configurable: true,
  get() {
    return getIsLogin();
  }
});

export default o;
