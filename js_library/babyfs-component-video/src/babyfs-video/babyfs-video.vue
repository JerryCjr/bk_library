<template>
  <div class="component-video" ref="component_video">
    <div class="video-box" v-if="type === 'inline'">
      <img :src="videoPause" alt="" class="play-btn" @click="videoPlayEvent" v-show="isPause">
      <img :src="poster" alt="" class="video-poster" v-show="isPause">
      <video ref="videoPlayer" class="video-js vjs-default-skin vjs-big-play-centered" playsinline="true" webkit-playsinline="true" x5-playsinline="true">
        您的浏览器不支持此视频播放
      </video>
    </div>
    <!-- TODO new -->
    <div class="video-box" v-if="type === 'outline'">
      <img :src="videoPause" alt="" class="play-btn" @click="videoPlayEvent" v-show="isPause">
      <img :src="poster" alt="" class="video-poster" v-show="isPause">
      <div class="pop-video" v-show="clickplay" :class="transparent ? 'transparent' : ''">
        <div class="pop-bc-box">
          <div class="video-box-ref" ref="video_box_ref">
            <video ref="videoPlayer" class="video-js vjs-default-skin vjs-big-play-centered" playsinline="true" webkit-playsinline="true" x5-playsinline="true">
              您的浏览器不支持此视频播放
            </video>
          </div>
          <div class="close">
            <img :src="closeIcon" alt="" @click="closeEvent">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import videojs from 'video.js';
import videoPause from './static/video_pause.png';
import closeIcon from './static/close.png';
export default {
  name: 'babyfsVideo',
  props: ['type', 'options', 'poster', 'rollplay'],
  data() {
    return {
      player: null,
      videoPause: videoPause, //播放按钮icon
      closeIcon: closeIcon, //关闭按钮icon
      isPause: true,
      initOptions: null,

      clickplay: true,
      transparent: true
    };
  },
  methods: {
    // 点击播放
    videoPlayEvent() {
      if (this.type === 'outline') {
        this.clickplay = true;
        document.querySelector('body').classList.add('body-scroll');
      }
      this.player.play();
    },
    // 关闭组件
    closeEvent() {
      this.clickplay = false;
      this.player.pause();
      document.querySelector('body').classList.remove('body-scroll');
    },
    init() {
      let winWidth, winHeight;
      if (this.type === 'outline') {
        winWidth = this.$refs.video_box_ref && this.$refs.video_box_ref.clientWidth;
        winHeight = this.$refs.video_box_ref && this.$refs.video_box_ref.clientHeight;
      } else {
        winWidth = this.$refs.component_video && this.$refs.component_video.clientWidth;
        winHeight = this.$refs.component_video && this.$refs.component_video.clientHeight;
      }
      this.initOptions = {
        width: winWidth,
        height: winHeight,
        start: 0,
        playsinline: true,
        // videojs options
        sources: [{
          type: 'video/mp4',
          src: ''
        }],
        language: 'zh-CN',
        poster: '',
        muted: false,
        loop: false,
        controls: true,
        autoplay: false,
        preload: 'auto',
        bigPlayButton: false
      };
      this.clickplay = false;
      this.transparent = false;
    },

    // video初始化
    playerInit() {
      if (this.type === 'inline') {
        this.rollplay || window.addEventListener('scroll', this.handleScroll);
      }
      const _this = this;
      const t = setTimeout(() => {
        this.init();
        let options = Object.assign({}, this.initOptions, this.options);
        this.player = videojs(this.$refs.videoPlayer, options, () => {
          if(this.type === 'inline') {
            this.player.on('play', function() {
              _this.isPause = false;
              this.show();
            });
            this.player.on('pause', function() {
              if (!this.scrubbing()) {
                _this.isPause = true;
                this.hide();
              }
            });
            this.player.on('ended', function() {
              this.play()
                .then(() => this.pause())
                .catch(() => this.pause());
            });
            this.player.on('error', function () {
              this.$Toast('视频源错误');
            });
          }
        });
        clearTimeout(t);
      });
    },
    /**
     * @description滚动监听
     * @author MuNaipeng
     */
    handleScroll() {
      let winHeight = this.$refs.component_video && this.$refs.component_video.clientHeight;
      this.scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      if (this.scrollTop > winHeight) {
        this.$nextTick(() => {
          this.player && this.player.pause();
        });
      }
    }
  },
  mounted() {
    this.playerInit();
  },
  destroyed() {
    this.isPause = true;
    this.transparent = false;
    window.removeEventListener('scroll', this.handleScroll);
    document.querySelector('body').classList.remove('body-scroll');
  }
};
</script>

<style lang='less'>
 @import url('./static/toast.min.css');
 @import url('./static/video.js.css');
 .body-scroll {
  width: 100%;
  position: fixed;
 }
 .component-video {
        width: 100%;
        height: 100%;
        position: relative;

        .transparent{
          opacity:0.1;
        }

        .video-poster{
          width: 100%;
          height: 100%;
          position: absolute;
          left:0;
          top:0;
          z-index: 1;
        }

        .play-btn{
          position: absolute;
          left:50%;
          top:50%;
          margin-left:-37.5px;
          margin-top:-37.5px;
          width: 75px;
          height: 75px;
          z-index: 2;
        }
        .pop-video{
          position: fixed;
          left:0;
          top:0;
          right:0;
          bottom:0;
          background: rgba(0, 0 ,0 , .2);
          z-index:9999;
          .pop-bc-box{
            width: 90%;
            height: 320px;
            background: #FFF;
            position: absolute;
            left:50%;
            top:50%;
            margin-left:-45%;
            margin-top: -160px;
            border-radius: 10px;
            padding: 20px;
            box-sizing: border-box;
            .video-box-ref{
              width: 100%;
              height: 100%;
            }
            .close{
              width: 38px;
              height: 38px;
              position: absolute;
              left:50%;
              margin-left: -19px;
              bottom:-60px;
            }
          }
        }

    }
</style>
