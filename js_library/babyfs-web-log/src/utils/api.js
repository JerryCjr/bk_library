/*
 * @Author: MuNaipeng
 * @Date: 2019-04-28 19:01:46
 * @Last Modified by: MuNaipeng
 * @Last Modified time: 2019-05-16 19:35:28
 */
import env from 'babyfs-env';
import getStaticParam from './device';
import ajaxRequest, { RequestContentType } from 'babyfs-request';
let $ajax = ajaxRequest.createInstance();

$ajax.switch({ returnRawRes: true });
let staticParams = getStaticParam();
$ajax.registerPartialRequestInterceptor('static-management', config => {
  config.headers['X-Static-Params'] = staticParams.headerParams;
  return config;
});
let API = env.wapi_api;
let API_GROWTH = env.wapi_api;
let ACT = env.wapi_act;
if (env.currentEnv === env.EnumEnv.local) {
  API = 'http://localhost:36742/api';
  API_GROWTH = 'http://localhost:36742';
  ACT = 'http://localhost:36742/act';
}

// 埋点上报接口
export const BURIED_URL = params => {
  return $ajax.getContext('static-management').post(`${ACT}/log/wx_h5`, params, {
    contentType: RequestContentType.JSON
  });
};

// 获取用户uid
export const TOKEN_URL = params => {
  return $ajax.post(`${API}/user/get_user_token`, params);
};

// 投放广告点击
export const ADCLICK_URL = params => {
  return $ajax.get(`${API_GROWTH}/growth/advertise/h5/click`, {
      ...params
  });
};

// 投放广告转化
export const ADCONV_URL = params => {
  return $ajax.get(`${API_GROWTH}/growth/advertise/h5/conv`, {
      ...params
  });
};
