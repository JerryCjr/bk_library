/*
 * @Author: MuNaipeng
 * @Date: 2019-03-27 12:09:04
 * @Last Modified by: MuNaipeng
 * @Last Modified time: 2019-04-29 10:46:16
 */
import cookie from 'babyfs-cookie';
import { ADCLICK_URL, ADCONV_URL } from './utils/api';

/**
 * @description 广告点击上报
 * @author MuNaipeng
 */
const clickUp = (arg, TIMEOUT) => {
  return new Promise((resolve, reject) => {
    let TIMEOUTFLAG = false;
    if (!sessionStorage.getItem('clickuped')) {
      if(cookie.get('ad_platform')) {
        let param = JSON.parse(cookie.get('ad_platform'));
        let params = Object.assign(param, arg);
        ADCLICK_URL(params).then(res => {
          TIMEOUTFLAG = true;
          sessionStorage.setItem('clickuped', 1);
          resolve(res);
        }).catch(err => {
          TIMEOUTFLAG = true;
          resolve({
            success: false,
            msg: '网络错误',
            err: err
          });
        });
        // 超时处理
        if(TIMEOUT){
          const t = setTimeout(() => {
            if(!TIMEOUTFLAG){
              TIMEOUTFLAG = true;
              resolve({
                success: false,
                msg:'request timeout'
              });
            }
            clearTimeout(t);
          },TIMEOUT);
        }
      } else {
        resolve({
          success: false,
          msg: '渠道参数为空'
        });
      }
    } else {
      resolve({
        success: false,
        msg: '渠道一致'
      });
    }
  });
};

/**
 * @description 广告转化上报
 * @author MuNaipeng
 */
const convUp = (arg, TIMEOUT) => {
  return new Promise((resolve, reject) => {
    let TIMEOUTFLAG = false;
    if(cookie.get('ad_platform')) {
      let param = JSON.parse(cookie.get('ad_platform'));
      let params = Object.assign(param, arg);
      ADCONV_URL(params).then(res => {
        TIMEOUTFLAG = true;
        (arg && arg.isEmpty) && cookie.remove('ad_platform');
        resolve(res);
      }).catch(err => {
        TIMEOUTFLAG = true;
        resolve({
          success: false,
          msg: '网络错误',
          err: err
        });
      });
      // 超时处理
      if(TIMEOUT){
        const t = setTimeout(() => {
          if(!TIMEOUTFLAG){
            TIMEOUTFLAG = true;
            resolve({
              success: false,
              msg:'request timeout'
            });
          }
          clearTimeout(t);
        },TIMEOUT);
      }
    } else {
      resolve({
        success: false,
        msg: '渠道参数为空'
      });
    }
  });

};


/**
 * @description 广告上报实例方法
 * @author MuNaipeng
 */
export const adv = (type, arg, TIMEOUT) => {
  return new Promise((resolve, reject) => {
    switch (type) {
      case 'click':
        clickUp(arg, TIMEOUT).then(res => {
          resolve(res);
        });
        break;
      case 'conv':
        convUp(arg, TIMEOUT).then(res => {
          resolve(res);
        });
        break;
      default:
        resolve({
          success: false,
          msg: '错误的广告上报类型'
        });
        console.error('错误的广告上报类型');
    }
  });
};
export default adv;
