import Logline from 'babyfs-trace-log';
import {
  whiteList
} from './list.js';

const trace = new Logline('ajax_namespace');

/**
 * @func traceRecord
 * @param {*} level 级别
 * @param {*} descriptor 描述
 * @param {*} data 自定义数据
 */
function traceRecord(sw, level, descriptor, data) {
  // eslint-disable-next-line no-console
  // console.log(level, descriptor, data);
  if (sw) trace[level](descriptor, data);
}

/**
 * @desc recombine response
 * @param {*} target
 * @returns response recombined
 */
function recombineResponse(target) {
  if (!target) return 'target error in recombineResponse';
  let response = {};
  const config = target.config;
  config && config.url ? response['url'] = config.url : '';
  target.data ? response['response'] = target.data : '';
  if (response['url'] && config && (config.params || config.data)) {
    const url = response['url'];
    response['params'] = config.params || config.data;
    for (let index = 0; index < whiteList.length; index++) {
      if (whiteList[index].test(url)) {
        response['params'] = '****'; // 对匹配到白名单的参数加密
        break;
      }
    }
  }
  return response;
}

/**
 * @description recombine request
 * @param {*} target
 * @returns request recombined
 */
function recombineRequest(target) {
  if (!target) return 'target error in recombineRequest';
  let request = {};
  target.url ? request['url'] = target.url : '';
  if (request['url'] && (target.params || target.data)) {
    const url = request['url'];
    request['params'] = target.params || target.data;
    for (let index = 0; index < whiteList.length; index++) {
      if (whiteList[index].test(url)) {
        request['params'] = '****'; // 对匹配到白名单的参数加密
        break;
      }
    }
  }
  return request;
}

export {
  traceRecord,
  recombineResponse,
  recombineRequest
};
