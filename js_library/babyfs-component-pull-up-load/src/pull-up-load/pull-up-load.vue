<template>
  <div>
    <slot></slot>
  </div>
</template>
<script>
export default {
  props: {
    self: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    distance: {
      type: Number,
      default: 10
    }
  },
  computed: {
    bindEventEl() {
      return this.self ? this.$slots.default[0].elm : window;
    }
  },
  activated() {
    this.bindEvent();
  },
  deactivated() {
    this.removeEvent();
  },
  mounted() {
    this.bindEvent();
  },
  destroyed() {
    this.removeEvent();
  },
  methods: {
    bindEvent() {
      if (this.bindEventEl.babyfs__handleScroll) return false;
      this.bindEventEl.addEventListener('scroll', this.handleScroll);
      this.bindEventEl.babyfs__handleScroll = this.handleScroll;
    },
    removeEvent() {
      this.bindEventEl.removeEventListener('scroll', this.handleScroll);
      this.bindEventEl.babyfs__handleScroll = null;
    },
    handleScroll() {
      let clientHeight = this.self ? this.bindEventEl.clientHeight : this.bindEventEl.innerHeight;
      let scrollHeight = this.self ? this.bindEventEl.scrollHeight : document.documentElement.scrollHeight;
      let scrollTop = this.self ? this.bindEventEl.scrollTop : this.bindEventEl.scrollY;
      if (scrollHeight - scrollTop - clientHeight <= this.distance && !this.disabled) {
        this.$emit('to-bottom');
      }
    }
  }
};
</script>

