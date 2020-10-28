import ajax from 'axios';
import env from 'babyfs-env';
import * as util from '../lib/util';

// sessionId
let sessionId;
if (sessionStorage.getItem('web_sessionId')) {
  sessionId = sessionStorage.getItem('web_sessionId');
} else {
  sessionId = 'web' + Date.parse(new Date()) + Math.floor(Math.random() * 1e7);
  sessionStorage.setItem('web_sessionId', 'web' + Date.parse(new Date()) + Math.floor(Math.random() * 1e7));
}
// deviceId
let deviceId;
if (localStorage.getItem('web_deviceId')) {
  deviceId = localStorage.getItem('web_deviceId');
} else {
  deviceId = 'web' + Date.parse(new Date()) + Math.floor(Math.random() * 1e7);
  localStorage.setItem('web_deviceId', 'web' + Date.parse(new Date()) + Math.floor(Math.random() * 1e7));
}
// uid
async function uid() {
  let uid;
  if (Number(sessionStorage.getItem('web_uid'))) {
    uid = sessionStorage.getItem('web_uid');
  } else {
    uid = util.getCookie('ba_a_uid') ? await fetchUid() : 0;
    sessionStorage.setItem('web_uid', uid);
  }
  return Promise.resolve(uid.toString());
}

async function fetchUid() {
  const API_HOST = env.wapi_api === '/api' ? '//wapi.dev.babyfs.cn/api' : env.wapi_api;
  // const API_HOST = '//wapi.dev.babyfs.cn/api';
  const URL = '/user/get_user_token';
  const API_URL = `${API_HOST}${URL}`;
  let r;
  try {
    r = await ajax.post(API_URL, null, { withCredentials: true });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
  if (r && r.data.data) {
    return Promise.resolve(r.data.data);
  } else {
    return Promise.resolve(0);
  }
}

export default {
  uid,
  sessionId,
  deviceId
};
