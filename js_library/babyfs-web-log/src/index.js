/*
 * @Author: MuNaipeng
 * @Date: 2018-06-22 09:24:01
 * @Last Modified by: MuNaipeng
 * @Last Modified time: 2019-05-05 15:53:32
 */
import env from 'babyfs-env';
import cookie from 'babyfs-cookie';
import {setCookie, getQuery, getQueryKey} from './utils/util.js';
import adv from './advert.js';
import getStaticParam from './utils/device';
import { BURIED_URL, TOKEN_URL } from './utils/api';
let APP = {}, TIMEOUTFLAG = false;

/**
 * @description
 * @author MuNaipeng
 * @param {*} EV_NAME 事件名称
 * @param {*} [OPS={}] 事件相关参数
 * @param {*} uid userId
 * @returns
 */
function commonBurid(EV_NAME, OPS = {}, uid = 0) {
  return new Promise((resolve, reject) => {
    let staticParams = getStaticParam(), ct = Date.parse(new Date()), localParams = {};
    localParams['url'] = window.location.origin;
    localParams['path'] = window.location.pathname;
    localParams['query'] = getQuery();
    let dataObj = Object.assign(localParams, OPS );
    const myData = {
      app_id: APP.appId,
      uid: uid - 0,
      sid:staticParams.sid,
      events: [
        {
          ct: ct,
          en: EV_NAME,
          data: dataObj
        }
      ]
    };
    BURIED_URL(myData)
    .then(res => {
      if (res.data.success) {
        resolve(res.data);
      } else {
        reject(res.data);
      }
      TIMEOUTFLAG = true;
    })
    .catch(err => {
      reject({
        success: false,
        msg: err
      });
      TIMEOUTFLAG = true;
    });
  });

}

/**
 * @description 点击事件恶意处理
 * @author MuNaipeng
 * @param {*} EV_NAME 事件名
 * @returns
 */
function checkDealMethod(EV_NAME) {
  return new Promise((resolve,reject) => {
    let _ct = 0, _EV_NAME = '', ct = new Date().getTime();
    if (sessionStorage.getItem('_ct')) {
      _ct = sessionStorage.getItem('_ct');
      _EV_NAME = sessionStorage.getItem('_EV_NAME');
    }
    //300毫秒内点击多次视为恶意操作
    if (EV_NAME === _EV_NAME && ct - (_ct - 0) < 300) reject({success: false, msg: '恶意点击'});
    sessionStorage.setItem('_ct', ct);
    sessionStorage.setItem('_EV_NAME', EV_NAME);
    resolve('正常操作');
  });
}

/**
 * @description 常规埋点
 * @author MuNaipeng
 * @param {*} EV_NAME 事件名称
 * @param {*} [OPS={}] 事件相关参数
 * @param {*} TIMEOUT 埋点超时时间[单位毫秒]
 */
const log = (EV_NAME, OPS = {}, TIMEOUT) => {
  return new Promise((resolve, reject) => {
    TIMEOUTFLAG = false;
    checkDealMethod(EV_NAME).then(() => {
      OPS['channel'] = env.app;
      if (cookie.get('ad_channel')) OPS['platform'] = decodeURIComponent(cookie.get('ad_channel'));
      try {
        if (!sessionStorage.getItem('_uid')) {
          TOKEN_URL().then(res => {
            if (res.data.success) {
              let uid = '';
              if (res.data.data) {
                uid = res.data.data;
                sessionStorage.setItem('_uid', uid);
                commonBurid(EV_NAME, OPS, uid)
                .then(res => resolve(res))
                .catch(err => resolve(err));
              } else {
                commonBurid(EV_NAME, OPS, uid)
                .then(res => resolve(res))
                .catch(err => resolve(err));
              }
            } else {
              resolve(res.data);
            }
          })
          .catch(err => resolve({
            success: false,
            msg: err
          }));
        } else {
          const uid = sessionStorage.getItem('_uid');
          commonBurid(EV_NAME, OPS, uid)
          .then(res => resolve(res))
          .catch(err => resolve(err));
        }
      } catch (err) { resolve(err);}
      // 超时处理
      if(TIMEOUT){
        const t = setTimeout(() => {
          if(!TIMEOUTFLAG){
            TIMEOUTFLAG = true;
            resolve('request timeout');
          }
          clearTimeout(t);
        },TIMEOUT);
      }
    })
    .catch(err => resolve(err));
  });
};

// 注册为全局组件的函数
export default {
	install(Vue, appId, day) {
    APP.appId = appId;
    try {
      if(getQueryKey('ad_channel')) {
        let str = JSON.stringify(getQuery());
        setCookie('ad_platform', str, day);
        if (cookie.get('release_platform') !== str) {
          setCookie('release_platform', encodeURIComponent(str), day);
        }
        cookie.get('ad_channel') !== getQueryKey('ad_channel') && setCookie('ad_channel', encodeURIComponent(decodeURIComponent(getQueryKey('ad_channel'))), day);
      }
    } catch (error) {
      console.error(error);
    }
    Vue.prototype.$log = log;
    Vue.prototype.$adv = adv;
	}
};
