import 'babel-polyfill';
import cookie from 'babyfs-cookie';
import url from 'babyfs-url';
import cache from './cache';

/**
 * @func 在安卓webview中刷新token值
 * @desc api接口统一更换到wapi.babyfs.cn后 兼容Android version <= 15.2 webview中无法携带token的bug (15.2以后才会将token种到根域 之前的版本都是种到当前域)
 *       如果cookie 当前域(m.babyfs.cn)有token值 根域(.babyfs.cn)没有token值 则会将当前域下的token刷到根域下
 */
function refreshTokenInAndroidWebview() {
  const BABYFS = /\bbabyfs\/([\d.]+)(\((\d+),[^)]+\))?/;
  const ANDROID = /android/ig;
  const UA = window.navigator.userAgent;
  const GROUP = UA.match(BABYFS); // 正则匹配宝玩客户端标识
  const IS_ANDROID = ANDROID.test(UA);
  const IS_LOGIN = cookie.get('ba_a_uid'); // 判断是否登录 expected to be 1
  let tkRefreshed = url.analyze(window.location.href).query['_tk_refreshed'];
  if (tkRefreshed) cache.setSession('_tk_refreshed', Number(tkRefreshed));
  const HAVE_REFRESHED = Number(cache.getSession('_tk_refreshed')) > 0; // _tk_refreshed: 取值>0 表示refresh token成功
  let version; // 客户端版本
  if (GROUP) version = Number(GROUP[1]);
  const flag = !!(GROUP && IS_ANDROID && !(version > 15.2) && !HAVE_REFRESHED && !!IS_LOGIN); // 是客户端 是安卓 版本在15.2及以下 未刷新token 已登录状态
  // eslint-disable-next-line no-console
  console.log('[GROUP]: ', GROUP,
    '[IS_ANDROID]: ', IS_ANDROID,
    '[!(version > 15.2)]: ', !(version > 15.2),
    '[!HAVE_REFRESHED]: ', !HAVE_REFRESHED,
    '[!!IS_LOGIN]: ', !!IS_LOGIN,
    '[flag]: ', flag);
  // eslint-disable-next-line no-console
  console.log(flag);
  // 兼容安卓<=15.2的版本 且只有在已登录的情况
  if (flag) {
    try {
      let reUrl = url.addParameter({ ts: (new Date()).getTime() });
      let refreshUrl = `${window.location.origin}/api/user/refresh_root_token?re_url=${encodeURIComponent(reUrl)}`;
      window.location.replace(refreshUrl);
      return true;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      return false;
    }
  } else {
    return false;
  }
}

export {
  refreshTokenInAndroidWebview
};
