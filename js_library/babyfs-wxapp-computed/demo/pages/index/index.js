import babyfsPage from '../../miniprogram_dist/babyfsPage.js';

babyfsPage({
  data: {
    message: 'Hello world!',
    arr: [1, 'a', [5, 6, 7], {
      name: 'aaa'
    }],
    info: {
      id: 12,
      name: 'name_y',
      sex: 1,
      remark: {
        nick: 'nickName',
        avatar: 'https://nnn.ww.com',
        classList: ['one', 'two', 'three']
      }
    }
  },
  computed: {
    text1() {
      if (this.data.arr.length > 4) {
        return this.data.arr[2].toString() + this.data.arr[4];
      } else {
        return this.data.arr[3].name;
      }
    },
    text2() {
      if (this.data.text1.indexOf(',') > -1) {
        return (
          '有逗号' +
          this.data.info.name +
          ' | ' +
          this.data.info.remark.classList
        );
      } else {
        return '没有逗号' + this.data.text3;
      }
    },
    text3() {
      if (this.data.text1 === '没有逗号') {
        return this.data.text1;
      } else {
        return this.data.info.remark.nick;
      }
    }
  }
});
