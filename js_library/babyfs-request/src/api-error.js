export default class ApiError extends Error {
  constructor(code = 0, message = '') {
    super(message);
    this.code = code;
    this.name = this.constructor.name;
  }

  static error400() {
    return new ApiError(400, '错误的请求');
  }
  static error401() {
    return new ApiError(401, '未授权，请登录');
  }
  static error403() {
    return new ApiError(403, '服务器拒绝访问');
  }
  static error404() {
    return new ApiError(404, '服务器未找到资源');
  }
  static error408() {
    return new ApiError(408, '请求超时');
  }
  static error500() {
    return new ApiError(500, '服务器内部错误');
  }
  static error502() {
    return new ApiError(502, '网关错误');
  }
  static error503() {
    return new ApiError(503, '服务不可用');
  }
  static error504() {
    return new ApiError(504, '网关超时');
  }

  static createBuiltInApiError(status) {
    const methodName = `error${status}`;
    if (ApiError[methodName]) {
      return ApiError[methodName]();
    } else {
      return new ApiError(status, '抱歉出错了');
    }
  }
}
