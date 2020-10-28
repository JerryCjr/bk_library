import WxModule from './moduleClass';
import WxComponent from './componentClass';
import path from 'path';
import directoryHelper from './directoryHelper';
import fileHelper from './fileHelper';
import { parameterCanNotBeNull } from './validate';

const privatePropertySet = Symbol('privatePropertySet');
/**
 * 微信应用类
 */
export default class WxApp {
  constructor(appDirectory = parameterCanNotBeNull('appDirectory')) {
    if (!directoryHelper.existSync(appDirectory)) {
      throw new Error(`wxapp init failed: ${appDirectory} does not exist`);
    }
    let appJsonFile = path.resolve(appDirectory, 'app.json');
    if (!fileHelper.existSync(appJsonFile)) {
      throw new Error(`wxapp init failed: ${appJsonFile} does not exist`);
    }
    let appJson = require(appJsonFile);
    this[privatePropertySet] = {
      app: new WxModule(path.resolve(appDirectory, 'app.js'), this),
      pages: appJson.pages.map(pagePath => new WxComponent(path.resolve(appDirectory, pagePath), this))
    };
  }

  get app() {
    return this[privatePropertySet].app;
  }

  get pages() {
    return this[privatePropertySet].pages;
  }
}
