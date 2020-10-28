/**
* 主模块文件
*/
import 'babel-polyfill';
import Qrcode from 'qrcode';
import loadImg from 'babyfs-load-img';

/**
 * 生成二维码
 * @param {object} options 符合参数
 * @param {string} options.text 生成二维码的内容，必传项
 * @param {number} options.width 生成二维码的宽度
 * @param {number} options.margin 二维码留白，默认4
 * @param {object} options.color 设置二维码的颜色
 * @param {string} options.color.dark 二维码深色，也就是前景色，默认#000000ff，必须16进制的颜色
 * @param {string} options.color.light 二维码亮色，也就是背景色，默认#ffffffff，必须16进制的颜色
 * @param {object} options.logo 二维码中间的logo
 * @param {number} options.logo.width logo的宽度
 * @param {number} options.logo.height logo的高度
 * @param {string} options.logo.url logo的路径
 * @return {prmise} resolve为bese64格式的图片
 * 采用的第三方node-qrcode，详细配置https://github.com/soldair/node-qrcode
 */
async function qrcode({text, width = 100, margin, logo, scale = window.devicePixelRatio || 1, ...otherOptions} = {}) {
  let url = '';
  if (!text) {
    throw new Error('二维码text字段为空');
  }
  if (logo) {
    if (!logo.url) {
      throw new Error('logo图片链接为空');
    }
    logo.width = logo.width || 20;
    logo.height = logo.height || 20;
    let img = await loadImg(logo.url);
    let canvas = await Qrcode.toCanvas(text, {
      width: width * scale,
      margin: margin * scale,
      ...otherOptions
    });
    let context = canvas.getContext('2d');
    let x = (width * scale - logo.width * scale) / 2;
    let y = (width * scale - logo.height * scale) / 2;
    context.drawImage(img, x, y, logo.width * scale, logo.height * scale);
    url = canvas.toDataURL('image/png');
  } else {
    url = await Qrcode.toDataURL(text, {
      width: width * scale,
      margin: margin * scale,
      ...otherOptions
    });
  }
  return url;
}

export default qrcode;