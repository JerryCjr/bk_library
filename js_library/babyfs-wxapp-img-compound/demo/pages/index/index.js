import wapi from 'babyfs-wxapp-api';
import {
  UTYPE,
  compound
} from '../../miniprogram_dist/index.js';

Page({
  data: {
    path: ''
  },
  customData: {
    options: [],
    config: null
  },
  async onReady() {
    this.customData.options = [{
      type: UTYPE['QRCODE'],
      x: 0,
      y: 0,
      width: 141,
      height: 141,
      text: 'http://m.dev.babyfs.cn/promotion/allocation/allotSplitScreen?channel_id=167&m0_id=778968&poster_id=475&pro_id=778926&s=2&poster_no=20190430182622823163844237'
      // background: '#098fe1'
    }];
    this.customData.config = {
      reserve: false,
      // x: 0,
      // y: 0,
      destWidth: 750,
      destHeight: 1334,
      fileType: 'jpg',
      quality: 1
    };
    this.draw();

    // this.customData.options = [{
    //   type: UTYPE['IMG'],
    //   x: 0,
    //   y: 0,
    //   width: 220,
    //   height: 389,
    //   path: 'http://ppbd7ianm.bkt.clouddn.com/post_02.jpg'
    // },
    // {
    //   type: UTYPE['IMG'],
    //   x: 0,
    //   y: 0,
    //   width: 220,
    //   height: 389,
    //   path: 'http://ppbd7ianm.bkt.clouddn.com/%E9%95%82%E7%A9%BA%E5%A4%A7.png'
    // },
    // {
    //   type: UTYPE['QRCODE'],
    //   x: 40,
    //   y: 328,
    //   width: 40,
    //   height: 40,
    //   text: '宝宝玩英语'
    //   // text: 'http://ppbd7ianm.bkt.clouddn.com/tom_01.jpeg'
    //   // background: '#098fe1'
    // },
    // {
    //   type: UTYPE['TEXT'],
    //   x: 130,
    //   y: 70,
    //   text: 'THIS IS A TEST',
    //   // color: '#66666',
    //   textAlign: 'left',
    //   fontSize: 20,
    //   maxLength: 16,
    //   font: 'italic normal 700 24px/3 courier'
    // }];
    // this.customData.config = {
    //   reserve: true,
    //   // x: 0,
    //   // y: 0,
    //   destWidth: 220,
    //   destHeight: 389,
    //   fileType: 'jpg',
    //   quality: 1
    // };
    // this.draw();
  },

  // 绘制
  async draw() {
    let response;
    try {
      response = await compound('ocanvas', this.customData.options, this.customData.config);
    } catch (error) {
      console.log(error);
    }
    if (response.errMsg === 'canvasToTempFilePath:ok') {
      this.setData({
        path: response.tempFilePath
      });
    }
  },

  // 保存到本地
  async store() {
    const path = this.data.path;
    let r;
    if (path) {
      console.log('store');
      try {
        r = await wapi.saveImageToPhotosAlbumAsync({ filePath: path });
      } catch (error) {
        console.log(error);
      }
    }
    if (r) {
      console.log(r);
    }
  },

  // 从本地相册选择
  async choose() {
    let r;
    try {
      r = await wapi.chooseImageAsync({
        count: 1
      });
    } catch (error) {
      console.log(error);
    }
    if (r && r.tempFilePaths) {
      this.customData.options[0] = {
        type: UTYPE['IMG'],
        x: 0,
        y: 0,
        width: 220,
        height: 389,
        path: r.tempFilePaths[0]
      };
    }
  }
});
