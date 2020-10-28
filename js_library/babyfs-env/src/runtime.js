
/**
 * 标识当前UserAgent的字典变量
 * @type {Object}
 */
let mAgent = {
	other: 0,
	ios: 1,
	android: 2,
	windows: 3
};
/**
 * 标识承载当前页面的UserAgent的APP种别
 * @type {Object}
 */
let mApp = {
	other: 0,
	babyfs: 1,
	weixin: 2,
	qqbrowser: 3,
	ucbrowser: 4,
	hmbrowser: 5,
	baidubrowser: 6,
	safaribrowser: 7,
	_360browser: 8,
	operabrowser: 9,
  chromebrowser: 10,
  douyin: 11,
  toutiao: 12,
  weixinminiprogram: 13
};

let hasCheckAgent = false;
let _mAgent = mAgent.other;
let _mApp = mApp.other;
let _babyfsVersion = -1; // 成长兔英语客户端版本
let _babyfsDeviceId = -1; // 成长兔英语deviceId
function checkAgent() {
	if (!hasCheckAgent) {
		let _agent = navigator.userAgent.toLowerCase();
		if (_agent.indexOf('android') > -1) {
			_mAgent = mAgent.android;
		}
		else if (_agent.indexOf('iphone') > -1 || _agent.indexOf('ipod') > -1 || _agent.indexOf('ipad') > -1) {
			_mAgent = mAgent.ios;
		}
		else if (_agent.indexOf('windows') > -1) {
			_mAgent = mAgent.windows;
    }

		if (_agent.indexOf('micromessenger') > -1) {
      _mApp = mApp.weixin;
      if (_agent.indexOf('miniprogram') > -1 || window.__wxjs_environment === 'miniprogram') {
        _mApp = mApp.weixinminiprogram;
      }
    }
    else if (_agent.indexOf('babyfs') > -1) {
      _mApp = mApp.babyfs;
      const BABYFS = /\bbabyfs\/([\d.]+)(\((\d+),[^)]+\))?/;
      const GROUP = _agent.match(BABYFS); // 正则匹配宝玩客户端标识
      if (GROUP && GROUP[1]) _babyfsVersion = Number(GROUP[1]);
      if (GROUP && GROUP[2]) {
        let _babyfsUserInfoArr = GROUP[2].match(/\(([^)]*)\)/)[1].split(',');
        _babyfsUserInfoArr.length > 1 ? _babyfsDeviceId = _babyfsUserInfoArr[1] : '';
      }
    }
		else if (_agent.indexOf('mqqbrowser') > -1) {
			_mApp = mApp.qqbrowser;
		}
		else if (_agent.indexOf('ucbrowser') > -1) {
			_mApp = mApp.ucbrowser;
		}
		else if (_agent.indexOf('miuibrowser') > -1) {
			if (_agent.indexOf('build/hm') > -1) {
				_mApp = mApp.hmbrowser;
			}
		}
		else if (_agent.indexOf('baidubrowser') > -1) {
			_mApp = mApp.baidubrowser;
		}
		else if (_agent.indexOf('safari') > -1) {
			_mApp = mApp.safaribrowser;
		}
		else if (_agent.indexOf('opera') > -1) {
			_mApp = mApp.operabrowser;
		}
		else if (_agent.indexOf('chrome') > -1) {
			_mApp = mApp.chromebrowser;
		}
		else if (_agent.indexOf('360') > -1) {
			_mApp = mApp._360browser;
		}
		else if (_agent.indexOf('aweme') > -1) {
			_mApp = mApp.douyin;
		}
		else if (_agent.indexOf('newsarticle') > -1) {
			_mApp = mApp.toutiao;
		}
	}
	return { _mAgent, _mApp, _babyfsVersion ,_babyfsDeviceId};
}

export default {
  EnumAgent: mAgent,
  EnumApp: mApp,
  get agent() {
    return checkAgent()._mAgent;
  },
  get app() {
    return checkAgent()._mApp;
  },
  get babyfsVersion() {
    return checkAgent()._babyfsVersion;
  },
  get babyfsDeviceId() {
    return checkAgent()._babyfsDeviceId;
  }
};
