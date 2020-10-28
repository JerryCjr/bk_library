import header from './header.js';
import storage from 'babyfs-wxapp-storage';
import env from 'babyfs-wxapp-env';
import checkVersion from 'babyfs-wxapp-checkversion';

const TYPES = {
  DEEPEST_DATA_REQUIRED: 0, // 需要返回res.data.data
  DEEPEST_DATA_NOT_REQUIRED: 1 // 不需要返回res.data.data
};

let logger; // 日志上传

if (checkVersion('2.1.0') > -1) {
  logger = wx.getLogManager();
}

export class ApiError extends Error {
  constructor(code = 0, msg = '') {
    super(msg);
    this.code = code;
    this.name = this.constructor.name;
  }
}

function urlCanNotBeEmpty() {
  throw new Error('url is empty!');
}

/**
 * @description errlog
 * @author Jerry Cheng
 * @date 2018-12-05
 * @param {*} code 错误码
 * @param {*} msg 错误信息
 */
function errlog(code, msg, reqLogCarrier, individualFlag = false) {
  if (!individualFlag) {
    wx.showToast({
      title: `Error: ${code}:${msg}`,
      icon: 'none',
      duration: 2000
    });

    // code handler
    switch (code) {
      case 401:
        wx.reLaunch({
          url: '/pages/index/index'
        });
        break;
    }
  }

  if (logger) {
    let carrier = {
      ...reqLogCarrier,
      code,
      msg,
      extra: {}
    };
    const uid = storage.getData('uid');
    const sessionId = storage.getData('session_id');
    const sessionIdInitTs = storage.getData('session_id_init_ts');
    const tokenInitTs = storage.getData('token_init_ts');
    if (uid) carrier['extra']['uid'] = uid;
    if (sessionId) carrier['extra']['session_id'] = sessionId;
    if (sessionIdInitTs) carrier['extra']['session_id_init_ts'] = sessionIdInitTs;
    if (tokenInitTs) carrier['extra']['token_init_ts'] = tokenInitTs;
    logger.warn(JSON.stringify(carrier));
  }

  throw new ApiError(code, msg);
}

/**
 * @description 处理server code
 * @author Jerry Cheng
 * @date 2018-11-20
 * @param { Object } res server返回的data
 */
function handleServerCode(res, reqLogCarrier, individualFlag) {
  if (res) reqLogCarrier['responseData'] = res;
  // 可以根据不同code再做对应的处理
  if (res.msg) {
    errlog(res.code, res.msg, reqLogCarrier, individualFlag);
  } else {
    errlog(res.code, '抱歉出错了', reqLogCarrier, individualFlag);
  }
}

/**
 * @description 处理response statusCode
 * @author Jerry Cheng
 * @date 2018-11-20
 * @param { Object } response
 * @param { Number } type 处理自定义类型的请求
 *           default type 0 返回res.data.data
 *                   type 1 不返回res.data.data
 * @param { Object } reqLogCarrier 需要上传log的载体
 * @param { Boolean } individualFlag true: 单独处理server返回的msg和code false: 不单独处理
 */
function handleResponseStatusCode(response, type, reqLogCarrier, individualFlag) {
  function handleRequestType(type) {
    switch (type) {
      case 1:
        if (response.data.success) {
          return response.data;
        }
        break;
      default:
        if (response.data.success && response.data.data) {
          return response.data.data;
        }
    }
    handleServerCode(response.data, reqLogCarrier, individualFlag);
  }
  if (response) {
    switch (response.statusCode) {
      case 200:
        return handleRequestType(type);
      case 401:
        storage.remove('token');
        storage.remove('token_init_ts');
        errlog(401, '需要登录', reqLogCarrier, individualFlag);
        break;
      case 404:
        errlog(404, '接口不存在', reqLogCarrier, individualFlag);
        break;
      case 500:
        errlog(500, '服务器内部错误', reqLogCarrier, individualFlag);
        break;
      default:
        errlog(response.statusCode, '抱歉出错了', reqLogCarrier, individualFlag);
    }
  } else {
    errlog(0, '抱歉出错了', reqLogCarrier, individualFlag);
  }
}

function GET(requestHandler) {
  return request('GET', requestHandler);
}

function POST(requestHandler) {
  return request('POST', requestHandler);
}

/**
 * requestHandler {
 *   url: '',
 *   data: {},
 *   type: 0/1
 *   individualFlag: false/true
 * }
 */
function request(method, requestHandler) {
  let url, contentType;
  const passContentType = requestHandler['contentType'];
  let data = requestHandler.data ? requestHandler.data : {};
  let type = requestHandler['type'] > TYPES['DEEPEST_DATA_REQUIRED'] ? requestHandler['type'] : TYPES['DEEPEST_DATA_REQUIRED'];

  // contentType以传入为准 不存在或者非法传值使用默认值
  if (passContentType && header.CONTENT_TYPE[passContentType]) {
    contentType = header.CONTENT_TYPE[passContentType];
  } else {
    contentType = header.CONTENT_TYPE['DEFAULT'];
  }

  const API = env.api;
  const token = storage.getData('token');
  const individualFlag = requestHandler['individualFlag'];
  if (requestHandler.url) {
    const isAbsolutePath = /^(http|https):\/\//.test(requestHandler.url);
    url = isAbsolutePath ? requestHandler.url : (API + requestHandler.url);
  } else {
    urlCanNotBeEmpty();
  }
  const reqLogCarrier = {
    url,
    params: data,
    token
  };
  return new Promise((resolve, reject) => {
    wx.request({
      url: url,
      header: {
        'content-type': contentType,
        'X-Auth-Token': token,
        'babyfs-wxapp-source': 'wxapp',
        'babyfs-wxapp-version': `${header.wxappVersion()}`,
        'babyfs-wxapp-name': `${header.wxappName()}`
      },
      data: data,
      method: method, // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      success: function (res) {
        try {
          resolve(handleResponseStatusCode(res, type, reqLogCarrier, individualFlag));
        } catch (error) {
          reject(error);
        }
      },
      fail: function (err) {
        reject(err);
      }
    });
  });
}
export default {
  GET,
  POST,
  TYPES
};
