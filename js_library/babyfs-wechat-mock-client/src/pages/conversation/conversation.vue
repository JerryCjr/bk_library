<template>
  <div>
    <div></div>
    <div>
      <ul>
        <li v-for="(item, index) in messageList" :key="index">
          <div class="title"><span>from: {{item.from}} to: {{item.to}}</span> ---- <span>time: {{new Date(item.timestamp).toLocaleTimeString()}}</span></div>
          <div v-if="!!item.content">{{item.content}}</div>
          <div v-if="!!item.image">
            <img class="message-image" :src="item.image">
          </div>
          <div v-if="!!item.templateMessage">
            <div>模版消息标题: {{item.templateMessage.title}}</div>
            <div>模版消息内容: {{item.templateMessage.content}}</div>
            <div v-if="!!item.templateMessage.miniprogramAppName">外链小程序：{{item.templateMessage.miniprogramAppName}}</div>
            <div>外链小程序页面地址: {{item.templateMessage.miniprogramPage}}</div>
            <div v-if="!!item.templateMessage.outterUrl">外链H5页面地址：{{item.templateMessage.outterUrl}}</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
// import imgTest from '../../static/home/logo.jpg';

export default {
  name: 'conversation',
  data() {
    return {
      messageList: [],
      refreshIntervalId: null
    };
  },
  mounted() {
    // this.messageList = [
    //   {
    //     from: 'wxa_sag',
    //     to: 'testOpenId',
    //     timestamp: (new Date()).getTime(),
    //     content: 'test message'
    //   },{
    //     from: 'wxa_sag',
    //     to: 'testOpenId',
    //     timestamp: (new Date()).getTime(),
    //     image: imgTest
    //   },{
    //     from: 'wxa_sag',
    //     to: 'testOpenId',
    //     timestamp: (new Date()).getTime(),
    //     templateMessage: {
    //       title: '模版消息标题',
    //       content: '模版消息内容',
    //       miniprogramPage: '/pages/index/index'
    //     }
    //   }
    // ];
    this.refreshConversation();
    this.refreshIntervalId = setInterval(this.refreshConversation, 3000);
  },
  beforeDestroy() {
    clearInterval(this.refreshIntervalId);
  },
  methods: {
    refreshConversation() {
      let userId = this.$route.query.userid;
      axios.get('/mock/wx/chatmessage/get', {
        params: {
          userid: userId
        }
      }).then(result => {
        this.messageList = result.data.data;
      }).catch(error => {
        alert(error.message);
      });
    }
  }
};
</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin-bottom: 6px;
}
.title {
  font-size: 14px;
  color: gray;
}
.message-image {
  width: 100%;
}
</style>
