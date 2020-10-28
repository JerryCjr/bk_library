import env from '@babyfs/babyfs-env';
import wx from '@babyfs/babyfs-wechat-jssdk';
import url from '@babyfs/babyfs-url';
import axios from 'axios';
import wxApiConfig from './wxApiConf';

const WAPI_PATH = env.host(env.EnumBusiness['wapi_api']);

enum wxType {
  wx,
  qywx,
  qywxAgent,
}

function askAuthority(wxApp: string, reUri = location.href): void {
  const reUrl = url.addParameter(
    {
      ts: new Date().getTime(),
    },
    reUri,
  );
  const authUrl = `${WAPI_PATH}/m/wx/login?re_url=${encodeURIComponent(reUrl)}&wx_app=${wxApp}`;

  window.location.replace(authUrl);
}

async function commonSDKReady(
  wxApp: string,
  url = window.location.href.split('#')[0],
  debug = false,

  type: wxType,
  apiList: string[],
  openTagList: string[],
): Promise<void> {
  return new Promise(async (resolve, reject) => {
    if (env.app === env.EnumApp.weixin) {
      let apiPath;
      switch (type) {
        // * 企业微信 wx.config初始化和 wx.agentConfig初始化, 使用相同的js_api_conf接口
        case wxType.qywx:
        case wxType.qywxAgent:
          apiPath = `${WAPI_PATH}/wx/qywx/js_api_conf`;
          break;

        default:
          apiPath = `${WAPI_PATH}/wx/js_api_conf`;
          break;
      }
      // * 接口获取初始化相关的参数
      let r;
      try {
        r = await axios.get(apiPath, {
          params: {
            wx_app: wxApp,
            url,
          },
        });
      } catch (error) {
        throw error;
      }
      // * 成功拿到数据
      if (r && r.data && r.data.success) {
        const responseData = r.data.data;

        const config = {
          debug,
          timestamp: responseData.timestamp,
          nonceStr: responseData.nonceStr,
          signature: responseData.signature,
          jsApiList: [...wxApiConfig.apiList, ...apiList],
        };

        // * 普通微信 wx.config初始化及 企业微信 wx.config初始化 ready之后的回调一致
        const readyOrErrorHandler = () => {
          wx.ready(() => {
            resolve(wxApiConfig.wx);
          });
          wx.error((error: Error) => {
            console.error(error);
            throw error;
          });
        };

        switch (type) {
          case wxType.qywx:
            readyOrErrorHandler();
            wx.config({
              ...config,
              beta: true,
              appId: responseData.corpId,
            });
            break;

          case wxType.qywxAgent:
            const { agentId = '', corpId = '', timestamp = '', nonceStr = '', signature = '' } = { ...responseData };
            const agentConfigOptions = {
              corpid: corpId,
              agentid: agentId,
              timestamp: String(timestamp),
              nonceStr,
              signature,
              jsApiList: [...apiList],
            };
            wx.invoke('agentConfig', agentConfigOptions, (event: any) => {
              console.log(event);
              // pc和移动端的err_msg格式不一样
              if (
                event &&
                (event.err_msg === 'agentConfig:ok' || event.errMsg === 'agentConfig:ok' || event.jsApiList)
              ) {
                resolve(wx);
              } else {
                reject('error' + event.err_msg || '');
              }
            });
            break;

          default:
            readyOrErrorHandler();
            wx.config({
              ...config,
              appId: responseData.appId,
              openTagList: [...wxApiConfig.openTagList, ...openTagList],
            });
            break;
        }
      } else {
        const msg = r.data.msg ? `js api conf error:${r.data.msg}` : `js api conf error`;
        reject(msg);
      }
    } else {
      reject('不是在微信中打开，无法调用jssdk');
    }
  });
}
/**
 * @function 普通微信的jssdk ready
 * @param wxApp 对应appid
 * @param url 对应当前网页的url
 * @param debug 是否是debug模式
 */
async function jssdkReady(
  wxApp: string,
  url = window.location.href.split('#')[0],
  debug = false,
  apiList: string[] = [],
  openTagList: string[] = [],
): Promise<void> {
  try {
    return await commonSDKReady(wxApp, url, debug, wxType.wx, apiList, openTagList);
  } catch (error) {
    throw error;
  }
}

/**
 * @function 企业微信的jssdk ready
 * @param wxApp 对应appid
 * @param url 对应当前网页的url
 * @param debug 是否是debug模式
 */
async function qyJssdkReady(
  wxApp: string,
  url = window.location.href.split('#')[0],
  debug = false,
  apiList: string[] = [],
  openTagList: string[] = [],
): Promise<void> {
  try {
    return await commonSDKReady(wxApp, url, debug, wxType.qywx, apiList, openTagList);
  } catch (error) {
    throw error;
  }
}

/**
 * @function 企业微信的jssdk agentConfig ready
 * @param wxApp
 * @param url
 * @param debug 不需要填
 * @param apiList
 * @param openTagList 不需要填
 */
async function qyJssdkAgentReady(
  wxApp: string,
  url = window.location.href.split('#')[0],
  debug = false,
  apiList: string[] = [],
  openTagList: string[] = [],
): Promise<void> {
  try {
    return await commonSDKReady(wxApp, url, debug, wxType.qywxAgent, apiList, openTagList);
  } catch (error) {
    throw error;
  }
}

export default {
  askAuthority,
  jssdkReady,
  qyJssdkReady,
  qyJssdkAgentReady,
};
