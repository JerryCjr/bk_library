// index.js
// 获取应用实例
const app = getApp();

Page({
  data: {
    areaShow: '',
    initObj: {}
    // initObj: {
    //   areaCode: '110102' // 北京西城
    //   areaCode: '371121' // 山东省-日照市- 五莲县
    //   areaCode: '120104' // 天津市南开区
    // }
  },
  onReady() {
    this.picker = this.selectComponent('#picker-id');
  },
  onLoad: function () {
    console.log('onLoad-picker', this.picker);
    const _this = this;
    const t = setTimeout(() => {
      console.log('setTimeout');
      let a1 = 'initObj.areaCode';
      _this.setData({
        [a1] : '140421'
      });
      _this.picker.init();
      clearTimeout(t);
    }, 1000);
  },

  resolve(e) {
    console.log(e.detail);
    this.setData({
      areaShow: e.detail.areaShow
    })
  }
});
