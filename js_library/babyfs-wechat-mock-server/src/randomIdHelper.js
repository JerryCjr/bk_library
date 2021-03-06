import crypto from 'crypto-js';

const _chars16 = '0123456789ABCDEF'.split('');
/**
 * 生成GUID
 * @returns {String}
 */
function guid() {
	var uuid = [], i;
	// rfc4122, version 4 form
	var r;
	// rfc4122 requires these characters
	uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
	uuid[14] = '4';
	// Fill in random data.  At i==19 set the high bits of clock sequence as
	// per rfc4122, sec. 4.1.5
	for (i = 0; i < 36; i++) {
		if (!uuid[i]) {
			r = 0 | Math.random() * 16;
			uuid[i] = _chars16[(i == 19) ? (r & 0x3) | 0x8 : r];
		}
	}
	return uuid.join('');
}

function aesKey() {
  let uuid = [];
  for (let i = 0; i < 16; ++i) {
    uuid.push(_chars16[Math.floor(16 * Math.random())]);
  }
  return uuid.join('');
}

function newNonce() {
  return Math.floor(Math.random() * 100000);
}

function randomCode() {
  return aesKey();
}

export default {
  aesKey,
  getUniqueId() {
    return crypto.MD5(guid()).toString();
  },
  newNonce,
  get timestamp() {
    return (new Date()).getTime();
  },
  randomCode
};
