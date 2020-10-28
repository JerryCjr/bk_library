import Vue from 'vue';
import env from '@babyfs/babyfs-env';
import VConsole from 'vconsole';
import url from '@babyfs/babyfs-url';
import cookie from '@babyfs/babyfs-cookie';
import $login from 'babyfs-login';
import './static/style/common.css';
import Clipboard from 'clipboard';
import { Toast } from 'mint-ui';
const id = 'v-console';
let node = document.getElementById('v-console');
if (!node) {
  node = document.createElement('div');
  node.setAttribute('id', id);
  document.body.appendChild(node);
}
new Vue({
  el: '#v-console',
  template: `
          <div class="babyfs-console-panel" v-if="panelVisible" @click="onClose">
            <div class="mask"></div>
            <div class="content">
              <ul>
                <li class="url">{{currentPageUrl}}</li>
                <li>
                  <button @click="onCopyLink($event)" class="copy-btn" :data-clipboard-text="currentPageUrl">复制当前页面链接</button>
                </li>
                <li>
                  <button @click.stop="onRefresh" >刷新</button>
                </li>
                <li>
                  <button @click.stop="onLogin">登录</button>
                </li>
                <li>
                  <button @click.stop="onLogout">退出登录&清缓存</button>
                </li>
                <li>
                  <button @click.stop="onSwitchVConsole">{{vConsoleVisible?'关闭':'打开'}}vConsole</button>
                </li>
              </ul>
            </div>
          </div>
      `,
  data: {
    panelVisible: false,
    gestureFeatures: new Array<number>(),
    currentPageUrl: '',
    vConsole: {
      destroy() {},
    },
    vConsoleVisible: !!localStorage.getItem('vConsole'),
  },
  created() {
    if (localStorage.getItem('vConsole')) {
      this.onSwitchVConsole('open');
    }
  },
  mounted() {
    this.currentPageUrl = location.href;
    this.onGesture();
  },
  methods: {
    onRefresh() {
      location.href = url.addParameter(
        {
          ts: +new Date(),
        },
        location.href,
      );
    },
    onSwitchVConsole(type: string) {
      if ((type && type === 'open') || !this.vConsoleVisible) {
        localStorage.setItem('vConsole', '1');
        this.vConsole = new VConsole();
        this.vConsoleVisible = true;
      } else {
        localStorage.setItem('vConsole', '');
        this.vConsole && this.vConsole.destroy();
        this.vConsoleVisible = false;
      }
    },
    onClose() {
      this.panelVisible = false;
    },
    onCopyLink() {
      const clipboard = new Clipboard('.copy-btn');
      clipboard.on('success', function () {
        Toast({
          message: '复制成功',
          position: 'top',
          duration: 1500,
          className: 'babyfs-console-toast',
        });
      });
      clipboard.on('error', function () {
        Toast({
          message: '手机系统版本过低，请选择长按复制',
          position: 'top',
          duration: 1500,
        });
      });
    },
    onLogin() {
      if (env.app === env.EnumApp.weixin) {
        $login.wxLogin('babyclass');
      } else if (env.app === env.EnumApp.babyfs) {
        $login.appLogin();
      } else {
        Toast({
          message: '登录异常',
          position: 'top',
          duration: 1500,
        });
      }
    },
    async onLogout() {
      const keys = document.cookie.match(/[^ =;]+(?==)/g);
      keys &&
        keys.length &&
        keys.map((key) => {
          console.log(key);
          cookie.remove(key, {
            path: '/',
            domain: location.hostname,
          });
          cookie.remove(key, {
            path: '/',
            domain: 'babyfs.cn',
          });
        });
      sessionStorage.clear();
      localStorage.clear();
      await $login.babyfsLogout();
      this.onRefresh();
    },
    onGesture() {
      const that = this;
      let startX = 0;
      let startY = 0;
      document.addEventListener('touchstart', function (e) {
        startX = e.changedTouches[0].pageX;
        startY = e.changedTouches[0].pageY;
      });
      document.addEventListener('touchmove', function (e) {
        try {
          const moveEndX = e.changedTouches[0].pageX;
          const moveEndY = e.changedTouches[0].pageY;
          const X = moveEndX - startX;
          const Y = moveEndY - startY;
          if (Math.abs(X) > Math.abs(Y) && X > 0) {
            startX = e.changedTouches[0].pageX;
            startY = e.changedTouches[0].pageY;
            if (that.gestureFeatures[that.gestureFeatures.length - 1] !== 1) {
              that.gestureFeatures.push(1);
            }
          }
          if (Math.abs(X) > Math.abs(Y) && X < 0) {
            startX = e.changedTouches[0].pageX;
            startY = e.changedTouches[0].pageY;
            if (that.gestureFeatures[that.gestureFeatures.length - 1] !== 2) {
              that.gestureFeatures.push(2);
            }
          }
          if (that.gestureFeatures.length > 10) {
            that.gestureFeatures = [];
            that.panelVisible = true;
          }
        } catch (err) {
          console.log(err);
        }
      });
      document.addEventListener('touchend', function (e) {
        that.gestureFeatures = [];
      });
    },
  },
});
