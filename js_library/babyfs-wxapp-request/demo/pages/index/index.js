import ajax from '../../miniprogram_dist/index.js';
console.log(ajax);
let options = {
  url: '/api/m/promoter/recruit',
  type: ajax.TYPES['DEEPEST_DATA_NOT_REQUIRED']
};

try {
  ajax.GET(options);
} catch (error) {
  console.log(error);
}

Page({
  onLoad() {}
});
