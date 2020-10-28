/**
 * 主模块文件
 */
import 'babel-polyfill';
import fs from 'fs';
import path from 'path';
import qn from 'qn';

let qnOptions = {
  accessKey: 'AyS1gYvZtmwvi9Jr1hCznQgxtYHlfL1B3Cn0eR-L',
  secretKey: 'ZldoAPXcwnh_LW1tuEbPlJ0PLT_c614ZHVatmHf1',
  bucket: 'static',
  origin: 'https://s0.babyfs.cn',
  uploadURL: 'http://up.qiniu.com/',
  prefix: 'assets/'
};

let qnConfig = qn.create(qnOptions);

let config = function (options = {}) {
  qnConfig = qn.create(Object.assign(qnOptions, options));
};

let upload = function (stats = {}, cb = () => { }) {
  if (!stats.compilation || !stats.compilation.assets) {
    throw new Error('parameter error!');
  }
  let uploadFileIndex = 0;
  let assets = stats.compilation.assets || {};
  let assetsKeys = Object.keys(assets);
  // 递归上传文件
  let qnUploadFile = function (cb) {
    if (uploadFileIndex >= assetsKeys.length) {
      cb();
      return false;
    }
    let src = assetsKeys[uploadFileIndex];
    if (!/.html$/.test(src)) {
      let existsAt = assets[src].existsAt;
      let content = fs.readFileSync(path.resolve(__dirname, existsAt));
      let key = path.join(qnOptions.prefix, src);
      qnConfig.upload(content, {
        key
      }, function (err) {
        console.log('qncdn:', key);
        if (err && err.message.indexOf('file exists') == -1) {
          throw new Error(err);
        }
        uploadFileIndex++;
        qnUploadFile(cb);
      });
    } else {
      uploadFileIndex++;
      qnUploadFile(cb);
    }
  };
  qnUploadFile(cb);
};

module.exports = {
  config,
  upload
};
