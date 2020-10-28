import Logline from 'babyfs-trace-log';
import { whiteList } from './list';

interface target {
  [propName: string]: any;
}

interface data {
  [propName: string]: any;
}

interface response {
  [propName: string]: any;
}

interface config {
  [propName: string]: any;
}

interface request {
  [propName: string]: any;
}

const trace = new Logline('ajax_namespace');

/**
 * @func traceRecord
 * @param {*} level 级别
 * @param {*} descriptor 描述
 * @param {*} data 自定义数据
 */
function traceRecord(sw: boolean, level: string, descriptor: string, data: data) {
  // eslint-disable-next-line no-console
  // console.log(level, descriptor, data);
  if (sw) trace[level](descriptor, data);
}

/**
 * @desc recombine response
 * @param {*} target
 * @returns response recombined
 */
function recombineResponse(target: target) {
  // if (!target) return 'target error in recombineResponse';
  let response: response = {};
  const config = target.config;
  if (config && config.url) {
    response['url'] = config.url;
  } else {
    response['url'] = '';
  }
  target.data ? (response['response'] = target.data) : '';
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
function recombineRequest(target: target) {
  // if (!target) return 'target error in recombineRequest';
  const request: request = {};
  target.url ? (request['url'] = target.url) : '';
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

export { traceRecord, recombineResponse, recombineRequest };
