import storage from 'babyfs-wxapp-storage';

function wxappVersion() {
  return storage.getData('wxa_version') ? storage.getData('wxa_version') : 0;
}

function wxappName() {
  return storage.getData('wxa_name') ? storage.getData('wxa_name') : '';
}

const CONTENT_TYPE = {
  DEFAULT: 'application/x-www-form-urlencoded', // 老接口只支持application/x-www-form-urlencoded
  URL_ENCODED: 'application/x-www-form-urlencoded',
  FORM_DATA: 'multipart/form-data',
  APPLICATION_JSON: 'application/json'
};

export default {
  wxappVersion,
  wxappName,
  CONTENT_TYPE
};
