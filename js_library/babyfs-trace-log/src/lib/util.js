import config from './config';

const HAS_CONSOLE = window.console;
const LEVEL_CONSOLE_MAP = {
  INFO: 'log',
  WARN: 'warn',
  ERROR: 'error',
  CRITICAL: 'error'
};

// throw out Errors, with global prefix 'Logline: ' ahead of err.message
export function throwError(errMessage) {
  // eslint-disable-next-line no-console
  HAS_CONSOLE && console.error('Logline: ' + errMessage);
}

// print debug info in develper's console
// TODO: if WechatFE/vConsole is detected, will not use %c feature, as it is not well supported
export function debug(namespace, level, descriptor, data) {
  if (HAS_CONSOLE && config.get().verbose) {
    window.console[LEVEL_CONSOLE_MAP[level.toUpperCase()] || LEVEL_CONSOLE_MAP.INFO](`[${namespace}] ${level.toUpperCase()} ${descriptor}`, data || '');
  }
}

// filter any function in a object
export function filterFunction(obj) {
  var newObj = {},
    i;

  if (typeof obj !== 'object') {
    return obj;
  }

  for (i in obj) {
    if (obj.hasOwnProperty(i)) {
      if (typeof obj[i] !== 'function') {
        newObj[i] = filterFunction(obj[i]);
      }
    }
  }
  return newObj;
}

// getCookie
export function getCookie(key) {
  let arrCookie = document.cookie.split('; ');
  for (let i = 0; i < arrCookie.length; i++) {
    let arr = arrCookie[i].split('=');
    if (arr[0] === key) {
      return arr[1];
    }
  }
  return '';
}
