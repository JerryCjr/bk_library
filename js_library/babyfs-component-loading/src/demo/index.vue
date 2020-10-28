<template>
  <div>
    <button @click="showLoading">show</button>
    <button @click="hideLoading">hide</button>
    <button @click="flag = !flag">toggle component loading</button>
    <babyfs-loading :visible="flag"></babyfs-loading>
  </div>
</template>

<script>
export default {
  name: 'demo',
  data() {
    return {
      flag: false
    };
  },
  methods: {
    showLoading() {
      this.$loading.show();
    },
    hideLoading() {
      this.$loading.hide();
    }
  }
};
</script>

<style>
  button{
    position: relative;
    z-index: 9999999999;
  }
</style>
