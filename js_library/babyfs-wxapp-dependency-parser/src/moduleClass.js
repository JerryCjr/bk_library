import path from 'path';
import fileHelper from './fileHelper';
import directoryHelper from './directoryHelper';
import dependencyHelper from './dependencyHelper';
import WxPackage from './packageClass';
import { parameterCanNotBeNull } from './validate';
import global from './global';

const privatePropertySet = Symbol('privatePropertySet');
/**
 * 微信模块类
 */
export default class WxModule {
  constructor(moduleFileName = parameterCanNotBeNull('moduleFileName'), container = parameterCanNotBeNull('container')) {
    if (!fileHelper.existSync(moduleFileName)) {
      throw new Error(`module init failed: ${moduleFileName} does not exist`);
    }
    this[privatePropertySet] = {
      moduleFileName,
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
    return path.dirname(this[privatePropertySet].moduleFileName);
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
      return this[privatePropertySet].moduleFileName;
    }
    else {
      return path.resolve(this.container.installedPackageDirectory, path.relative(this.container.packageDirectory, this[privatePropertySet].moduleFileName));
    }
  }

  checkIsInstalled() {
    //要区分属于app和不属于app的模块的两种场景来判断
    if (this.belongToApp) {
      return !!global.parsedModules[this[privatePropertySet].moduleFileName];
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
    let targetModuleContent = await dependencyHelper.parse(this[privatePropertySet].moduleFileName, {
      onHandleDependency: (originNameOrPath) => {
        let absoluteOriginNameOrPath = path.resolve(this.moduleDirectory, originNameOrPath);
        if (fileHelper.existSync(absoluteOriginNameOrPath)) {
          // local模块
          this.dependencies[originNameOrPath] = new WxModule(absoluteOriginNameOrPath, this.container);
        }
        else {
          // external模块
          absoluteOriginNameOrPath = dependencyHelper.findInNodeModules(originNameOrPath, this.moduleDirectory);
          this.dependencies[originNameOrPath] = new WxPackage(absoluteOriginNameOrPath);
        }
      },
      onFixDependencyPath: (originNameOrPath) => {
        return path.relative(this.installedModuleDirectory, this.dependencies[originNameOrPath].targetFileName);
      }
    });
    await fileHelper.write(this.installedFileName, targetModuleContent);
    if (this.belongToApp) {
      global.jlog(`解析依赖完成：${this[privatePropertySet].moduleFileName}`);
    }
    else {
      global.jlog(`解析依赖完成：${this[privatePropertySet].moduleFileName}，并安装到了路径：${this.installedFileName}`);
    }
    //缓存住已经解析过的模块
    global.parsedModules[this[privatePropertySet].moduleFileName] = true;
  }
}
