/**
 * 主模块文件
 */
import 'babel-polyfill';
import env from 'babyfs-env';
import typer from 'babyfs-type';
import fundebug from 'fundebug-javascript';

function formatComponentName(vm) {
  if (vm.$root === vm) return 'root';

  var name = vm._isVue ? (vm.$options && vm.$options.name) || (vm.$options && vm.$options._componentTag) : vm.name;
  return ((name ? 'component <' + name + '>' : 'anonymous component') + (vm._isVue && vm.$options && vm.$options.__file ? ' at ' + (vm.$options && vm.$options.__file) : ''));
}

/**
 * @description 根据env获取
 * @author Jerry Cheng
 * @date 2018-10-30
 * @param {*} code local: 0, development: 1, test: 2, bvt: 3, production: 4
 */
function getReleasestage(code) {
  switch (code) {
    case 1:
      return 'development';
    case 2:
      return 'test';
    case 3:
      return 'bvt';
    case 4:
      return 'production';
    default:
      return 'local';
  }
}

/**
 * @description 判断对象是否为{}
 * @author Jerry Cheng
 * @date 2018-10-31
 * @param {*} obj
 * @returns
 */
function isObjectEmpty(obj) {
  return !typer.isObjectNullOrUndefined(obj) && Object.keys(obj).length ? false : true;
}

/**
 * @description Fundebug初始化
 * @author Jerry Cheng
 * @date 2018-10-30
 * @export
 * @param {*} [options] Fundebug属性配置 https://docs.fundebug.com/notifier/javascript/customize/
 */
export default {
  install(Vue, options) {
    !isObjectEmpty(options) ? Object.assign(fundebug, options) : '';
    fundebug.releasestage = getReleasestage(env.currentEnv);
    Vue.config.errorHandler = function (err, vm, info) {
      if (vm) {
        var componentName = formatComponentName(vm);
        var propsData = vm.$options && vm.$options.propsData;
        fundebug.notifyError(err, {
          metaData: {
            componentName: componentName,
            propsData: propsData,
            info: info
          }
        });
      } else {
        fundebug.notifyError(err);
      }
    };
  }
};
