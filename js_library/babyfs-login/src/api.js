/*
 * @Author: MuNaipeng
 * @Date: 2020-03-12 15:48:52
 * @Last Modified by: MuNaipeng
 * @Last Modified time: 2020-03-17 17:11:26
 */
import env from 'babyfs-env';
import ajaxRequest, { ApiError } from 'babyfs-request';

let $ajax = ajaxRequest.createInstance();
$ajax.switch({ traceSw: true }); //原始数据，开启日志收集
let API = env.wapi_api;

// 用户登出
export const userLogout = params => {
  return $ajax.get(`${API}/user/logout`, { ...params });
};


