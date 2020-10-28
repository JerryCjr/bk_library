const appNameIds = {
  'wxa_pro': 'wx68fe0b8e2cab69fd',
  'wxa_fission': 'wx52aded02662a2b00',
  'wxa_light': 'wx611d41bed764ab6c',
  'wxa_punch': 'wxe0e427abe3107108',
  'wxa_primer': 'wx864ae00f1004181d',
  'wxa_manage': 'wx476345d8a57b9557',
  'wxa_sagittarius': 'wx9c4276aa6e07f1be',
  'ofa_babyclass_dev': 'wx9cd096ac00682f3c',
  'ofa_invite_dev': 'wx2d7078f106a01061',
  'ofa_babyclass_prod': 'wx57d7c046fc6a6786',
  'ofa_invite_prod': 'wx57d7c046fc6a6786'
}; // TODO: 公众号搞个中文名
const pushUrlPath = 'https://m.babyfs.cn/act/wx/receive_msg?_name=';
const apps = {
  'wx68fe0b8e2cab69fd': {
    pushUrl: `${pushUrlPath}wxa_pro`,
    token: '',
    encodingAesKey: ''
  },
  'wx52aded02662a2b00': {
    pushUrl: `${pushUrlPath}wxa_fission`,
    token: 'fission77845434',
    encodingAesKey: 'e1YoLN8zJWUZgx3uHtAKSj7QUYu97guDjcOVnHzp3yw'
  },
  'wx611d41bed764ab6c': {
    pushUrl: `${pushUrlPath}wxa_light`,
    token: '',
    encodingAesKey: ''
  },
  'wxe0e427abe3107108': {
    pushUrl: `${pushUrlPath}wxa_punch`,
    token: '',
    encodingAesKey: ''
  },
  'wx864ae00f1004181d': {
    pushUrl: `${pushUrlPath}wxa_primer`,
    token: 'primer454345',
    encodingAesKey: 'KV2CFBG0aLKXqIrUgUEEZaKlBeQVjBUc80ikHr4QRfA'
  },
  'wx476345d8a57b9557': {
    pushUrl: `${pushUrlPath}wxa_manage`,
    token: '',
    encodingAesKey: ''
  },
  'wx9c4276aa6e07f1be': {
    pushUrl: `${pushUrlPath}wxa_sagittarius`,
    token: 'sag77845434',
    encodingAesKey: 'KV2CFBG0aLKXqIrUgUEEZaKlBeQVjBUc80ikHr4QRfC'
  },
  'wx9cd096ac00682f3c': {
    pushUrl: 'http://exchange.babyfs.cn/act/wx/receive_msg?_name=library',
    token: 'sssss',
    encodingAesKey: 'UzeG6jE2S0wLyVkDsLXstl0ISHE5064avUejS1v5kAv'
  },
  'wx2d7078f106a01061': {
    pushUrl: '',
    token: '',
    encodingAesKey: ''
  },
  'wx57d7c046fc6a6786': {
    pushUrl: '',
    token: '',
    encodingAesKey: ''
  }
};
const ofaAppIds = Object.entries(appNameIds).filter(items => {
  if (items[0].startsWith('ofa_')) {
    return true;
  }
  else {
    return false;
  }
}).map(items => items[1]);
export default {
  appNameIds,
  apps,
  getConfig(appName) {
    let appId = appNameIds[appName];
    if (!appId) {
      throw new Error(`${appName} no appId!`);
    }
    let config = apps[appId];
    if (!config) {
      throw new Error(`${appName} no app config!`);
    }
    return config;
  },
  getAppNameById(appId) {
    let name = null;
    for (let key in appNameIds) {
      if (appNameIds[key] === appId) {
        name = key;
        break;
      }
    }
    if (!name) {
      throw new Error(`${appId} no appName!`);
    }
    return name;
  },
  isWxa(appId) {
    let appName = this.getAppNameById(appId);
    return appName.startsWith('wxa_');
  },
  ofaAppIds
};
