const sys = wx.getSystemInfoSync();

const TYPES = {
  GET_SYSTEMINFO: 'GET_SYSTEMINFO',
  GET_SYSTEMINFO_LOWERRATIO: 'GET_SYSTEMINFO_LOWERRATIO'
};

const state = {
  systemInfo: sys,
  lowerRatio: sys.windowHeight / sys.windowWidth <= 1.35 // Boolean 判断高宽比是否小于指定值
};

const getters = {
  [TYPES.GET_SYSTEMINFO](state) {
    return state['systemInfo'];
  },
  [TYPES.GET_SYSTEMINFO_LOWERRATIO](state) {
    return state['lowerRatio'];
  }
};

const mutations = {

};

export default {
  state,
  getters,
  mutations
};
