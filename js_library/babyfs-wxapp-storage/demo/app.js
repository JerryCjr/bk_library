import storage from 'miniprogram_dist/index.js';
App({
  async onLaunch() {
    console.log('onLaunch');
    console.log(storage);
    storage.setData({
      name: 'jerry',
      test: 'this is a test'
    });
  }
});
