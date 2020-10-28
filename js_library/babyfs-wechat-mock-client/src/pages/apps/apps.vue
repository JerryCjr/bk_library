<template>
  <div>
    <div class="header">
      <span class="title">{{title}}</span>
      <b-env ref="env" v-show="false"></b-env>
      <span class="button" @click="handleGotoHome">accounts</span>
    </div>
    <ul v-if="!!officeAppidList">
      <li>
        <div class="user">default office appid</div>
        <b-switch :checked="currentOfficeAppid === 'current'" :name="'current'" @checkStatusChanged="handleCheckStatusChanged"></b-switch>
      </li>
      <template v-if="officeAppidList.length > 0">
        <li v-for="u in officeAppidList" :key="u[0]">
          <div class="user">{{u[0]}}</div>
          <b-switch :checked="currentOfficeAppid === u[1]" :name="u[1]" @checkStatusChanged="handleCheckStatusChanged"></b-switch>
        </li>
      </template>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';
import cookie from 'babyfs-cookie';
import bSwitch from '../../common/switch';
import bEnv from '../../common/env';

const mockAppidCookieKey = 'mock_app_id';

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
  name: 'apps',
  data() {
    return {
      title: 'public office appid',
      officeAppidList: null,
      currentOfficeAppid: null
    };
  },
  components: {
    bSwitch,
    bEnv
  },
  mounted() {
    let mockAppidCookieValue = cookie.get(mockAppidCookieKey);
    this.currentOfficeAppid = mockAppidCookieValue ? mockAppidCookieValue : 'current';

    axios.get('/mock/wx/ofa/apps/get').then(result => {
      if (result.data.data) {
        this.officeAppidList = result.data.data;
      }
    }).catch(error => {
      alert(error.message);
    });
  },
  methods: {
    handleGotoHome() {
      this.$router.replace({
        name: 'home'
      });
    },
    async handleCheckStatusChanged(status) {
      try {
        await this.logout();
        if (status.name === 'current') {
          cookie.remove(mockAppidCookieKey, {
            domain: this.$refs.env.getDomain()
          });
          this.currentOfficeAppid = 'current';
        }
        else {
          let d = new Date();
          let day = d.getDate();
          d.setDate(++day);
          cookie.set(mockAppidCookieKey, status.name, {
            expires: d,
            domain: this.$refs.env.getDomain()
          });
          this.currentOfficeAppid = status.name;
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

