import observe from './observe.js';

export default function babyfsPage(o, realPage = Page) {
  let data = o.data;
  let computed = o.computed;
  o.data = {};
  o.computed = undefined;
  if (o.onLoad) {
    let originalOnLoad = o.onLoad;
    o.onLoad = function (options) {
      let observer = observe({
        data,
        computed,
        onChanged: changedData => {
          this.setData(changedData);
        }
      });
      this.setData(observer);
      this.data = observer;
      originalOnLoad.call(this, options);
    };
  } else {
    o.onLoad = function () {
      let observer = observe({
        data,
        computed,
        onChanged: changedData => {
          this.setData(changedData);
        }
      });
      this.setData(observer);
      this.data = observer;
    };
  }

  realPage(o);
};
