import { EnumAgent, EnumApp } from './runtime';
import runtime from './runtime';
import { EnumEnv, EnumBusiness, checkEnv, resolveHost } from './host';

interface Env {
  EnumEnv: typeof EnumEnv;
  EnumBusiness: typeof EnumBusiness;

  EnumAgent: typeof EnumAgent;
  EnumApp: typeof EnumApp;

  agent: EnumAgent;
  app: EnumApp;
  babyfsVersion: string;
  babyfsDeviceId: string;

  [prop: string]: any;
}

const exportObject: Env = {
  EnumEnv: EnumEnv,
  EnumBusiness: EnumBusiness,

  EnumAgent: EnumAgent,
  EnumApp: EnumApp,

  agent: runtime.agent,
  app: runtime.app,
  babyfsVersion: runtime.babyfsVersion,
  babyfsDeviceId: runtime.babyfsDeviceId,

  host: resolveHost,
  get currentEnv(): EnumEnv {
    return checkEnv();
  },
};
Object.keys(EnumBusiness).forEach((elem) => {
  Object.defineProperty(exportObject, elem, {
    get() {
      return resolveHost(EnumBusiness[elem as keyof typeof EnumBusiness]);
    },
    enumerable: true,
    configurable: true,
  });
});

export default exportObject;
