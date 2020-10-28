import Minax from '../miniprogram_dist/index.js';
import SYSTEMINFO from './modules/systemInfo.js';

const mina = new Minax({
  modules: {
    SYSTEMINFO
  }
});

export default mina;
