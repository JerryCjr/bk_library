/* eslint-disable no-console */
import path from 'path';
import global from './global';
import WxApp from './appClass';

const baseDirectory = process.cwd();

export default function ({
  entryDirectory = 'dist',
  targetDirectory = 'miniprogram_npm',
  debug = false
} = {}) {
  parse(entryDirectory, targetDirectory, debug).catch(e => {
    console.log(e);
  });
}

async function parse(entryDirectory, targetDirectory, debug) {
  global.debug = debug;
  let appDirectory = path.resolve(baseDirectory, entryDirectory);
  global.targetDirectory = path.resolve(appDirectory, targetDirectory);

  let wxapp = new WxApp(appDirectory);
  let toHandleDependencies = [
    wxapp.app,
    ...wxapp.pages
  ];
  while (toHandleDependencies.length > 0) {
    let dependency = toHandleDependencies.shift();
    if (dependency.checkIsInstalled()) {
      continue;
    }
    await dependency.install();
    if (dependency.dependencies) {
      toHandleDependencies.push(...Object.values(dependency.dependencies));
    }
    else if (dependency.entry) {
      toHandleDependencies.push(dependency.entry);
    }
  }
}


parse('demo', 'miniprogram_npm', true).catch(e => {
  console.log(e);
});
