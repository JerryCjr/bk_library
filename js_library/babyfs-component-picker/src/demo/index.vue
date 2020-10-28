<template>
  <div>
    <div class="select-label" @click="clickEventAddress()">{{addressShow}}</div>
    <div class="select-label" @click="clickEventNormal()">{{resonShow}}</div>
    <!-- <babyfs-picker ref="babyfsPickerAddress" :config="reginConfig" mode="region" row="7" theme="#f00095" :initial='addressInitial' @handle="addresshandle"></babyfs-picker> -->
    <babyfs-picker ref="babyfsPickerAddress" :config="regionConfig" mode="region" row="7" :initial='addressInitial' @handle="addresshandle"></babyfs-picker>
    <babyfs-picker ref="babyfsPickerNormal" row="5" theme="red" :config='myConfig' :initial='myInitial' @handle="handle"></babyfs-picker>
  </div>
</template>

<script>
export default {
  name: 'demo',
  data() {
    return {
      addressShow:'请选择省/市/区',
      resonShow:'请选择退款原因',
      // addressInitial: {
      //   area: '河东区',
      //   areaCode: '120102',
      //   city: '天津市',
      //   cityCode: '120100',
      //   province: '天津市',
      //   provinceCode: '120000',
      // },
      regionConfig: {
        title: '配送地址'
      },
      addressInitial: {
        areaCode: '810119'
      },
      myConfig: {
        title: '退款原因',
        list: [{
          label: '123',
          id: 0
        }, {
          label: '1234',
          id: 1
        }, {
          label: '12345',
          id: 2
        }],
      },
      myInitial: {
        id: 0,
        label:'123'
      },
    };
  },
  methods: {
    clickEventAddress() {
      this.$refs.babyfsPickerAddress.showPick();
    },
    clickEventNormal() {
      this.$refs.babyfsPickerNormal.showPick();
    },
    addresshandle(obj) {
      // console.log(obj);
      this.addressInitial = {
          area: obj.area,
          areaCode: obj.areaCode,
          city: obj.city,
          cityCode: obj.cityCode,
          province: obj.province,
          provinceCode: obj.provinceCode,
      };
      this.addressShow = obj.cityCode === obj.provinceCode ? `${obj.province}-${obj.area}` : `${obj.province}-${obj.city}-${obj.area}`;
    },
    handle(obj) {
      // console.log(obj);
      this.myInitial.id = obj.id;
      this.resonShow  = obj.label;
    },
  },
  mounted() {
    this.resonShow = this.myInitial.label;
  }
};
</script>

<style>
.select-label{
  border-bottom: 1px solid #ccc;
  padding: 10px 20px;
}
</style>
