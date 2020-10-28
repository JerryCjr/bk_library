import store from 'babyfs-wxapp-storage';

let currentEnv = 'online';
const envHosts = {
  online: 'https://m.babyfs.cn',
  dev: 'http://m.dev.babyfs.cn',
  bvt: 'http://m.bvt.babyfs.cn',
  test: 'http://emily.test.babyfs.cn',
  lpt: 'http://m.lpt.babyfs.cn'
};
const envMallHosts = {
  online: 'https://mall.babyfs.cn',
  dev: 'http://mall.dev.babyfs.cn',
  bvt: 'http://mall.bvt.babyfs.cn',
  test: 'http://exchange.babyfs.cn',
  lpt: 'http://mall.lpt.babyfs.cn'
};
const envApi = {
  online: 'https://wapi.babyfs.cn',
  dev: 'http://wapi.dev.babyfs.cn',
  bvt: 'http://wapi.bvt.babyfs.cn',
  test: 'http://wapi.test.babyfs.cn',
  lpt: 'http://wapi.lpt.babyfs.cn'
};
const envs = Object.keys(envHosts);
const envKey = 'babyfs_env_key';

function init(options) {
  if (options.query.env) {
    let env = options.query.env.toLowerCase();
    // 先清除本地缓存
    let currEnv = store.getData(envKey) || '';
    if (currEnv !== env) clearStorage();
    switch (env) {
      case 'dev':
      case 'test':
      case 'bvt':
      case 'lpt':
        store.setData(envKey, env);
        break;
      default:
        store.setData(envKey, 'online');
        break;
    }
  }

  // 获取缓存的上一次的环境域名
  let lastEnv = store.getData(envKey);
  console.log(`last env: ${lastEnv}`);
  if (lastEnv) {
    currentEnv = lastEnv;
  }
}

function switchEnv(complete) {
  wx.showActionSheet({
    itemList: envs.map(elem => {
      if (elem === currentEnv) {
        return `${elem} (current)`;
      } else {
        return elem;
      }
    }),
    success(res) {
      currentEnv = envs[res.tapIndex];
      console.log(`select env: ${currentEnv}`);
      // 先清除本地缓存
      clearStorage();
      // 缓存这次选择的环境
      store.setData(envKey, currentEnv);

      wx.showModal({
        title: '提示',
        content: '请打开调试模式并重启小程序以加载新的环境。android可以直接杀掉小程序进程，ios可以直接杀掉微信进程。',
        showCancel: false
      });
    },
    fail(res) {
      wx.showModal({
        title: '提示',
        content: res.errMsg,
        showCancel: false
      });
    },
    complete
  });
}

function clearStorage() {
  store.remove('token', true);
  store.remove('uid', true);
  store.remove('session_id', true);
  store.remove(envKey);
}

export default {
  get currentEnv() {
    return currentEnv;
  },
  get host() {
    return envHosts[currentEnv];
  },
  get mallHost() {
    return envMallHosts[currentEnv];
  },
  get api() {
    return envApi[currentEnv];
  },
  init,
  switchEnv
};
