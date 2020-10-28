import path from 'path';
import fileHelper from './fileHelper';
import directoryHelper from './directoryHelper';
import global from './global';
import WxModule from './moduleClass';
import WxComponent from './componentClass';
import { parameterCanNotBeNull } from './validate';

const privatePropertySet = Symbol('privatePropertySet');
/**
 * 微信包类
 */
export default class WxPackage {
  constructor(packageDirectory = parameterCanNotBeNull('packageDirectory')) {
    if (!directoryHelper.existSync(packageDirectory)) {
      throw new Error(`package init failed: ${packageDirectory} does not exist`);
    }
    let packageJsonFile = path.resolve(packageDirectory, 'package.json');
    if (!fileHelper.existSync(packageJsonFile)) {
      throw new Error(`package init failed: ${packageJsonFile} does not exist`);
    }
    let packageJson = require(packageJsonFile);
    let entryPath = path.resolve(packageDirectory, packageJson.main);
    let entry = null;
    if (!!packageJson.miniprogram) {
      entry = new WxComponent(path.resolve(path.dirname(entryPath), path.basename(entryPath, '.js')), this);
    }
    else {
      entry = new WxModule(entryPath, this);
    }
    this[privatePropertySet] = {
      name: packageJson.name,
      miniprogramDist: packageJson.miniprogram,
      entry,
      version: packageJson.version,
      packageDirectory
    };
  }

  get name() {
    return this[privatePropertySet].name;
  }

  get entry() {
    return this[privatePropertySet].entry;
  }

  get version() {
    return this[privatePropertySet].version;
  }

  get packageDirectory() {
    return this[privatePropertySet].packageDirectory;
  }

  get installedPackageDirectory() {
    return path.resolve(global.targetDirectory, `${this.name}@${this.version}`);
  }

  get targetFileName() {
    return this.entry.targetFileName;
  }

  get installedFileName() {
    return path.resolve(this.installedPackageDirectory, 'package.json');
  }

  checkIsInstalled() {
    return fileHelper.existSync(this.installedFileName);
  }

  async install() {
    if (this.checkIsInstalled()) {
      return;
    }
    await directoryHelper.create(this.installedPackageDirectory);
    let packageJsonFileName = path.resolve(this[privatePropertySet].packageDirectory, 'package.json');
    await fileHelper.copy(packageJsonFileName, this.installedFileName);
    global.jlog(`安装${packageJsonFileName}到了路径${this.installedFileName}`);
    let sourceDir;
    let destinationDir;
    //如果是个微信组件的包，则拷贝wxml和wxss文件
    if (this[privatePropertySet].miniprogramDist) {
      let relative = '';
      sourceDir = path.resolve(this.packageDirectory, this[privatePropertySet].miniprogramDist);
      destinationDir = path.resolve(this.installedPackageDirectory, this[privatePropertySet].miniprogramDist);
      global.jbug('源目录', sourceDir);
      global.jbug('目标', destinationDir);
      await recursiveReadDir(relative, sourceDir, onHandleFile);
    }

    async function onHandleFile (sourceFileName) {
      const copySrc = path.resolve(sourceDir, sourceFileName);
      const copyDest = path.resolve(destinationDir, sourceFileName);
      await fileHelper.copy(copySrc, copyDest);
      global.jbug('当前文件名称', sourceFileName);
      global.jbug('copySrc', copySrc);
      global.jbug('copyDest', copyDest);
      global.jlog(`安装${copySrc}到了路径${copyDest}`);
    }

    async function recursiveReadDir(relative, dir, onHandleFile) {
      let dirents = await directoryHelper.read(dir, { withFileTypes: true });
      try {
        const promises = dirents.map(async dirent => {
          global.log(dirent);
          if (dirent.isDirectory()) {
            // global.jbug('子文件和目录的关系', path.join(relative, dirent.name));
            // global.jbug('目录的绝对路径', path.join(dir, relative, dirent.name));
            await recursiveReadDir(path.join(relative, dirent.name), path.resolve(dir, dirent.name), onHandleFile);
          } else if (dirent.isFile()) {
            let filename = dirent.name;
            let extName = path.extname(filename);
            if (extName === '.wxml' || extName === '.wxss' || extName === '.png') {
              await onHandleFile(path.join(relative, filename));
            }
          }
        });
        await promises;
      } catch (error) {
        global.jerror(error);
      }
    }
  }
}
