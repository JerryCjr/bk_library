<template>
  <div>
    <div class="header">
      <span class="title">{{title}}</span>
      <b-env ref="env" v-show="false"></b-env>
      <span class="button" @click="handleGotoApps">apps</span>
    </div>
    <ul v-if="!!userList">
      <li>
        <div class="user">current wechat</div>
        <b-switch :checked="currentMockAccount === 'current'" :name="'current'" @checkStatusChanged="handleCheckStatusChanged"></b-switch>
      </li>
      <template v-if="userList.length > 0">
        <li v-for="u in userList" :key="u">
          <div class="user" @click="handleGotoConversation(u)">{{u}}</div>
          <b-switch :checked="currentMockAccount === u" :name="u" @checkStatusChanged="handleCheckStatusChanged"></b-switch>
        </li>
      </template>
    </ul>
    <div class="rich-button" @click="handleGotoAdd">+</div>
  </div>
</template>

<script>
import axios from 'axios';
import cookie from 'babyfs-cookie';
import bSwitch from '../../common/switch';
import bEnv from '../../common/env';

const mockAccountCookieKey = 'mock_user_id';

function removeAuthTokenCookie() {
  cookie.remove('X-Auth-Token', {
    domain: 'mall.dev.babyfs.cn'
  });
  cookie.remove('ba_a_uid', {
    domain: 'mall.dev.babyfs.cn'
  });
  cookie.remove('X-Auth-Token', {
    domain: 'mall.bvt.babyfs.cn'
  });
  cookie.remove('ba_a_uid', {
    domain: 'mall.bvt.babyfs.cn'
  });
  cookie.remove('X-Auth-Token', {
    domain: 'mall.fvt.babyfs.cn'
  });
  cookie.remove('ba_a_uid', {
    domain: 'mall.fvt.babyfs.cn'
  });
}

export default {
  name: 'home',
  data() {
    return {
      title: 'mock wechat account',
      userList: null,
      currentMockAccount: null
    };
  },
  components: {
    bSwitch,
    bEnv
  },
  mounted() {
    let mockAccountCookieValue = cookie.get(mockAccountCookieKey);
    this.currentMockAccount = mockAccountCookieValue ? mockAccountCookieValue : 'current';

    axios.get('/mock/wx/user/list').then(result => {
      if (result.data.data) {
        this.userList = result.data.data;
      }
    }).catch(error => {
      alert(error.message);
    });
  },
  methods: {
    handleGotoApps() {
      this.$router.replace({
        name: 'apps'
      });
    },
    handleGotoAdd() {
      this.$router.push({
        name: 'add'
      });
    },
    handleGotoConversation(userId) {
      this.$router.push({
        name: 'conversation',
        query: {
          userid: userId
        }
      });
    },
    async handleCheckStatusChanged(status) {
      try {
        await this.logout();
        if (status.name === 'current') {
          cookie.remove(mockAccountCookieKey, {
            domain: this.$refs.env.getDomain()
          });
          this.currentMockAccount = 'current';
        }
        else {
          let result = await axios.get('/mock/wx/user/get', {
            params: {
              userid: status.name
            }
          });
          if (result.data.success) {
            let d = new Date();
            let day = d.getDate();
            d.setDate(++day);
            cookie.set(mockAccountCookieKey, status.name, {
              expires: d,
              domain: this.$refs.env.getDomain()
            });
            this.currentMockAccount = status.name;
          }
          else {
            throw new Error('获取unionId失败');
          }
        }
      }
      catch (error) {
        alert(error.message);
      }
    },
    async logout() {
      await axios.get('/api/user/logout');
      removeAuthTokenCookie();
    }
  }
};
</script>

<style scoped>
img {
  width: 200px;
  height: 200px;
}
.header {
  display: flex;
  padding: 2px;
  justify-content: space-between;
}
.title {
  font-size: large;
  width: 70%;
}
.button {
  cursor: pointer;
}

ul {
  list-style-type: none;
  padding: 0;
}
li {
  padding: 2px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
a {
  display: block;
  width: 100%;
}
.user {
  color: white;
  cursor: pointer;
  background-color: #18AD19;
  font-size: 16px;
  font-weight: 300;
  line-height: 36px;
  text-align: center;
  border-radius: 0px;
  width: 83%;
}
.rich-button {
  display: block;
  width: 100%;
  color: white;
  background-color: #18AD19;
  font-size: 24px;
  font-weight: 300;
  line-height: 36px;
  white-space: nowrap;
  text-align: center;
  border-radius: 0;
  cursor: pointer;
  margin: 4px 0;
}
</style>
