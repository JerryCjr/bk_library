/**
* 主模块文件
*/
import 'babel-polyfill';

let setupWebViewJavascriptBridge = function (callback) {
  if (window.WebViewJavascriptBridge) {
    return callback(window.WebViewJavascriptBridge);
  }
  if (window.WVJBCallbacks) {
    return window.WVJBCallbacks.push(callback);
  }
  window.WVJBCallbacks = [callback];
  var WVJBIframe = document.createElement('iframe');
  WVJBIframe.style.display = 'none';
  WVJBIframe.src = 'https://__bridge_loaded__';
  document.documentElement.appendChild(WVJBIframe);
  setTimeout(function () {
    document.documentElement.removeChild(WVJBIframe);
  }, 0);
};

let callHandler = function (funcName, params) {
  if (window.android_native) {
    params ? window.android_native[funcName](params) : window.android_native[funcName]();
  } else {
    setupWebViewJavascriptBridge(function (bridge) {
      bridge.callHandler(funcName, params, function () { });
    });
  }
};

let registerHandler = function (funcName, cb) {
  if (window.android_native) {
    window[funcName] = cb;
  } else {
    setupWebViewJavascriptBridge(function (bridge) {
      bridge.registerHandler(funcName, function (params) {
        cb && cb(params);
      });
    });
  }
};

export default {
  callHandler,
  registerHandler
};

