/**
 * Main file
 * babyfs-request encapsulates the axios library which based promise,and can be used in web and node.js.
 * babyfs-request exposes several methods for consumers to make a http request handily.
 * it supports below features:
 * (1)Filter parameters, remove some invalid parameters, like empty string, null and undefiend by default.
 * (2)Solve the issue that cannot change the content type while posting object with content type - 'x-www-form-urlencoded'.
 * (3)Create unified api error for consumer to process.
 * (4)Hidden the implementation and support get/post methods and other RESTful methods if necessary.
 * (5)support partial context interceptors for user to intercept reqeust or response by context name
 */
import 'babel-polyfill';
import axios from 'axios';
import qs from 'qs';
import PartialInterCeptorContextFactory, {
  PartialInterceptorManager
} from './partial-interceptor';
import { filterRequestEmptyParams } from './util';
import ApiError from './api-error';
import {
  traceRecord,
  recombineRequest,
  recombineResponse
} from './trace/util.js';

function urlCanNotBeEmpty() {
  throw new Error('url is empty!');
}

export const RequestContentType = {
  URL_ENCODE: 0,
  JSON: 1,
  FORM_DATA: 2
};

const formDataContentType = 'multipart/form-data';
const defaultRequestConfig = { timeout: 20000 };

const getInstanceConfig = (instanceConfig = {}) => {
  const { timeout, baseURL } = instanceConfig;
  return Object.assign({}, defaultRequestConfig, { timeout, baseURL });
};

const AjaxRequestWrapper = function(instanceConfig) {
  const axiosInstanceConfig = getInstanceConfig(instanceConfig);
  const requestPartialInterceptorMgr = new PartialInterceptorManager();
  const responsePartialIntrerceptorMgr = new PartialInterceptorManager();
  let returnRawResponse = false; // 返回原始响应体开关
  let traceSwitch = false; // trace 开关

  const ajax = axios.create(axiosInstanceConfig);

  ajax.interceptors.request.use(
    config => {
      traceRecord(traceSwitch, 'info', 'request info', recombineRequest(config));
      return config;
    },
    error => {
      error.message ? traceRecord(traceSwitch, 'error', 'request error', error.message) : '';
      return Promise.reject(error);
    }
  );

  ajax.interceptors.response.use(
    res => {
      traceRecord(traceSwitch, 'info', 'response info', recombineResponse(res));
      if (res && res.status === 200) {
        if (returnRawResponse) {
          return res;
        } else {
          if (res.data) {
            return res.data;
          } else {
            throw new ApiError(200, '接口返回数据为空');
          }
        }
      } else {
        throw new ApiError(0, '抱歉出错了');
      }
    },
    error => {
      let errorInstance = null;
      if (error.response) {
        traceRecord(traceSwitch, 'error', 'response error', recombineResponse(error.response));
        errorInstance = ApiError.createBuiltInApiError(error.response.status);
      } else {
        traceRecord(traceSwitch, 'error', 'response error', error.message);
        errorInstance = new ApiError(0, '抱歉出错了');
      }
      // throw error
      return Promise.reject(errorInstance);
    }
  );

  // create a partial interceptor processor used to process interceptors
  const partialInterceptorProcessorCreator = () => {
    let reqInterceptorIds = [];
    let resInterceptorIds = [];
    const before = (reqInterceptors, resInterceptors) => {
      reqInterceptorIds = reqInterceptors.map(item => {
        return ajax.interceptors.request.use(item.fulfilled, item.rejected);
      });
      resInterceptorIds = resInterceptors.map(item => {
        return ajax.interceptors.response.use(item.fulfilled, item.rejected);
      });
    };
    const after = () => {
      reqInterceptorIds.forEach(itemId => {
        ajax.interceptors.request.eject(itemId);
      });
      resInterceptorIds.forEach(itemId => {
        ajax.interceptors.response.eject(itemId);
      });
    };
    return {
      before,
      after
    };
  };

  // create partial interceptor factory
  const partialInterceptorFactory = new PartialInterCeptorContextFactory(
    requestPartialInterceptorMgr,
    responsePartialIntrerceptorMgr,
    partialInterceptorProcessorCreator
  );

  class AjaxRequest {
    registerRequestInterceptor(fulfilled, rejected) {
      if (fulfilled || rejected) {
        ajax.interceptors.request.use(fulfilled, rejected);
      }
    }

    registerResponseInterceptor(fulfilled, rejected) {
      if (fulfilled || rejected) {
        ajax.interceptors.response.use(fulfilled, rejected);
      }
    }

    registerPartialRequestInterceptor(contextName, fulfilled, rejected) {
      requestPartialInterceptorMgr.addInterceptor(contextName, {
        fulfilled,
        rejected
      });
    }

    registerPartialResponseInterceptor(contextName, fulfilled, rejected) {
      responsePartialIntrerceptorMgr.addInterceptor(contextName, {
        fulfilled,
        rejected
      });
    }

    getContext(contextName) {
      return partialInterceptorFactory.getContext(contextName, this);
    }

    createInstance(instanceConfig) {
      return new (AjaxRequestWrapper(instanceConfig))();
    }

    /**
     * send a get request with url,param and config
     * @param {String} url
     * @param {Object} params
     * @param {Object} config
     */
    async get(
      url = urlCanNotBeEmpty(),
      params,
      { withCredentials = true, filterEmptyParams = true } = {}
    ) {
      let resultParams = params || {};
      resultParams.ts = +new Date();
      if (filterEmptyParams) {
        resultParams = filterRequestEmptyParams(resultParams);
      }
      return await ajax.get(url, {
        params: resultParams,
        withCredentials
      });
    }

    /**
     * send a post request with url,param and config
     * @param {String} url
     * @param {Object} params
     * @param {Object} config
     */
    async post(
      url = urlCanNotBeEmpty(),
      params,
      {
        withCredentials = true,
        filterEmptyParams = true,
        contentType = RequestContentType.URL_ENCODE
      } = {}
    ) {
      // maintain backwards compatibility, by default send data with url encoded
      let resultParams = params;
      if (filterEmptyParams) {
        resultParams = filterRequestEmptyParams(params);
      }
      if (contentType === RequestContentType.URL_ENCODE) {
        resultParams = qs.stringify(resultParams);
      }
      let httpHeader = {};
      if (contentType === RequestContentType.FORM_DATA) {
        httpHeader['Content-Type'] = formDataContentType;
      }
      return await ajax.post(url, resultParams, {
        withCredentials,
        headers: httpHeader
      });
    }
    /**
     * @description 开关
     * @param {Object} [{
     *       returnRawRes = false, 是否返回原始响应体
     *       traceSw = false 是否要开启trace日志
     *     }={}]
     * @memberof AjaxRequest
     */
    switch({
      returnRawRes = false,
      traceSw = false
    } = {}) {
      returnRawResponse = returnRawRes;
      traceSwitch = traceSw;
    }
  }
  return AjaxRequest;
};

export default AjaxRequestWrapper();
