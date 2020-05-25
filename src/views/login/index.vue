<!--  -->
<template>
  <div id="particles">
    <form action="" method="post" id="form">
      <div class="login">
        <div class="login-top">
          欢迎登录
        </div>
        <div class="login-center clearfix">
          <div class="login-center-img"><img src="./name.png" /></div>
          <div class="login-center-input">
            <input
              type="text"
              name="username"
              value=""
              placeholder="请输入您的用户名"
              onfocus="this.placeholder=''"
              onblur="this.placeholder='请输入您的用户名'"
            />
            <div class="login-center-input-text">用户名</div>
          </div>
        </div>
        <div class="login-center clearfix">
          <div class="login-center-img"><img src="./password.png" /></div>
          <div class="login-center-input">
            <input
              type="password"
              name="password"
              value=""
              placeholder="请输入您的密码"
              onfocus="this.placeholder=''"
              onblur="this.placeholder='请输入您的密码'"
            />
            <div class="login-center-input-text">密码</div>
          </div>
        </div>
        <div class="login-center clearfix">
          <div class="login-center-input" style="width: 120px; height: 40px; margin-left: 0px;">
            <input
              type="text"
              name="code"
              value=""
              placeholder="请输入验证码"
              onfocus="this.placeholder=''"
              onblur="this.placeholder='验证码'"
              style="width: 120px; height: 40px;"
            />
            <div class="login-center-input-text">验证码</div>
          </div>
          <div
            class="login-center-img"
            style="height: 40px; width: 130px; margin-top: 0px; float: right; cursor: pointer;"
          >
            <img src="" onclick="javascript:this.src=this.src+'&'" />
          </div>
        </div>
        <div class="login-button" onclick="submit()">
          登录
        </div>
      </div>
      <div class="sk-rotating-plane"></div>
    </form>
  </div>
</template>

<script>
// import particles from 'particles.js'
export default {
  data() {
    return {}
  },
  methods: {},
  mounted() {
    particlesJS.load('particles', '/static/json/particles.json')
  },
  components: {}
}
</script>
<style lang="less" scoped>
/* @import url(); 引入css类 */
@import url('./index.less');
</style>
