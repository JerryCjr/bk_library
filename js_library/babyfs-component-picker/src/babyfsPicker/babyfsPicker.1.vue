<template>
  <div class="babyfs-picker">
    <transition name="fade">
      <div class="babyfs-mask" v-if="pickerIf" @click="closeEvent"></div>
    </transition>
    <transition name="slide-top">
      <!-- 地址picker -->
      <div class="babyfs-picker-box" @click.stop v-if="pickerIf && mode === 'region'">
        <div class="picker-box-title">{{title}}</div>
        <div class="picker-box-show">
          <div class="box-show box-show-l" :style="provinceCode === '' ? 'color:' +  chooseColor :''" @click="addressTabEvent('provinceIf')">
            <span class="box-show-span">{{province}}
              <i class="choosed-color-line" :style="'background:' +  chooseColor" v-if="provinceIf"></i>
            </span>
          </div>
          <div class="box-show box-show-c" :style="cityCode === '' ? 'color:' +  chooseColor :''" @click="addressTabEvent('cityIf')" v-if="provinceCode">
            <span class="box-show-span">{{city}}
              <i class="choosed-color-line" :style="'background:' +  chooseColor" v-if="cityIf"></i>
            </span>
          </div>
          <div class="box-show box-show-r" :style="areaCode === '' ? 'color:' +  chooseColor :''" @click="addressTabEvent('areaIf')" v-if="!isDirect && provinceCode && cityCode">
            <span class="box-show-span">{{area}}
              <i class="choosed-color-line" :style="'background:' +  chooseColor" v-if="areaIf"></i>
            </span>
          </div>
        </div>
        <div class="contain-line-div">
          <div class="contain-line"></div>
        </div>
        <!-- contain -->
        <div class="picker-box-contain" :style="'height:'+ pickHeight">
          <div class="box-contain-ul" ref="provinceRef" v-if="provinceIf">
            <div class="box-contain-li" v-for="(item,index) in provinceData" :key="item.c" @click="provinceClickEvent(item,index)">
              <span class="box-li-span" :style="provinceCode === item.c ? 'color:' +  chooseColor :''">{{item.n}}</span>
              <span class="box-li-span-after" :style="'border-color:' +  chooseColor" v-if="provinceCode === item.c"></span>
            </div>
          </div>
          <div class="box-contain-ul" ref="cityRef" v-if="cityIf">
            <div class="box-contain-li" v-for="(item,index) in cityData" :key="item.c" @click="cityClickEvent(item,index)">
              <span class="box-li-span" :style="cityCode === item.c ? 'color:' +  chooseColor :''">{{item.n}}</span>
              <span class="box-li-span-after" :style="'border-color:' +  chooseColor" v-if="cityCode === item.c"></span>
            </div>
          </div>
          <div class="box-contain-ul" ref="areaRef" v-if="areaIf">
            <div class="box-contain-li" v-for="item in areaData" :key="item.c" @click="areaClickEvent(item)">
              <span class="box-li-span" :style="areaCode === item.c ? 'color:' +  chooseColor :''">{{item.n}}</span>
              <span class="box-li-span-after" :style="'border-color:' +  chooseColor" v-if="areaCode === item.c"></span>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <transition name="slide-top">
      <!-- 普通picker -->
      <div class="picker-normal" @click.stop v-if="pickerIf && mode !== 'region'">
        <div class="normal-box-title">{{config.title}}</div>
        <div class="contain-line-div">
          <div class="contain-line"></div>
        </div>
        <div class="normal-box-contain" :style="'height:'+ pickHeight">
          <div class="normal-contain-ul">
            <div class="normal-contain-li" v-for="item in config.list" :key="item.id" @click="itemClickEvent(item)">
              <span class="box-li-span" :style="chooseId === item.id ? 'color:' +  chooseColor :''">{{item.label}}</span>
              <span class="box-li-span-after" :style="'border-color:' +  chooseColor" v-if="chooseId === item.id"></span>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
// "version": "0.1.10"
import axios from 'axios';
export default {
  name: 'babyfsPicker',
  props: ['config', 'initial', 'mode', 'regionJson', 'row', 'theme'],
  data() {
    return {
      pickerIf: false,
      // -----地址picker-----
      title: '',
      provinceData: [],
      cityData: [],
      areaData: [],

      provinceCode: '',
      province: '请选择',
      cityCode: '',
      city: '请选择',
      areaCode: '',
      area: '请选择',
      isDirect: false,

      provinceIf: true,
      cityIf: false,
      areaIf: false,

      provinceIndex: 0,
      cityIndex: 0,
      areaIndex: 0,

      ifArray: ['province', 'city', 'area'],
      pickHeight: '325px',
      chooseColor: 'green',

      // -----地址picker-----

      // -----普通picker-----
      label: '',
      chooseId: '',
      // -----普通picker-----
    };
  },
  destroyed(){
      document.querySelector('body').classList.remove('body-scroll');
  },
  methods: {
    /**
     * @description init 方法
     * @author MuNaipeng
     */
    init() {
      if (this.mode === 'region') {
        this.title = !!this.config && !!this.config.title ? this.config.title : '配送中';
        this.checkSession();
        let height = this.row && this.row > 0 && this.row <= 7 ? (this.row - 0) * 45 + 10 : 325;
        this.pickHeight = `${height}px`;
        this.chooseColor = this.theme ? this.theme : '#FF5E4C';
      } else {
        this.normalInitial();
        let height = this.row && this.row > 0 && this.row <= 7 ? (this.row - 0) * 45 + 10 : '';
        this.pickHeight = `${height}px`;
        this.chooseColor = this.theme ? this.theme : '#FF5E4C';
      }
    },

    /**
     * @description 主动关闭组件
     * @author MuNaipeng
     */
    closeEvent() {
      this.pickerIf = false;
      document.querySelector('body').classList.remove('body-scroll');
    },

    /**
     * @description 显示组件
     * @author MuNaipeng
     */
    showPick() {
      this.pickerIf = true;
      document.querySelector('body').classList.add('body-scroll');
      this.init();
    },

    /**
     * @description 关闭组件
     * @author MuNaipeng
     */
    hidePick() {
      this.pickerIf = false;
      document.querySelector('body').classList.remove('body-scroll');
      let obj = {};
      if (this.mode === 'region') {
        obj = {
          isDirect: this.isDirect,
          provinceCode: this.provinceCode,
          province: this.province,
          cityCode: this.isDirect ? this.provinceCode : this.cityCode,
          city: this.isDirect ? this.province : this.city,
          areaCode: this.isDirect ? this.cityCode : this.areaCode,
          area: this.isDirect ? this.city : this.area
        };
      } else {
        obj = {
          label: this.label,
          id: this.chooseId
        };
      }
      this.$emit('handle', obj);
    },

    /**
     * @description 获取地址json
     * @author MuNaipeng
     * @param {any} region 默认最全地址json,可配置
     * @returns 地址json
     * 组件版本地区json地址
     * https://s0.babyfs.cn/op/f/1/5b72d033a6b44ddc8e8042d3a11ab191/allArea.json
     * bug版本地区json地址
     * https://s0.babyfs.cn/op/f/1/address/area.min.new.json
     * 最新测试版本地区json地址
     * https://s0.babyfs.cn/op/f/1/area/area.min.json
     */
    getRegion(regionJson = 'https://s0.babyfs.cn/op/f/1/area/area.min.json') {
      return axios.get(regionJson);
    },

    /**
     * @description session判断
     * @author MuNaipeng
     */
    checkSession() {
      const _this = this;
      const areaData = sessionStorage.getItem('areaData');
      if (!areaData || areaData === 'undefined' || areaData === null) {
        _this.getRegion(_this.regionJson)
          .then(res => {
            _this.commonRegoin(res.data, false);
          }).catch(err => err);
      } else {
        _this.commonRegoin(JSON.parse(areaData), true);
      }
    },

    /**
     * @description 地址json公共处理方法
     * @author MuNaipeng
     * @param {any} data 传入的地址json数据
     * @param {Boolean} flag 判断地址json的获取途径[true：session获得;false：接口获得]
     */
    commonRegoin(data, flag) {
      if (!flag) {
        sessionStorage.setItem('areaData', JSON.stringify(data));
      }
      this.provinceData = data;
      if (!!this.initial && this.initial.provinceCode && this.initial.areaCode) {
        // ----------------
        if (this.initial.provinceCode === this.initial.cityCode || !this.initial.cityCode) { //直辖市类
          this.isDirect = true;
          this.cityCode = this.initial.areaCode;
          this.city = this.initial.area;
          this.areaCode = '';
          this.area = '';
        } else {
          this.isDirect = false;
          this.cityCode = this.initial.cityCode;
          this.city = this.initial.city;
          this.areaCode = this.initial.areaCode;
          this.area = this.initial.area;
        }
        this.provinceCode = this.initial.provinceCode;
        this.province = this.initial.province;

        // ----------------
        this.provinceData.forEach((el, index) => {
          if (this.initial.provinceCode === el.c) {
            this.provinceIndex = index;
            this.cityData = el.ns;
            el.ns.forEach((ele, ind) => {
              if (this.cityCode === ele.c) {
                this.cityIndex = ind;
                if (this.isDirect) { //直辖市类
                  this.areaData = [];
                  this.areaIndex = 0;
                } else { //非直辖市类
                  this.areaData = ele.ns;
                  ele.ns.forEach((elem, idx) => {
                    if (this.areaCode === elem.c) {
                      this.areaIndex = idx;
                    }
                  });
                }
              }
            });
          }
        });
        this.$nextTick(() => {
          this.topDealMethod(this.provinceIndex, 'provinceRef');
        });

      } else {
        // 不做回显
      }
      console.log(this.provinceIndex, this.cityIndex, this.areaIndex);
      this.provinceIf = true;
      this.cityIf = false;
      this.areaIf = false;
    },

    /**
     * @description province点击
     * @author MuNaipeng
     * @param {any} item 获取当前点击数据
     */
    provinceClickEvent(item, index) {
      this.provinceIndex = index; //标记位置

      this.provinceCode = item.c;
      this.province = item.n;
      this.cityCode = '';
      this.city = '请选择';
      this.areaCode = '';
      this.area = '请选择';

      this.cityData = item.ns;

      this.provinceIf = false;
      this.cityIf = true;
      this.areaIf = false;
    },

    /**
     * @description city点击
     * @author MuNaipeng
     * @param {any} item 获取当前点击数据
     */
    cityClickEvent(item, index) {
      this.cityCode = item.c;
      this.city = item.n;
      if (item.ns) {
        this.isDirect = false;
        this.areaCode = '';
        this.area = '请选择';

        this.areaData = item.ns;
        this.provinceIf = false;
        this.cityIf = false;
        this.areaIf = true;

        this.cityIndex = index; //标记位置
      } else {
        this.isDirect = true;
        this.areaCode = '';
        this.area = '';

        this.hidePick();
      }

    },

    /**
     * @description area点击
     * @author MuNaipeng
     * @param {any} item 获取当前点击数据
     */
    areaClickEvent(item) {
      this.areaCode = item.c;
      this.area = item.n;
      this.hidePick();
    },

    /**
     * @description tab点击
     * @author MuNaipeng
     * @param {any} item 获取当前点击数据
     */
    addressTabEvent(item) {
      this.ifArray.forEach(el => {
        if (item === `${el}If`) {
          this[`${el}If`] = true;
          this.topDealMethod(this[`${el}Index`], `${el}Ref`);
        } else {
          this[`${el}If`] = false;
        }
      });

    },

    /**
     * @description top值公共处理方法
     * @author MuNaipeng
     * @param {any} item 获取当前点击数据
     */
    topDealMethod(index = 0, ref = '') {
      let diffValue, topValue;
      if (!!this.row && this.row > 0 && this.row < 7) {
        diffValue = Math.ceil(this.row / 2);
      } else {
        diffValue = Math.ceil(7 / 2);
      }
      topValue = (index) * 45;
      console.log('topValue:', topValue);
      this.$nextTick(() => {
        this.$refs[ref].scrollTop = topValue;
      });
    },

    // ---------------------------普通picker方法---------------------------

    /**
     * @description 普通picker数据回显
     * @author MuNaipeng
     */
    normalInitial() {
      this.chooseId = this.initial.id;
    },

    /**
     * @description item点击
     * @author MuNaipeng
     * @param {any} item 获取当前点击数据
     */
    itemClickEvent(item) {
      this.label = item.label;
      this.chooseId = item.id;
      this.hidePick();
    },

  }
};
</script>
<style lang="less">
@import "./babyfsPicker.less";
</style>
