/* eslint-disable no-console */
const colors = require('colors');
let __targetDirectory = '';
let __parsedModules = {};
let __debug = false;

function log(msg) {
  if (__debug) {
    console.log(msg);
  }
}

function jlog(title) {
  if (__debug) {
    console.log(colors.inverse.green(`【${title}】`));
  }
}

function jbug(title, msg) {
  if (__debug) {
    console.log(colors.inverse.yellow(`【${title}】`), colors.yellow(`${msg}`));
  }
}

function jerror(error) {
  if (__debug) {
    console.log(colors.red(`【${error}】`));
  }
}

export default {
  get targetDirectory() {
    return __targetDirectory;
  },
  set targetDirectory(v) {
    __targetDirectory = v;
  },
  get parsedModules() {
    return __parsedModules;
  },
  get debug() {
    return __debug;
  },
  set debug(v) {
    __debug = v;
  },
  log,
  jlog,
  jbug,
  jerror
};
