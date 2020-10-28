<template>
  <div class="v-switch" :class="{'checked': checked}" @click="toggle">
    <div class="v-switch__bg"></div>
    <div class="v-switch__inner">
      <slot>
        <div class="v-switch__inner_icon"></div>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'b-switch',
  data() {
    return {};
  },
  props: {
    checked: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      default: null
    }
  },
  methods: {
    toggle() {
      this.$emit('checkStatusChanged', {
        name: this.name,
        checked: !this.checked
      });
    }
  }
};

</script>

<style lang="scss" scoped>
$vSwitchHeight: 32px;
$vSwitchWidth: 52px;
$colorPrimary: #18AD19;
$vSwitchColorOn: $colorPrimary;
$vSwitchColorOff: #DFDFDF;

.v-switch {
  position: relative;
  width: $vSwitchWidth;
  height: $vSwitchHeight;
  border: 1px solid #DFDFDF;
  border-radius: 16px;
  box-sizing: border-box;
  background: #DFDFDF;
  background-color: #DFDFDF;
  transition: background-color .1s, border .1s;
  vertical-align: middle;
  &__bg {
    content: " ";
    position: absolute;
    top: 0;
    left: 0;
    width: $vSwitchWidth -2;
    height: $vSwitchHeight - 2;
    border-radius: 15px;
    background-color: $vSwitchColorOff;
    transition: transform .35s cubic-bezier(0.45, 1, 0.4, 1);
  }
  &__inner {
    position: absolute;
    top: 0;
    left: 0;
    width: $vSwitchHeight - 2;
    height: $vSwitchHeight - 2;
    border-radius: 15px;
    background-color: #FFFFFF;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
    transition: transform .35s cubic-bezier(0.4, 0.4, 0.25, 1.35);
    &_icon {
      position: absolute;
      width: 2px;
      height: 2px;
      left: 50%;
      top: 50%;
      margin-top: -1px;
      margin-left: -1px;
      color: $vSwitchColorOff;
      &:before {
        content: " ";
        width: 12px;
        height: 2px;
        position: absolute;
        top: 0;
        left: -5px;
        transform: rotate(45deg);
        background: $vSwitchColorOff;
      }
      &:after {
        content: " ";
        width: 12px;
        height: 2px;
        top: 0;
        position: absolute;
        top: 0;
        left: -5px;
        transform: rotate(-45deg);
        background: $vSwitchColorOff;
      }
    }
  }

  &.checked {
    border-color: $colorPrimary;
    background-color: $colorPrimary;
    .v-switch__bg {
      transform: scale(0);
    }
    .v-switch__inner {
      transform: translateX(20px);
      &_icon {
      margin-top: 4px;
      margin-left: -3px;
      &:before {
        width: 8px;
        height: 2px;
        left: auto;
        top: auto;
        bottom: 0;
        right: 0;
        transform-origin: 100% 50%;
        background: $colorPrimary;
      }
      &:after {
        width: 14px;
        height: 2px;
        top: 0;
        left: 0;
        transform-origin: 0 0;
        background: $colorPrimary;
      }
    }
    }
  }
}
</style>

