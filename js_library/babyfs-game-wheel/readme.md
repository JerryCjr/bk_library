# babyfs-game-wheel

> wheel prize game

## Build Setup

``` bash
# install dependencies
npm install

# serve development program
npm run dev

# build for production
npm run prod
```

## How to use

该组件运行依赖phaser-ce库，需要引用工程安装一下

``` bash
npm install --save babyfs-game-wheel
```

``` javascript
import Vue from 'vue';
import wheelPrizePlugin from 'babyfs-game-wheel';
import 'babyfs-game-wheel/dist/babyfsGameWheel.min.css';

Vue.use(wheelPrizePlugin);
```

vue template:

``` html
<b-wheel-prize ref="wheelPrize" :width="458" :height="488" :wheelImageUrl="wheelImageUrl" :pinImageUrl="pinImageUrl" :prizeList="slicePrizes" :winnerPrizeId="winnerPrizeId" @winPrize="handleWinPrize"></b-wheel-prize>
```

``` javascript
import PIXI from 'expose-loader?PIXI!phaser-ce/build/custom/pixi.js';
import p2 from 'expose-loader?p2!phaser-ce/build/custom/p2.js';
import Phaser from 'expose-loader?Phaser!phaser-ce/build/custom/phaser-split.js';

import imgPin from './static/pin.png';
import imgWheel from './static/wheel.png';

export default {
  name: 'wheelPrize',
  data() {
    return {
      wheelImageUrl: imgWheel,
      pinImageUrl: imgPin,
      slicePrizes: ['A KEY!!!', '50 STARS', '500 STARS', 'BAD LUCK!!!', '200 STARS', '100 STARS', '150 STARS', 'BAD LUCK!!!'],
      winnerPrizeId: -1
    };
  },
  methods: {
    handleStart() {
      this.winnerPrizeId = Math.floor(Math.random() * 8);
      console.log(`Server prize: ${this.slicePrizes[this.winnerPrizeId]}`);
      this.$nextTick(() => {
        this.$refs.wheelPrize.start();
      });
    },
    handleWinPrize(prize) {
      console.log(`You win ${prize}!!!!`);
    }
  }
};
```
