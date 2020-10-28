/**
* 主模块文件
*/
import 'babel-polyfill';
import runtime from './runtime';
import host from './host';

let exportObject = {
  EnumAgent: runtime.EnumAgent,
  EnumApp: runtime.EnumApp,
  EnumEnv: host.EnumEnv,
  EnumBusiness: host.EnumBusiness,
  agent: runtime.agent,
  app: runtime.app,
  babyfsVersion: runtime.babyfsVersion,
  babyfsDeviceId: runtime.babyfsDeviceId,
  host: host.resolveHost,
  get currentEnv() {
    return host.checkEnv();
  }
};

Object.keys(host.EnumBusiness).forEach(elem => {
  Object.defineProperty(exportObject, elem, {
    get() {
      return host.resolveHost(host.EnumBusiness[elem]);
    },
    enumerable: true,
    configurable: true
  });
});

export default exportObject;
