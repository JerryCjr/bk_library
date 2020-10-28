<template>
  <div>
    <button @click="showToast">出现toast</button>
  </div>
</template>

<script>
export default {
  name: 'demo',
  methods: {
    showToast() {
      this.$Toast({
        msg: '创建成功',
        duration: 30000,
        icon: 'success'
      });
    }
  }
};
</script>

<style>
</style>
