<template>
  <div id="game-container">
    <div v-if="isIos" style="position: relative;">
      <img id="game-img-wheel" ref="gameImgWheel" class="startRotate" :src="wheelImageUrl">
      <img id="game-img-pin" :src="pinImageUrl" />
    </div>
  </div>
</template>

<script>
import PIXI from 'expose-loader?PIXI!phaser-ce/build/custom/pixi.js';
import p2 from 'expose-loader?p2!phaser-ce/build/custom/p2.js';
import Phaser from 'expose-loader?Phaser!phaser-ce/build/custom/phaser-split.js';

function checkAgentIsIos() {
  let _agent = navigator.userAgent.toLowerCase();
  return _agent.indexOf('iphone') > -1 || _agent.indexOf('ipod') > -1 || _agent.indexOf('ipad') > -1;
}

export default {
  name: 'wheel',
  data() {
    return {
      gameInstance: null,
      wheelSprite: null,
      // winnerPrizeText: null,
      canSpin: false,
      isIos: checkAgentIsIos()
    };
  },
  props: {
    width: {
      type: Number,
      default: 800
    },
    height: {
      type: Number,
      default: 600
    },
    wheelImageUrl: {
      type: String,
      default: null
    },
    pinImageUrl: {
      type: String,
      default: null
    },
    prizeList: {
      type: Array,
      default: () => []
    },
    winnerPrizeId: {
      type: Number,
      default: -1
    }
  },
  computed: {
    sliceCount() {
      return this.prizeList.length;
    }
  },
  mounted() {
    this.init();
  },
  beforeDestroy() {
    if (!this.isIos) {
      this.gameInstance.destroy();
    }
  },
  methods: {
    init() {
      this.checkProps();
      if (this.isIos) {
        this.initGameIos();
      }
      else {
        this.initGame();
      }
    },
    checkProps() {
      if (!this.wheelImageUrl) {
        throw new Error('wheel image url is null!');
      }
      if (!this.pinImageUrl) {
        throw new Error('pin image url is null!');
      }
      if (this.sliceCount === 0) {
        throw new Error('prize list is not set!');
      }
    },
    initGame() {
      let that = this;
      let config = {
        width: this.width,
        height: this.height,
        renderer: Phaser.CANVAS,
        parent: 'game-container',
        state: {
          create() {
          },
          update() {
          }
        },
        transparent: true
      };

      this.gameInstance = new Phaser.Game(config);
      this.gameInstance.state.add('play', {
        preload() {
          this.game.load.image('wheel', that.wheelImageUrl);
          this.game.load.image('pin', that.pinImageUrl);
        },
        create() {
          // this.game.stage.backgroundColor = '#880044';
          this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
          this.game.scale.setGameSize(that.width, that.height);
          // this.game.scale.setUserScale(0.5, 0.5);
          that.wheelSprite = this.game.add.sprite(this.game.width / 2, this.game.height / 2, 'wheel');
          that.wheelSprite.anchor.set(0.5);
          let pin = this.game.add.sprite(this.game.width / 2, this.game.height / 2, 'pin');
          pin.anchor.set(0.5);
          // that.winnerPrizeText = this.game.add.text(this.game.world.centerX, 480, '');
          // that.winnerPrizeText.anchor.set(0.5);
          // that.winnerPrizeText.align = 'center';
          // that.canSpin = true;
          // this.game.input.onDown.add(this.spin, this);
        },
        spin() {
          if (that.canSpin) {
            // that.winnerPrizeText.text = '';
            let roundCount = this.game.rnd.between(2, 4);
            let minDegree = (that.sliceCount - 1 - that.winnerPrizeId) * (360 / that.sliceCount);
            let maxDegree = (that.sliceCount - that.winnerPrizeId) * (360 / that.sliceCount);
            let degreeCount = this.game.rnd.between(minDegree + 10, maxDegree - 10);
            // that.winnerPrizeId = that.sliceCount - 1 - Math.floor(degreeCount / (360 / that.sliceCount));
            let spinTween = this.game.add.tween(that.wheelSprite).to({
              angle: 360 * roundCount + degreeCount
            }, 5000, Phaser.Easing.Quadratic.InOut, true);
            that.canSpin = false;
            spinTween.onComplete.add(() => {
              this.winPrize();
            }, this);
          }
        },
        winPrize() {
          that.canSpin = true;
          that.$emit('winPrize', that.prizeList[that.winnerPrizeId]);
          // that.winnerPrizeText.text = that.winnerPrizeName;
        }
      });
      this.gameInstance.state.start('play');
    },
    initGameIos() {
      this.$refs.gameImgWheel.addEventListener('transitionend', () => {
        this.$emit('winPrize', this.prizeList[this.winnerPrizeId]);
      });
    },
    start() {
      if (this.winnerPrizeId > -1 && this.winnerPrizeId < this.sliceCount) {
        if (this.isIos) {
          let roundCount = Math.round(Math.random() * 2 + 2);
          let minDegree = (this.sliceCount - 1 - this.winnerPrizeId) * (360 / this.sliceCount);
          let maxDegree = (this.sliceCount - this.winnerPrizeId) * (360 / this.sliceCount);
          let degreeCount = 360 * roundCount + Math.random() * (maxDegree - minDegree - 20) + minDegree + 10;
          // this.$refs.gameImgWheel.style.setProperty('transform', `rotate(${degreeCount}deg)`);
          this.$refs.gameImgWheel.style.transform = `rotate(${degreeCount}deg)`;
        }
        else {
          this.canSpin = true;
          let playState = this.gameInstance.state.getCurrentState();
          playState.spin();
        }
      }
      else {
        throw new Error('winner prize is not set!');
      }
    }
  }
};
</script>

<style scoped>
.startRotate {
  transform: rotate(0);
  transition: transform 4s;
}
#game-img-wheel {
  width: 100%;
}
#game-img-pin {
  width: 32%;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
}
</style>
