/*
 * @Author: MuNaipeng
 * @Date: 2019-03-13 14:19:09
 * @Last Modified by: MuNaipeng
 * @Last Modified time: 2019-03-22 14:34:21
 */
// cookie
import cookie from 'babyfs-cookie';
import env from 'babyfs-env';

// 设置cookie
export const setCookie = (name, value, days) => {
  let setting = null;
  days = days || 7;
  let d = new Date();
  d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
  setting = {
    expires: d
  };
  let domain = env.currentEnv === env.EnumEnv.local ? location.hostname : 'babyfs.cn';
  setting['domain'] = domain;
  cookie.set(name, value, setting);
};

/**
 * @description 获取参数键值对
 * @author MuNaipeng
 */
export const getQuery = () => {
  let url = location.href;
	if(url.indexOf('?') > -1) {
    let result = {};
		let paraStr = url.split('?')[1];
		let paraItems = paraStr.split('&');
		for(var i = 0; i < paraItems.length; i++) {
      let paraKey = paraItems[i].split('=')[0];
      let paraValue = paraItems[i].split('=')[1];
      result[paraKey] = paraValue;
		}
    return result;
	} else {
		return null;
	}
};

/**
 * @description 参数获取
 * @author MuNaipeng
 * @param {*} param
 * @returns
 */
export const getQueryKey = (param) => {
  const reg = new RegExp('(^|&)' + param + '=([^&]*)(&|$)');
  const r = window.location.search.substr(1).match(reg) || window.location.hash.substring((window.location.hash.search(/\?/)) + 1).match(reg);
  if (r != null) {
      return decodeURIComponent(r[2]);
  }
};
