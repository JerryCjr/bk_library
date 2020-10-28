import dateHelper from '../../miniprogram_dist/index.js';

const format = dateHelper.format(new Date(), 'yyyy-MM-dd hh:mm:ss');
console.log(format);

const parse = dateHelper.parse('2018-09-30 02:20:32', 'yyyy-MM-dd hh:mm:ss');
console.log(parse);

Page({});
