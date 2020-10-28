import WxModule from './moduleClass';
import WxPackage from './packageClass';
import path from 'path';
import fileHelper from './fileHelper';
import directoryHelper from './directoryHelper';
import dependencyHelper from './dependencyHelper';
import { parameterCanNotBeNull } from './validate';
import global from './global';

const privatePropertySet = Symbol('privatePropertySet');
/**
 * 微信组件类
 */
export default class WxComponent {
  constructor(componentName = parameterCanNotBeNull('componentName'), container = parameterCanNotBeNull('container')) {
    let jsFileName = `${componentName}.js`;
    if (!fileHelper.existSync(jsFileName)) {
      throw new Error(`component init failed: ${jsFileName} does not exist`);
    }
    let jsonFileName = `${componentName}.json`;
    if (!fileHelper.existSync(jsonFileName)) {
      throw new Error(`component init failed: ${jsonFileName} does not exist`);
    }
    this[privatePropertySet] = {
      module: new WxModule(jsFileName, container),
      jsFileName,
      jsonFileName,
      // wxmlFileName: `${componentName}.wxml`,
      // wxssFileName: `${componentName}.wxss`,
      container,
      dependencies: {}
    };
  }

  get container() {
    return this[privatePropertySet].container;
  }

  get belongToApp() {
    return !!this.container.app;
  }

  get dependencies() {
    return this[privatePropertySet].dependencies;
  }

  get moduleDirectory() {
    return path.dirname(this[privatePropertySet].jsFileName);
  }

  get installedModuleDirectory() {
    return path.dirname(this.installedFileName);
  }

  get targetFileName() {
    return this.installedFileName;
  }

  get installedFileName() {
    //判断如果是属于app的模块，则当前模块绝对路径就是安装之后的路径
    if (this.belongToApp) {
      return this[privatePropertySet].jsFileName;
    }
    else {
      return path.resolve(this.container.installedPackageDirectory, path.relative(this.container.packageDirectory, this[privatePropertySet].jsFileName));
    }
  }

  checkIsInstalled() {
    //要区分属于app和不属于app的模块的两种场景来判断
    if (this.belongToApp) {
      return !!global.parsedModules[this[privatePropertySet].jsonFileName];
    }
    else {
      return fileHelper.existSync(this.installedFileName);
    }
  }

  async install() {
    if (this.checkIsInstalled()) {
      return;
    }
    await directoryHelper.create(this.installedModuleDirectory);
    // 解析依赖
    await this[privatePropertySet].module.install();
    Object.entries(this[privatePropertySet].module.dependencies).forEach(item => {
      this.dependencies[item[0]] = item[1];
    });

    let targetJsonContent = await dependencyHelper.parse(this[privatePropertySet].jsonFileName, {
      onHandleDependency: (originNameOrPath) => {
        let absoluteOriginNameOrPath = path.resolve(this.moduleDirectory, originNameOrPath);
        if (fileHelper.existSync(`${absoluteOriginNameOrPath}.js`)) {
          // local模块
          this.dependencies[originNameOrPath] = new WxComponent(absoluteOriginNameOrPath, this.container);
        }
        else {
          // external模块
          absoluteOriginNameOrPath = dependencyHelper.findInNodeModules(originNameOrPath, this.moduleDirectory);
          this.dependencies[originNameOrPath] = new WxPackage(absoluteOriginNameOrPath);
        }
      },
      onFixDependencyPath: (originNameOrPath) => {
        let tempFileName = this.dependencies[originNameOrPath].targetFileName;
        return path.relative(this.installedModuleDirectory, tempFileName.substr(0, tempFileName.length - 3));
      }
    });
    let installedJsonFileName = this[privatePropertySet].jsonFileName;
    if (!this.belongToApp) {
      installedJsonFileName = path.resolve(this.container.installedPackageDirectory, path.relative(this.container.packageDirectory, this[privatePropertySet].jsonFileName));
    }
    await fileHelper.write(installedJsonFileName, targetJsonContent);
    if (this.belongToApp) {
      global.jlog(`解析依赖完成：${this[privatePropertySet].jsonFileName}`);
    }
    else {
      global.jlog(`解析依赖完成：${this[privatePropertySet].jsonFileName}，并安装到了路径：${installedJsonFileName}`);
    }
    //缓存住已经解析过的jsonFile模块
    global.parsedModules[this[privatePropertySet].jsonFileName] = true;
  }
}
