import WXAPI from 'babyfs-wxapp-api';

class Preload {
  constructor(name) {
    this.name = name;
    this.resources = new Map();
    this.t = null;
    this._subscribers = [];

    this.prelaod = async function (key, queue) {
      const _this = this;
      let curQueue; // 当前的队列
      if (this.resources.get(key)) {
        curQueue = this.resources.get(key);
        // 判断是否已完成预加载
        if (curQueue[curQueue.length - 1]['complete']) {
          const payload = {
            type: 'success',
            rate: 1,
            ...curQueue[curQueue.length - 1]
          };
          _this._subscribers.forEach(sub => sub(payload));
          return;
        }
      } else {
        curQueue = queue;
      }

      let count = 0; // 当前进度
      let complete = false; // 唯一标识是否全部加载完成
      const start = +new Date(); // 加载开始的时间戳
      const maxLoadTime = 10000; // 最大加载时长
      const reg = /http:\/\//; // 正则匹配http://

      // 超时监测
      clearTimeout(this.t);
      this.t = setTimeout(() => {
        if (!complete) {
          const payload = {
            type: 'fail',
            complete: false,
            situation: 'timeout'
          };
          _this._subscribers.forEach(sub => sub(payload));
        }
      }, maxLoadTime);

      /**
       * @description 预加载结束
       * @author Jerry Cheng
       * @date 2018-12-25
       * @param {Object} item 预加载项
       */
      function loadFinish(item) {
        count++;
        const rate = parseInt((count / curQueue.length) * 100);

        if (count === curQueue.length) {
          const end = +new Date();
          complete = true;
          curQueue.push({
            complete,
            du: end - start
          });
        }

        const payload = {
          type: 'success',
          rate,
          complete
        };
        _this._subscribers.forEach(sub => sub(payload, item));
      };

      curQueue.forEach(async (item) => {
        // 从上次预加载失败的地方开始
        if (item.tempFilePath) {
          loadFinish(item);
          return;
        }

        let url = item.downLoadUrl;
        const matchRes = url.match(reg);
        if (matchRes && matchRes[0]) url = url.replace(matchRes[0], 'https://');

        // 预加载
        if (url) {
          const options = {
            url
          };
          let r;
          try {
            r = await WXAPI.downloadFileAsync(options);
          } catch (error) {
            console.log(error);
          }
          if (r) {
            item.tempFilePath = r.tempFilePath;
            item.du = +new Date() - start;
            loadFinish(item);
          }
        }
      });

      this.resources.set(key, curQueue);
    };

    this.getUrl = function (key, id) {
      let arr = this.resources.get(key);
      let url;
      arr.forEach((item) => {
        if (item.id === id) {
          url = item.tempFilePath ? item.tempFilePath : item.downLoadUrl;
        }
      });
      return url;
    };
  }

  static getInstance(name) {
    if (!this.instance) this.instance = new Preload();
    return this.instance;
  }

  subscribe(fn) {
    return genericSubscribe(fn, this._subscribers);
  }
}

function genericSubscribe(fn, subs) {
  if (subs.indexOf(fn) < 0) {
    subs.push(fn);
  }
  return () => {
    const i = subs.indexOf(fn);
    if (i > -1) {
      subs.splice(i, 1);
    }
  };
}

export default Preload.getInstance();
