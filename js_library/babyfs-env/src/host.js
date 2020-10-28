/**
 * 目前环境分为4套，test对应11机器和12机器，dev对应14机器测试环境，bvt对应251docker环境，online对应线上；local是对应开发者本地开发机器环境
 * TODO: library.babyfs.cn域名
 */
import url from 'babyfs-url';

const env = {
  local: 0,
  dev: 1,
  test: 2,
  bvt: 3,
  online: 4,
  lpt: 5
};

const biz = {
  m: 0,
  op: 1,
  wapi: 2,
  m_mall: 3,
  op_mall: 4,
  wapi_api: 5,
  op_api: 6,
  op_mall_api: 7,
  s0: 8,
  s1: 9,
  i_s: 10,
  v_s: 11,
  ap_s: 12,
  m_act: 13,
  m_library: 14,
  wapi_act: 15,
};

const subDomains = {
  [biz.m]: 'm',
  [biz.op]: 'op',
  [biz.wapi]: 'wapi',
  [biz.m_mall]: 'mall',
  [biz.op_mall]: 'opmall',
  [biz.m_library]: 'library'
};

const localPorts = {
  [biz.m]: 8001,
  [biz.op]: 8002,
  [biz.wapi]: 8007,
  [biz.m_mall]: 8003,
  [biz.op_mall]: 8004,
  [biz.m_library]: 8006
};

function getOnlineRootDomain(rootDomain) {
  let ds = rootDomain.split('.');
  if (ds.length > 1) {
    return `${ds[ds.length - 2]}.${ds[ds.length - 1]}`;
  } else if (rootDomain === 'localhost') {
    return 'local';
  } else {
    throw new Error(`解析线上根域名失败，域名${rootDomain}格式不对`);
  }
}

/**
 * 根据当前根域名来判断环境。
 */
function checkEnv() {
  let rootDomain = url.rootDomain;
  let onlineRootDomain = getOnlineRootDomain(rootDomain);
  switch (rootDomain) {
    case `dev.${onlineRootDomain}`:
      return env.dev;
    case `test.${onlineRootDomain}`:
    case `exchange.${onlineRootDomain}`:
      return env.test;
    case `bvt.${onlineRootDomain}`:
      return env.bvt;
    case onlineRootDomain:
      return env.online;
    case `lpt.${onlineRootDomain}`:
      return env.lpt;
    default:
      return env.local;
  }
}

function schema() {
  switch (checkEnv()) {
    case env.online:
      return 'https://';
    default:
      return 'http://';
  }
}

function getDomain(business) {
  let subDomain = subDomains[business];
  let localPort = localPorts[business];
  if (subDomain && localPort) {
    switch (checkEnv()) {
      case env.local:
        return `localhost:${localPort}`;
      default:
        return `${subDomain}.${url.rootDomain}`;
    }
  }
}

function resolveHost(business) {
  let envValue = checkEnv();
  let isLocal = envValue === env.local;
  let isTest = envValue === env.test;
  if (isTest) {
    //Test环境比较特殊，这里临时写死，并且暂不支持新的根域名
    switch (business) {
      case biz.m:
        return 'http://emily.test.babyfs.cn/m';
      case biz.op:
        return 'http://emily.test.babyfs.cn';
      case biz.m_mall:
        return 'http://exchange.babyfs.cn/m_mall';
      case biz.op_mall:
        return 'http://opmall.dev.babyfs-inc.cn';
      case biz.wapi:
        return 'http://wapi.test.babyfs.cn';
      case biz.wapi_api:
        return 'http://wapi.test.babyfs.cn/api';
      case biz.wapi_act:
        return 'http://wapi.test.babyfs.cn/act';
      case biz.op_api:
        return '/op';
      case biz.op_mall_api:
        return '/op/retailer';
      case biz.s0:
        return 'https://s0.babyfs.cn';
      case biz.s1:
        return 'https://s1.babyfs.cn';
      case biz.i_s:
        return 'https://i.s.babyfs.cn';
      case biz.v_s:
        return 'https://v.s.babyfs.cn';
      case biz.ap_s:
        return 'https://ap.s.babyfs.cn';
      case biz.m_act:
        return '/act';
      case biz.m_library:
        return 'http://library.test.babyfs.cn';
    }
  }
  else {
    switch (business) {
      case biz.m:
      case biz.op:
      case biz.m_mall:
      case biz.op_mall:
      case biz.wapi:
        return `${schema()}${getDomain(business)}`;
      case biz.wapi_api:
        return isLocal ? '/api' : `${schema()}${getDomain(biz.wapi)}/api`;
      case biz.wapi_act:
        return isLocal ? '/act' : `${schema()}${getDomain(biz.wapi)}/act`;
      case biz.op_api:
        return isLocal ? '/op' : `${schema()}${getDomain(biz.op)}/op`;
      case biz.op_mall_api:
        return isLocal ? '/op/retailer' : `${schema()}${getDomain(biz.op_mall)}/op/retailer`;
      case biz.s0:
        return 'https://s0.babyfs.cn';
      case biz.s1:
        return 'https://s1.babyfs.cn';
      case biz.i_s:
        return 'https://i.s.babyfs.cn';
      case biz.v_s:
        return 'https://v.s.babyfs.cn';
      case biz.ap_s:
        return 'https://ap.s.babyfs.cn';
      case biz.m_act:
        return isLocal ? '/act' : `${schema()}${getDomain(biz.m)}/act`;
      case biz.m_library:
        return `${schema()}${getDomain(biz.m_library)}`;
    }
  }
}

export default {
  EnumEnv: env,
  EnumBusiness: biz,
  resolveHost,
  checkEnv
};
