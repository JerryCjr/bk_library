/*
 * @Author: MuNaipeng
 * @Date: 2020-03-12 11:24:00
 * @Last Modified by: MuNaipeng
 * @Last Modified time: 2020-03-19 15:56:24
 */
import env from 'babyfs-env';
import wechat from 'babyfs-wechat';

/**
 * @param {*} appId 微信环境注册key
 * ios的ua中无miniProgram，但都有MicroMessenger（表示是微信浏览器）
 */
const preEnv = (appId = '') => {
  return new Promise((resolve, reject) => {
    const ua = navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i) === 'micromessenger') { //微信环境
      if (appId) {
        wechat.jssdkReady(appId).then(() => {
          resolve(env.app);
        }).catch(err => {
          reject({
            success: false,
            error: err,
            msg: 'wechat.jssdkReady is fail'
          });
        });
      } else {
        reject({
          success: false,
          error: null,
          msg: 'appId is not found'
        });
      }
    } else {
      resolve(env.app);
    }
  });
};

export default preEnv;
