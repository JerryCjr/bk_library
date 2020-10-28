<template>
  <transition name="fade">
    <div class="v-message-box" v-if="!!config && innerShow">
      <div class="mask" @click="hide()"></div>
      <div class="box">
        <div class="message-area">
          <div class="title">{{config.title || '温馨提示'}}</div>
          <!-- 多段文本，每段用<p>标记插入 -->
          <div class="desc" v-if="!!config.text">{{config.text}}</div>
        </div>
        <div class="button-area" v-if="config.cancelText || config.confirmText">
          <div class="cancel" v-if="config.cancelText" @click="cancelHandler">{{config.cancelText}}</div>
          <div
            class="confirm"
            v-if="config.confirmText"
            @click="confirmHandler"
          >{{config.confirmText}}</div>
        </div>
      </div>
    </div>
  </transition>
</template>


<script>
export default {
  name: 'babyfs-message-box',
  data() {
    return {
      innerShow: false
    };
  },
  props: ['config'],
  methods: {
    show() {
      this.innerShow = true;
    },
    // 取消按钮回调
    cancelHandler() {
      if (this.config && this.config.cancelHandler) {
        this.config.cancelHandler();
      }
      this.innerShow = false;
      this.$nextTick(() => this.$emit('closed'));
      
    },
    // 确定按钮回调
    confirmHandler() {
      if (this.config && this.config.confirmHandler) {
        this.config.confirmHandler();
      }
      this.innerShow = false;
      this.$nextTick(() => this.$emit('closed'));
    },
    // 隐藏组件
    hide() {
      if (this.config && !this.config.cancelText && !this.config.confirmText) {
        return;
      }
      if (this.config && this.config.bgClickHandler) {
        this.config.bgClickHandler();
      }
      this.innerShow = false;
      this.$nextTick(() => this.$emit('closed'));
    }
  }
};
</script>

<style lang="less" scoped>
@import url("./messageBox.less");
</style>

