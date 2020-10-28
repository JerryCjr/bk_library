/**
* 主模块文件
*/
import 'babel-polyfill';
/**
 * 加载图片
 * @param {string} url 图片地址
 * @return {promise} resolve为加载成功的图片 reject为错误信息
 */
export default function(url) {
	let img = new Image();
  // 解决污染画布的问题
  img.crossOrigin = 'Anonymous';
  img.src = url;
  return new Promise((resolve, reject) => {
    img.onload = function() {
      resolve(img);
    };
    img.onerror = function() {
      reject(new Error('图片加载失败'));
    };
  });
}
