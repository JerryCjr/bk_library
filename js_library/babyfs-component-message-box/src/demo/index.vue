<template>
  <div>
    <component-modal ref="messageBox" :config="config"></component-modal>
    <button @click="handleShowModal">Click me!</button>
    <button @click="handleShowModal1">Click me again!</button>
    <button @click="handleShowModal2">Click me again again!</button>
  </div>
</template>

<script>
export default {
  name: 'demo',
  data() {
    return {
      config: null
    };
  },
  methods: {
    handleShowModal() {
      this.config = {
        title: '标题',
        text: '确定撤销当前申请？',
        cancelText: '取消',
        confirmText: '确定',
        cancelHandler: () => {
          console.log('Click cancel');
        },
        confirmHandler: () => {
          console.log('Click confirm');
        },
        bgClickHandler: () => {
          console.log('Click bg');
        }
      };
      this.$refs.messageBox.show();
    },
    handleShowModal1() {
      this.$messageBox.show({
        title: '标题',
        text: '确定撤销当前申请？',
        cancelText: '取消',
        confirmText: '确定',
        onConfirm() {
          console.log('Click confirm');
        },
        onCancel() {
          console.log('Click cancel');
        },
        onClickBg() {
          console.log('Click bg');
        }
      });
    },
    handleShowModal2() {
      this.$messageBox.showPromise({
        title: '标题',
        text: '确定撤销当前申请？',
        cancelText: '取消',
        confirmText: '确定'
      }).then(() => {
        console.log('Click confirm');
      }).catch(() => {
        console.log('Click cancel or bg');
      });
    }
  }
};
</script>

<style>
</style>
