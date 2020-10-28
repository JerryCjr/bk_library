// components/componentPicker/componentPicker.js
// let staticObj = {};
let envHost = 'https://wapi.babyfs.cn';
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的属性列表
   */
  properties: {
    initial: {
      type: Object,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    multiArray: [],
    multiIndex: [0, 0, 0],
    areaObj: {},
    staticObj: {}
  },

  /**
   * @description 组件创建生命周期函数
   * @author MuNaipeng
   */
  ready() {
    try {
      let value = wx.getStorageSync('babyfs_env_key');
      if (value) {
        envHost = value === 'online' ? 'https://wapi.babyfs.cn' : 'http://wapi.lpt.babyfs.cn';
      }
    } catch (e) {
      console.log(e);
    }
    // this.init();
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * @description 取消事件
     * @author MuNaipeng
     */
    cancelEvent() {
      console.log('cancel');
      console.log(this.data.multiArray);
      console.log(this.data.staticObj);
      console.log(this.data.staticObj.multiIndex);
      // 还原原始数组
      this.setData({
        multiArray: this.data.staticObj.multiArray.concat(),
        multiIndex: this.data.staticObj.multiIndex.concat()
      });
    },
    // 获取父级元素
    getAllParentAreasByCode() {
      const _this = this;
      return new Promise((resolve, reject) => {
        wx.request({
          url: `${envHost}/api/basic/area/getAllParentAreasByCode`,
          data: {
            areacode: this.properties.initial.areaCode
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          method: 'GET',
          success: function (res) {
            console.log('res-getAllParentAreasByCode', res);
            const r = res.data.data;
            _this.triggerEvent('resolve', {
              provinceCode: r.c,
              province: r.n,
              cityCode: r.ns[0].c,
              city: r.ns[0].n,
              areaCode: r.ns[0].ns ? r.ns[0].ns[0].c : r.ns[0].c,
              area: r.ns[0].ns ? r.ns[0].ns[0].n : r.ns[0].n,
              areaShow: r.ns[0].ns ? `${r.n}-${r.ns[0].n}-${r.ns[0].ns[0].n}` : `${r.n}-${r.ns[0].n}`
            });
            resolve(r);
          },
          fail: function (err) { reject(err); }
        });
      });
    },

    /**
     * @description 数据初始化
     * @author MuNaipeng
     */
    init() {
      console.log('init');
      const _this = this;
      let initial = this.properties.initial;
      this.getRegion().then(res => {
        console.log(res);
        let pArray = `multiArray[0]`;
        let cArray = `multiArray[1]`;
        let aArray = `multiArray[2]`;
        let pIndex = `multiIndex[0]`;
        let cIndex = `multiIndex[1]`;
        let aIndex = `multiIndex[2]`;
        if (initial && initial.areaCode) {
          this.getAllParentAreasByCode().then(r => {
            console.log('rrrr', r);
            _this.setData({ [pArray]: res });
            res.forEach((element, index) => {
              if (element.c === r.c) {
                _this.setData({
                  [pIndex]: index,
                  [cArray]: element.ns
                });
                element.ns.forEach((ele, ind) => {
                  if (ele.c === r.ns[0].c) {
                    _this.setData({
                      [cIndex]: ind
                    });
                    if (!r.ns[0].ns) { // 直辖市类
                      _this.setData({
                        [aArray]: []
                      });
                    } else { // 非直辖市类
                      _this.setData({
                        [aArray]: ele.ns
                      });
                      ele.ns.forEach((el, idx) => {
                        if (el.c === r.ns[0].ns[0].c) {
                          _this.setData({
                            [aIndex]: idx
                          });
                        }
                      });
                    }
                  }
                });
              }
            });
            // 记录状态
            this.setData({
              staticObj: {
                multiIndex: this.data.multiIndex.concat(),
                multiArray: this.data.multiArray.concat()
              }
            });
          }).catch(() => {
            wx.showToast({
              title: '地址查询失败，请稍后重试',
              icon: 'none',
              duration: 2000
            });
          });
        } else {
          _this.setData({
            multiArray: [
              res,
              res[0].ns,
              []
            ],
            multiIndex: [0, 0, 0]
          });
          // 记录状态
          this.setData({
            staticObj: {
              multiIndex: this.data.multiIndex.concat(),
              multiArray: this.data.multiArray.concat()
            }
          });
          _this.triggerEvent('handle', {
            areaShow: '请选择省-市-区'
          });
        }
      }).catch(() => {
        wx.showToast({
          title: '获取地址数据出错，请稍后重试',
          icon: 'none',
          duration: 2000
        });
      });
    },

    /**
     * @description 确定
     * @author MuNaipeng
     * @param {*} e
     */
    bindMultiPickerChange(e) {
      console.log(e);
      console.log('picker发送选择改变，携带值为', e.detail.value);
      console.log(this.data.multiArray);
      this.setData({
        staticObj: {
          multiIndex: e.detail.value.concat(),
          multiArray: this.data.multiArray.concat()
        }
      });
      let value = e.detail.value;
      if (this.data.multiArray[1].length > 0) {
        this.data.multiArray[2].length > 0 ? this.setData({
          areaObj: {
            province: this.data.multiArray[0][value[0]].n,
            provinceCode: this.data.multiArray[0][value[0]].c,
            city: this.data.multiArray[1][value[1]].n,
            cityCode: this.data.multiArray[1][value[1]].c,
            area: this.data.multiArray[2][value[2]].n,
            areaCode: this.data.multiArray[2][value[2]].c,
            areaShow: `${this.data.multiArray[0][value[0]].n}-${this.data.multiArray[1][value[1]].n}-${this.data.multiArray[2][value[2]].n}`
          }

        }) : this.setData({
          areaObj: {
            province: this.data.multiArray[0][value[0]].n,
            provinceCode: this.data.multiArray[0][value[0]].c,
            city: this.data.multiArray[1][value[1]].n,
            cityCode: this.data.multiArray[1][value[1]].c,
            area: this.data.multiArray[1][value[1]].n,
            areaCode: this.data.multiArray[1][value[1]].c,
            areaShow: `${this.data.multiArray[0][value[0]].n}-${this.data.multiArray[1][value[1]].n}`
          }

        });
      } else {
        this.setData({
          areaObj: {
            province: this.data.multiArray[0][value[0]].n,
            provinceCode: this.data.multiArray[0][value[0]].c,
            city: this.data.multiArray[0][value[0]].n,
            cityCode: this.data.multiArray[0][value[0]].c,
            area: this.data.multiArray[0][value[0]].n,
            areaCode: this.data.multiArray[0][value[0]].c,
            areaShow: `${this.data.multiArray[0][value[0]].n}`
          }

        });
      };
      this.triggerEvent('resolve', this.data.areaObj);
    },

    /**
     * @description 监控改变
     * @author MuNaipeng
     * @param {*} e
     */
    bindMultiPickerColumnChange(e) {
      console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
      let column = e.detail.column;
      let value = e.detail.value;
      console.log('column, value');
      console.log(column);
      console.log(value);
      let newIndexArr = this.data.multiIndex;
      newIndexArr[column] = value;
      // 存储原始数组
      this.setData({
        multiIndex: newIndexArr,
        staticMultiArray: this.data.multiArray
      });
      let aimRegion = this.data.multiArray[column][value];
      let pRegion = this.data.multiArray[0][value];
      // let cRegion = pRegion.ns ? pRegion.ns[0] : [];
      let cArray = `multiArray[1]`;
      let aArray = `multiArray[2]`;

      if (column === 0) {
        console.log(pRegion);
        console.log(this.data.multiIndex);
        if (pRegion.ns && pRegion.ns.length > 0) { // 除去个别json港澳台
          if (pRegion.ns[this.data.multiIndex[1]].ns && pRegion.ns[this.data.multiIndex[1]].ns.length > 0) {
            console.log('非直辖市类');
            this.setData({
              [cArray]: pRegion.ns,
              [aArray]: pRegion.ns[this.data.multiIndex[1]].ns
            });
            console.log(this.data.multiIndex);
          } else {
            console.log('直辖市类');
            this.setData({
              [cArray]: pRegion.ns,
              [aArray]: []
            });
            console.log(this.data.multiIndex);
          }
        } else { // 个别json港澳台一级
          console.log('港澳台');
          this.setData({
            [cArray]: [],
            [aArray]: []
          });
          console.log(this.data.multiIndex);
        }
      }
      if (column === 1) {
        if (aimRegion.ns && aimRegion.ns.length > 0) { // 非直辖市
          let multiColumnArray = `multiArray[2]`;
          this.setData({
            [multiColumnArray]: aimRegion.ns
            // [aIndex]: 0,
          });
          console.log(this.data.multiIndex);
        } else { // 直辖市
          console.log(this.data.multiIndex);
          this.setData({
            [aArray]: []
          });
        }
      }
    },

    /**
     * @description 获取json
     * @author MuNaipeng
     * @returns
     */
    getRegion() {
      const _this = this;
      return new Promise((resolve, reject) => {
        if (_this.properties.region) wx.removeStorageSync('component-origin-area');
        const t = setTimeout(() => {
          let originData = wx.getStorageSync('component-origin-area');
          console.log(originData);
          if (originData) {
            resolve(originData);
          } else {
            wx.request({
              // url: _this.properties.region || 'https://s0.babyfs.cn/op/f/1/5b72d033a6b44ddc8e8042d3a11ab191/allArea.json',
              url: `${envHost}/api/basic/area/getAllAreas`,
              header: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              method: 'GET',
              success: function (res) {
                console.log('res', res);
                resolve(res.data.data);
                wx.setStorageSync('component-origin-area', res.data.data);
              },
              fail: function (err) { reject(err); }
            });
          }
          clearTimeout(t);
        });
      });
    }
  }

});
