<template>
  <!-- 遮罩层，可配合dialog、modal使用 -->
  <!-- type:plain 设置为全透明遮罩层，阻隔用户操作页面元素 -->
  <div ref="background" class="v-mask" type=""></div>
</template>

<script>
export default {
  name: 'babyfs-mask',
  methods: {
    zIndex(z) {
      this.$refs.background.style.zIndex = z;
    }
  }
};
</script>

<style lang="scss" scoped>
// 遮罩层
.v-mask{
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, .7);
  z-index: 99;
  [type="plain"]{
    background: rgba(0, 0, 0, 0);
  }
}
</style>
