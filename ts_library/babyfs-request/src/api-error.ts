export class ApiError extends Error {
  code: number;
  constructor(code = 0, message = '') {
    super(message);
    this.code = code;
    this.name = this.constructor.name;
  }

  static createBuiltInApiError(status: number) {
    let message = '';
    switch (status) {
      case 400:
        message = '错误的请求';
        break;
      case 401:
        message = '未授权，请登录';
        break;
      case 403:
        message = '服务器拒绝访问';
        break;
      case 404:
        message = '服务器未找到资源';
        break;
      case 408:
        message = '请求超时';
        break;
      case 500:
        message = '服务器内部错误';
        break;
      case 502:
        message = '网关错误';
        break;
      case 503:
        message = '服务不可用';
        break;
      case 504:
        message = '网关超时';
        break;
      default:
        message = '抱歉出错了';
        break;
    }
    return new ApiError(status, message);
  }
}
