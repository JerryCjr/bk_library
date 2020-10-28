import fs from 'fs';
import promiseWrapper from './promiseWrapper';

function existSync(dir) {
  try {
    fs.accessSync(dir, fs.constants.R_OK | fs.constants.W_OK);
    return true;
  } catch (err) {
    return false;
  }
}

async function create(targetDir) {
	if (!existSync(targetDir)) {
    await promiseWrapper(fs.mkdir)(targetDir, { recursive: true });
	}
}

async function read(baseDir, options) {
	return await promiseWrapper(fs.readdir)(baseDir, options);
}

export default {
  existSync,
  create,
  read
};
