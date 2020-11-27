<template>
  <div>
    <el-button type="success" @click="bindWechat">绑定微信</el-button>
    <div class="login-qr" v-if="bindWechatShow">
      <wx-login
        :appid="appid"
        :scope="scope"
        :theme="style"
        :state="state"
        :redirect_uri="redirect_uri"
      ></wx-login>
    </div>
  </div>
</template>

<script>
import wxLogin from 'vue-wxlogin'
export default {
  components: {
    wxLogin
  },
  data() {
    return {
      bindWechatShow: false,
      appid: 'wx05d4499f20ed54d4',
      scope: 'snsapi_login',
      state: 'bind',
      style: 'black',
      redirect_uri: encodeURI('http://localhost:9090/#/wxLogin')
    }
  },
  methods: {
    bindWechat() {
      this.bindWechatShow = true
    }
  }
}
</script>

<style></style>
