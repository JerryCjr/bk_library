/**
 * Partial Interceptor Manager
 * Responsible for add and get partial interceptor by context name
 */
interface interceptorMap {
  [propName: string]: any;
}

interface interceptor {
  [propName: string]: any;
}

export class PartialInterceptorManager {
  interceptorMap: interceptorMap;
  constructor() {
    this.interceptorMap = {};
  }
  addInterceptor(contextName: string, interceptor: interceptor) {
    if (!this.interceptorMap[contextName]) {
      this.interceptorMap[contextName] = [];
    }
    this.interceptorMap[contextName].push(interceptor);
  }
  getContextInterceptors(contextName: string) {
    if (this.interceptorMap[contextName]) {
      return this.interceptorMap[contextName];
    }
    return [];
  }
}

function createPartialInterceptorContext(
  requestInterceptors: any,
  responseInterceptors: any,
  ajaxRequest: any,
  partialInterceptorProcessorCreator: any,
) {
  const invokerWrapper = (invoker: any) => {
    const processor = partialInterceptorProcessorCreator();
    return function (params: any) {
      if (processor) {
        processor.before(requestInterceptors, responseInterceptors);
      }
      // call method
      const result = invoker.apply(ajaxRequest, params);
      if (processor) {
        // All axios get,post and other http methods finally will call the request method,
        // in the request method, it build a promise chain contains all request and response interceptors
        // so after returned from the request method, the prcess has done and will execute the promise chain method
        // after all the code of the current event loop.
        // Removing the interceptor from the axios instance is exactly proper that will not cause other
        // concurrency request to add other interceptors.
        processor.after();
      }
      return result;
    };
  };
  return {
    get: (...restParams: Array<any>) => {
      return invokerWrapper(ajaxRequest.get)(restParams);
    },
    post: (...restParams: Array<any>) => {
      return invokerWrapper(ajaxRequest.post)(restParams);
    },
  };
}

/**
 * Partial Interceptor Context Manager
 * Support method-getContext to create an secure context to do some other thing
 */
export default class PartialInterceptorContextFactory {
  reqInterceptorMgr: any;
  resInterceptorMgr: any;
  partialInterceptorProcessorCreator: any;
  constructor(reqInterceptorMgr: any, resInterceptorMgr: any, partialInterceptorProcessorCreator: any) {
    this.reqInterceptorMgr = reqInterceptorMgr;
    this.resInterceptorMgr = resInterceptorMgr;
    this.partialInterceptorProcessorCreator = partialInterceptorProcessorCreator;
  }

  getContext(contextName: string, ajaxRequest: any) {
    const reqInterceptors = this.reqInterceptorMgr.getContextInterceptors(contextName);
    const resInterceptors = this.resInterceptorMgr.getContextInterceptors(contextName);
    return createPartialInterceptorContext(
      reqInterceptors,
      resInterceptors,
      ajaxRequest,
      this.partialInterceptorProcessorCreator,
    );
  }
}
