<!--  -->
<template>
  <el-menu
    class="el-menu-vertical-demo"
    background-color="#333744"
    text-color="#fff"
    active-text-color="#409EFF"
  >
    <!-- 一级菜单 -->
    <el-submenu index="1">
      <!-- 一级菜单区域 -->
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>导航一</span>
      </template>
      <!-- 二级菜单 -->
      <el-menu-item>
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>导航一</span>
        </template>
      </el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
import { getMenus } from '@/api/auth'
export default {
  name: 'vAside',
  data() {
    return {}
  },
  methods: {
    getMenusList() {}
  },
  mounted() {},
  components: {}
}
</script>
<style lang="less" scoped>
/* @import url(); 引入css类 */
</style>
