import $ from 'babyfs-wxapp-type';
const envKey = 'babyfs_env_key';
const allEnvs = [
  'online',
  'dev',
  'test',
  'bvt',
  'lpt'
];

function currentEnv() {
  try {
    var value = wx.getStorageSync(envKey);
    if (value) {
      return value;
    } else {
      return 'online';
    }
  } catch (e) {
    return 'online';
  }
}

function getData(key) {
  try {
    var value = wx.getStorageSync(keyHandler(key));
    if (value) {
      return value;
    } else {
      return null;
    }
  } catch (e) {
    return null;
  }
}

function setData(key, value) {
  try {
    if ($.getType(key) === $.EnumType['bObject']) { // 支持传入对象
      for (const item in key) {
        if (key.hasOwnProperty(item)) {
          wx.setStorageSync(keyHandler(item), key[item]);
        }
      }
    } else {
      wx.setStorageSync(keyHandler(key), value);
    }
  } catch (e) {}
}

function remove(key, allEnv = false) {
  try {
    if (allEnv) {
      allEnvs.forEach(elem => {
        wx.removeStorageSync(`wxa_${elem}_${key}`);
      });
    } else {
      wx.removeStorageSync(keyHandler(key));
    }
  } catch (e) {}
}

function clear() {
  try {
    wx.clearStorageSync();
  } catch (e) {}
}

function keyHandler(key) {
  if (key === envKey) {
    return key;
  } else {
    return `wxa_${currentEnv()}_${key}`;
  }
}

export default {
  getData,
  setData,
  remove,
  clear
};
