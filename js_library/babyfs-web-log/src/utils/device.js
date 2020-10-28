/*
 * @Author: MuNaipeng
 * @Date: 2019-04-28 19:01:46
 * @Last Modified by: MuNaipeng
 * @Last Modified time: 2019-06-19 19:35:52
 */
import env from 'babyfs-env';
/**
 * @description 获取设备相关参数的方法
 * @author MuNaipeng
 * @returns
 */
export default function(){
  // 获取初始信息
  const app = navigator.appVersion;
  // 根据括号进行分割
  const left = app.indexOf('(');

  const right = app.indexOf(')');
  const Str = app.substring(left + 1, right).split(';');
  // console.log(Str)
  // 手机型号--苹果 iPhone
  const mobileIphone = Str[0];
  // 手机型号--安卓
  const mobileAndroid = Str[2];
  // 手机系统
  const sysVersion = Str[1];
  // console.log('sys=' + sysVersion);
  // console.log(sysVersion.length)
  // 红米手机等特殊型号处理 匹配字符
  // const res = /Android/;
  const reslut = /Android/.test(mobileAndroid);
  const params = {
    device: '',
    platform: '',
    version: ''
  };
  // 根据设备型号判断设备系统
  if (mobileIphone === 'iPhone') {
    params.device = mobileIphone;
    params.platform = 'iPhone';
    params.version = sysVersion.substring(4, 19);
    // console.log('访问设备型号' + mobileIphone + '系统版本' + Str[1].substring(4, 19));
  } else if (mobileIphone === 'Linux') {
    if (reslut) {
      params.device = Str[4].substring(0, 9);
      params.platform = 'android';
      params.version = mobileAndroid;
      // console.log('访问设备型号' + Str[4].substring(0, 9) + '系统版本' + Str[2]);
    } else {
      params.device = mobileAndroid.substring(0, 9);
      params.platform = 'android';
      params.version = sysVersion;
      // console.log('访问设备型号' + mobileAndroid.substring(0, 9) + '系统版本' + Str[1]);
    }
  } else if (mobileIphone === 'iPad') {
    params.device = mobileIphone;
    params.platform = 'iPad';
    params.version = sysVersion.substring(4, 12);
    // console.log('访问设备' + Str[0] + '系统版本' + Str[1].substring(4, 12));
  }
  let WEB_DEVICEID,WEB_SESSIONID;
  // 设备ID
  if (env.babyfsDeviceId !== -1) {
    WEB_DEVICEID = env.babyfsDeviceId;
  } else {
    if (localStorage.getItem('web_deviceId')) {
      WEB_DEVICEID = localStorage.getItem('web_deviceId');
    } else {
      let deviceId = 'web' + Date.parse(new Date()) + Math.floor(Math.random() * 1e7);
      localStorage.setItem('web_deviceId',deviceId);
      WEB_DEVICEID = deviceId;
    }
  }
  // 会话ID
  if (sessionStorage.getItem('web_sessionId')) {
    WEB_SESSIONID = sessionStorage.getItem('web_sessionId');
  } else {
    let sessionId = 'web' + Date.parse(new Date()) + Math.floor(Math.random() * 1e7);
    sessionStorage.setItem('web_sessionId',sessionId);
    WEB_SESSIONID = sessionId;
  }
  return {
    headerParams : `version=${params.version}&device=${params.device}&platform=${
      params.platform
    }&deviceId=${WEB_DEVICEID}`,
    sid : WEB_SESSIONID
  };
}
