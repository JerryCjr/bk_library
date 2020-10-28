import ajaxRequest from 'babyfs-request';

const requestHanlder = config => {
  // X-Static-Params，App接口统一头，格式:version=1.0&sys_version=9.0&device=iphone5&deviceId=xxx&platform=[1:iOS,2:Android,6:web]
  let deviceId = localStorage.getItem('web_deviceId') ? localStorage.getItem('web_deviceId') : 0;
  let platform = 6; // 6表示web
  let device = 'web';
  config['headers']['X-Static-Params'] = `version=1.0&sys_version=1.0&device=${device}&deviceId=${deviceId}&platform=${platform}`;
  return config;
};

let ajax = ajaxRequest.createInstance();
ajax.registerRequestInterceptor(requestHanlder, null);

export default ajax;
