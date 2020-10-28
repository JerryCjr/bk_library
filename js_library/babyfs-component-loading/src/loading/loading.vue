<template>
  <transition name="fade">
    <div class="babyfs-loading" @touchmove.prevent v-show="visible">
      <div class="babyfs-loading--circular">
        <span class="babyfs-loading__spinner">
          <svg class="babyfs-loading__circular">
            <circle cx="20"  cy="20" r="18"></circle>
          </svg>
        </span>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'loading',
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="less" scoped>
  .babyfs-loading{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 999999;
    & > *{
      padding: 0;
      margin: 0;
    }
    &--circular{
      position: absolute;
      top: 50%;
      left: 50%;
      width: 40px;
      height: 40px;
      background: rgba(0, 0, 0, 0.5);
      padding: 10px;
      border-radius: 3px;
      transform: translate(-50%, -50%);
    }
    &__spinner{
      display: block;
      width: 100%;
      height: 100%;
      animation: babyfs-rotate 2.5s linear infinite;
    }
    &__circular{
      width: 100%;
      height: 100%;
    }
    circle{
      fill: none;
      stroke-width: 2;
      stroke-linecap: round;
      stroke: #fff;
      animation: babyfs-circular 1.5s ease-in-out infinite;
    }
  }
  @keyframes babyfs-rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes babyfs-circular {
    0% {
      stroke-dasharray: 1, 200;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -40;
    }
    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -120;
    }
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .3s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>
