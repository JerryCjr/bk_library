declare global {
  interface Window {
    __wxjs_environment: string;
  }
}

interface checkAgentInterface {
  _mAgent: mAgent;
  _mApp: mApp;
  _babyfsVersion: string;
  _babyfsDeviceId: string;
}

enum mAgent {
  other,
  ios,
  android,
  windows,
}

enum mApp {
  other,
  babyfs,
  weixin,
  qqbrowser,
  ucbrowser,
  hmbrowser,
  baidubrowser,
  safaribrowser,
  _360browser,
  operabrowser,
  chromebrowser,
  douyin,
  toutiao,
  weixinminiprogram,

  babyfsRainbow, // 彩虹
  babyfsLeo, // 狮子座
}

let _mAgent = mAgent.other;
let _mApp = mApp.other;
let _babyfsVersion = '';
let _babyfsDeviceId = '';

function checkAgent(): checkAgentInterface {
  function exist(str: string): boolean {
    return !!(_agent.indexOf(str) > -1);
  }

  const _agent = navigator.userAgent.toLowerCase();
  if (exist('android')) {
    _mAgent = mAgent.android;
  } else if (exist('iphone') || exist('ipod') || exist('ipad')) {
    _mAgent = mAgent.ios;
  } else if (exist('windows')) {
    _mAgent = mAgent.windows;
  }

  if (exist('micromessenger')) {
    _mApp = mApp.weixin;
    if (exist('miniprogram') || window.__wxjs_environment === 'miniprogram') {
      _mApp = mApp.weixinminiprogram;
    }
  } else if (exist('babyfs')) {
    // app 系列
    // 主App babyfs
    // 彩虹 babyfs-rainbow
    // 狮子 babyfs-leo

    let reg = /\bbabyfs\/([\d.]+)(\((\d+),[^)]+\))?/;
    if (exist('babyfs-rainbow')) {
      _mApp = mApp.babyfsRainbow;
    } else if (exist('babyfs-leo')) {
      _mApp = mApp.babyfsLeo;
      reg = /\bbabyfs-leo\/([\d.]+)(\((\d+),[^)]+\))?/;
    } else {
      _mApp = mApp.babyfs;
    }

    const group = _agent.match(reg); // 正则匹配宝玩客户端标识
    if (group && group.length) {
      if (group[1]) {
        _babyfsVersion = group[1];
      }

      if (group[2]) {
        const user_group = group[2].match(/\(([^)]*)\)/);
        if (user_group) {
          const _babyfsUserInfoArr = user_group[1].split(',');
          if (_babyfsUserInfoArr && _babyfsUserInfoArr.length > 1) {
            _babyfsDeviceId = _babyfsUserInfoArr[1];
          }
        }
      }
    }
  } else if (exist('mqqbrowser')) {
    _mApp = mApp.qqbrowser;
  } else if (exist('ucbrowser')) {
    _mApp = mApp.ucbrowser;
  } else if (exist('miuibrowser')) {
    if (exist('build/hm')) {
      _mApp = mApp.hmbrowser;
    }
  } else if (exist('baidubrowser')) {
    _mApp = mApp.baidubrowser;
  } else if (exist('safari')) {
    _mApp = mApp.safaribrowser;
  } else if (exist('opera')) {
    _mApp = mApp.operabrowser;
  } else if (exist('chrome')) {
    _mApp = mApp.chromebrowser;
  } else if (exist('360')) {
    _mApp = mApp._360browser;
  } else if (exist('aweme')) {
    _mApp = mApp.douyin;
  } else if (exist('newsarticle')) {
    _mApp = mApp.toutiao;
  }
  return {
    _mAgent,
    _mApp,
    _babyfsVersion,
    _babyfsDeviceId,
  };
}

export { mAgent as EnumAgent, mApp as EnumApp };
export default {
  EnumAgent: mAgent,
  EnumApp: mApp,
  get agent(): mAgent {
    return checkAgent()._mAgent;
  },
  get app(): mApp {
    return checkAgent()._mApp;
  },
  get babyfsVersion(): string {
    return checkAgent()._babyfsVersion;
  },
  get babyfsDeviceId(): string {
    return checkAgent()._babyfsDeviceId;
  },
};
