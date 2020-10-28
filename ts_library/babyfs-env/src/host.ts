import { domain, isIP } from './domain';

// 目前环境分为4套
// test对应11机器和12机器
// dev对应14机器测试环境
// bvt对应251docker环境
// online对应线上
// local是对应开发者本地开发机器环境

// 开发环境枚举
// 理论上用字符串枚举更好, 之前旧版本用的是数字枚举, 为了兼容旧版本
enum env {
  local = 0, // 本机
  online = 4, // 线上
  lpt = 5,
  dev = 1,
  test = 2,
  bvt = 3,
}

// 业务枚举
enum biz {
  // 2c
  m = 'm', // 老m站
  m_mall = 'mall', // 商城
  m_act = 'm_act', // 增长活动类
  m_library = 'library', // 前端绘本馆

  // 2b
  op = 'op', // 老op站
  op_mall = 'opmall', // 商城op

  // 七牛CDN
  s0 = 's0', // s0
  s1 = 's1', // s1
  i_s = 'i_s', // 主要是图片 image
  v_s = 'v_s', // 主要是视频 video
  ap_s = 'ap_s', // 主要是音频 audio

  // api
  wapi = 'wapi', // wapi 是2c api相关
  wapi_api = 'wapi_api', // 主api
  wapi_act = 'wapi_act', // 增长类api

  op_api = 'op_api', // op_api 是2b api
  op_mall_api = 'op_retailer', // 商城op
}

// 业务域名关键字
enum subDomains {
  m = biz.m,
  op = biz.op,
  mall = biz.m_mall,
  opmall = biz.op_mall,
  //
  wapi = biz.wapi,
  wapi_api = biz.wapi,
  wapi_act = biz.wapi,
  //
  op_api = biz.op,
  op_retailer = biz.op,
  //
  m_act = biz.m,
  library = biz.m_library,
  // library = biz.m_library,
}

// 本地端口号(对应各个项目webpack-dev-server的端口号)
enum localPorts {
  m = 8001,
  op = 8002,
  wapi = 8007,
  mall = 8003,
  opmall = 8004,
  library = 8006,
}

function checkEnv(hostname = location.hostname): env {
  const { tld, sld, thld } = { ...domain(hostname) };

  if (tld === 'localhost' || isIP(tld)) {
    return env.local;
  }

  if (!sld) {
    // console.log('无法检测当前环境,二级域名不存在,默认使用线上环境');
    return env.online;
  }

  if (sld !== 'babyfs') {
    // console.log('无法检测当前环境,不是宝玩的业务域名');
    return env.online;
  }

  if (!thld) {
    // console.log('无法检测当前环境,三级域名不存在,默认为线上环境');
    return env.online;
  }

  switch (thld) {
    case 'dev':
      return env.dev;
    case 'test':
    case 'exchange':
      return env.test;
    case 'bvt':
      return env.bvt;
    case 'lpt':
      return env.lpt;
    default:
      return env.online;
  }
}

function resolveHost(business: biz, envValue = checkEnv()): string {
  const isTest = envValue === env.test;

  // 七牛的几个域名不论什么环境都是不变的
  switch (business) {
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
  }

  switch (business) {
    case biz.m:
      return isTest ? 'http://emily.test.babyfs.cn/m' : `${_path()}`;
    case biz.op:
      return isTest ? 'http://emily.test.babyfs.cn' : `${_path()}`;
    case biz.m_mall:
      return isTest ? 'http://exchange.babyfs.cn/m_mall' : `${_path()}`;
    case biz.op_mall:
    // version 1.1.4 op_mall 在 test 下的域名为 opmall.dev.babyfs-inc.cn
    // version 1.1.4 以后不支持该域名
    // 域名链接应该符合规范 二级域名应均为babyfs
    case biz.wapi:
    case biz.m_library:
      return `${_path()}`;
    case biz.wapi_api:
      return `${_path()}/api`;
    case biz.wapi_act:
      return `${_path()}/act`;
    case biz.op_api:
      return `${_path()}/op`;
    case biz.op_mall_api:
      return `${_path()}/op/retailer`;
    case biz.m_act:
      return `${_path()}/act`;
    default:
      return '';
  }

  function _path() {
    // todo not graceful
    if (
      business === biz.s0 ||
      business === biz.s1 ||
      business === biz.i_s ||
      business === biz.v_s ||
      business === biz.ap_s
    )
      return;
    function _host() {
      if (
        business === biz.s0 ||
        business === biz.s1 ||
        business === biz.i_s ||
        business === biz.v_s ||
        business === biz.ap_s
      )
        return;
      return subDomains[business];
    }
    switch (envValue) {
      // 线上域名没有环境变量标识
      case env.online:
        return `https://${_host()}.babyfs.cn`;
      // * local 环境下
      // * 默认返回的路径是localhost: xxxx 带端口形式的
      // * wapi_api,wapi_act,op_api 这种api路径返回的是相对路径
      case env.local:
        switch (business) {
          case biz.wapi_api:
          case biz.wapi_act:
          case biz.op_api:
          case biz.op_mall_api:
          case biz.m_act:
            return '';
          default:
            return `http://localhost:${localPorts[business]}`;
        }
      default:
        return `http://${_host()}.${env[envValue]}.babyfs.cn`;
    }
  }
}

export { env as EnumEnv, biz as EnumBusiness, checkEnv, resolveHost };
export default {
  EnumEnv: env,
  EnumBusiness: biz,
  checkEnv,
  resolveHost,
};
