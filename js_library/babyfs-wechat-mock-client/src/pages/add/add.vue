<template>
  <div>
    <input v-model="userId" type="text">
    <div class="button" @click="handleAddNewUser">submit</div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'add',
  data() {
    return {
      userId: ''
    };
  },
  methods: {
    handleAddNewUser() {
      axios.get('/mock/wx/user/new', {
        params: {
          userid: this.userId
        }
      }).then(res => {
        if (res.data.success) {
          this.$router.back();
        }
        else {
          throw new Error(res.data.msg);
        }
      }).catch(error => {
        alert(error.message);
      });
    }
  }
};
</script>

<style scoped>
input {
  display: block;
  box-sizing: border-box;
  width: 100%;
  height: 36px;
  border: 1px solid #e5e5e5;
  outline: none;
  font-size: inherit;
  color: inherit;
  background: transparent;
}
.button {
  display: block;
  width: 100%;
  color: white;
  background-color: #18AD19;
  font-size: 16px;
  font-weight: 300;
  line-height: 36px;
  white-space: nowrap;
  text-align: center;
  border-radius: 0;
  cursor: pointer;
  margin: 4px 0;
}
</style>
