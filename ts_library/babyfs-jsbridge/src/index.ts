/**
 * 主模块文件
 */
declare const window: Window & { WebViewJavascriptBridge: any; WVJBCallbacks: any; android_native: any };
const setupWebViewJavascriptBridge = function (callback: any) {
  if (window.WebViewJavascriptBridge) {
    return callback(window.WebViewJavascriptBridge);
  }
  if (window.WVJBCallbacks) {
    return window.WVJBCallbacks.push(callback);
  }
  window.WVJBCallbacks = [callback];
  const WVJBIframe = document.createElement('iframe');
  WVJBIframe.style.display = 'none';
  WVJBIframe.src = 'https://__bridge_loaded__';
  document.documentElement.appendChild(WVJBIframe);
  setTimeout(function () {
    document.documentElement.removeChild(WVJBIframe);
  }, 0);
};

const callHandler = function (funcName: any, params: any) {
  if (window.android_native) {
    params ? window.android_native[funcName](params) : window.android_native[funcName]();
  } else {
    setupWebViewJavascriptBridge(function (bridge: any) {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      bridge.callHandler(funcName, params, function () {});
    });
  }
};

const registerHandler = function (funcName: any, cb: any) {
  if (window.android_native) {
    window[funcName] = cb;
  } else {
    setupWebViewJavascriptBridge(function (bridge: any) {
      bridge.registerHandler(funcName, function (params: any) {
        cb && cb(params);
      });
    });
  }
};

export default {
  callHandler,
  registerHandler,
};
