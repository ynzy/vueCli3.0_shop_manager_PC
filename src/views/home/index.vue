<!-- 首页 -->
<template>
  <!-- <div>
    <el-button type="info" @click="logout">退出</el-button>
  </div> -->
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <div class="header-title">
        <img src="@/assets/logo.png" alt="" />
        <span>电商后台管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <!-- 页面主体 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="200px">
        <v-aside></v-aside>
      </el-aside>
      <!-- 右侧内容 -->
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
import vAside from './component/Aside.vue'
export default {
  data() {
    return {}
  },
  methods: {
    logout() {
      window.sessionStorage.clear()
      this.$router.push('/login')
    }
  },
  mounted() {},
  components: {
    vAside
  }
}
</script>
<style lang="less" scoped>
/* @import url(); 引入css类 */
.home-container {
  height: 100%;
}
.el-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 20px;
  background-color: #373d41;
  color: #fff;
  .header-title {
    display: flex;
    align-items: center;
    img {
      width: 50px;
      height: 44px;
    }
    span {
      margin-left: 15px;
    }
  }
}
.el-aside {
  background-color: #333744;
}
.el-main {
  background-color: #eaedf1;
}
</style>
