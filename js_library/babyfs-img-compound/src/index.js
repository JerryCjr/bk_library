/**
* 主模块文件
*/
import 'babel-polyfill';
import loadImg from 'babyfs-load-img';


/**
 * 合成图片
 * @param {object} options 合成图片的参数
 * @param {number} options.width 生成图片的宽度，单位px
 * @param {number} options.height 生成图片的高度，单位px
 * @param {number} options.scale 生成几倍图，默认为设备像素比（不支持window.devicePixelRatio的为1）
 * @param {array} options.items 合成图片的选项
 * @param {object} options.items[item, item, ...] 每个选项
 * @param {string} item.type img为图片 font为文字
 * 图片选项
 * @param {string} item.url 图片的路径 必选项
 * @param {number} item.width 图片在画布上面的宽度
 * @param {number} item.height 图片在画布上面的高度
 * @param {number} item.x 图片在画布x轴的距离，单位px
 * @param {number} item.y 图片在画布y轴的距离，单位px
 * 字体选项
 * @param {number} item.x 字体在画布x轴的距离，单位px
 * @param {number} item.y 字体在画布y轴的距离，单位px
 * @param {string} item.color 字体颜色，默认黑色
 * @param {string} item.fontSize 字体大小，单位px，默认10px
 * @param {string} item.fontFamily 字体系列
 * @param {string} item.textAlign 字体对齐方式 默认left 可选 left|center|right
 * @param {string} item.textBaseline 字体基线 默认alphabetic 可选 top|bottom|middle|alphabetic|hanging
 * @param {string} item.text 要绘制的文字 必选项
 * @return {promise} resolve为合成图片后的url(base64)
 */
async function compound({width = 100, height = 100, scale = window.devicePixelRatio || 1, items} = {}) {
  let canvas = document.createElement('canvas');
  let context = canvas.getContext('2d');
	let img = null;
	const IMG_KEY = 'img';
	const FONT_KEY = 'font';
  canvas.width = width * scale;
  canvas.height = height * scale;
  if (!items) {
    throw new Error('items字段为空');
  }
  for (let item of items) {
		// 没有type字段，退出本次循环
		if (!item.type) {
			continue;
		}
		item.x = item.x || 0;
		item.y = item.y || 0;
    switch (item.type) {
      case IMG_KEY:
        if (!item.url) {
          throw new Error('图片合成图片url字段为空');
        }
        img = await loadImg(item.url);
        context.drawImage(img, item.x * scale, item.y * scale, item.width * scale, item.height * scale);
      break;
      case FONT_KEY:
        if (!item.text) {
          throw new Error('图片合成字体text字段为空');
        }
        context.font = `${(item.fontSize || 10) * scale}px ${item.fontFamily || 'sans-serif'}`;
        if (item.textAlign) {
          context.textAlign = item.textAlign;
        }
        if (item.textBaseline) {
          context.textBaseline = item.textBaseline;
        }
        if (item.color) {
          context.fillStyle = item.color;
        }
        context.fillText(item.text || '', item.x * scale, item.y * scale);
        break;
    }
  }
  return canvas.toDataURL('image/png');
}

export default compound;