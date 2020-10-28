/*
 * @Author: MuNaipeng
 * @Date: 2019-05-29 10:35:20
 * @Last Modified by: MuNaipeng
 * @Last Modified time: 2019-06-13 17:40:09
 */

import env from 'babyfs-env';
import ajaxRequest, { ApiError } from 'babyfs-request';
let $ajax = ajaxRequest.createInstance();
$ajax.switch({ traceSw: true }); //原始数据，开启日志收集
let API = env.wapi_api;
// console.log('API', API);
if (env.currentEnv === env.EnumEnv.local) {
  API = 'http://localhost:36742/api';
}

// 获取整个area json
export const getAllAreas = params => {
  return $ajax.get(`${API}/basic/area/getAllAreas`, {
    ...params
  });
};

// 根据code递归反查父节点
export const getAllParentAreasByCode = params => {
  return $ajax.get(`${API}/basic/area/getAllParentAreasByCode`, params);
};

// 根据code查询子节点(插件中未使用)
export const getSubAreasByCode = params => {
  return $ajax.get(`${API}/basic/area/getSubAreasByCode`, {
    ...params
  });
};


