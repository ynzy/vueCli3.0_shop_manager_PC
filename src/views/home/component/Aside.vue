<!--  -->
<template>
  <el-aside :width="isCollapse ? '64px' : '200px'">
    <div class="toggle-button" @click="toggleCollapse">|||</div>
    <el-menu
      :router="true"
      :unique-opened="true"
      :collapse="isCollapse"
      :collapse-transition="false"
      class="el-menu-vertical-demo"
      background-color="#333744"
      text-color="#fff"
      active-text-color="#409EFF"
    >
      <!-- 一级菜单 -->
      <el-submenu :index="item.id + ''" v-for="item in menulist" :key="item.id">
        <!-- 一级菜单区域 -->
        <template slot="title">
          <i :class="iconsObj[item.id]"></i>
          <span>{{ item.authName }}</span>
        </template>
        <!-- 二级菜单 -->
        <el-menu-item
          :index="`/${subItem.path}`"
          v-for="subItem in item.children"
          :key="subItem.id"
        >
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>{{ subItem.authName }}</span>
          </template>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </el-aside>
</template>

<script>
import { getMenus } from '@/api/auth'
export default {
  name: 'vAside',
  data() {
    return {
      isCollapse: false, // 是否折叠
      menulist: [], //菜单列表
      iconsObj: {
        '125': 'iconfont icon-user',
        '103': 'iconfont icon-tijikongjian',
        '101': 'iconfont icon-shangpin',
        '102': 'iconfont icon-danju',
        '145': 'iconfont icon-baobiao'
      }
    }
  },
  methods: {
    // 点击按钮，切换菜单的折叠与展开
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
    },
    async getMenusList() {
      let [err, res] = await getMenus()
      if (err) {
        console.log(err)
        return
      }
      console.log(res)
      this.menulist = res.data
    }
  },
  mounted() {
    this.getMenusList()
  },
  components: {}
}
</script>
<style lang="less" scoped>
/* @import url(); 引入css类 */
.el-menu {
  border: none;
}
.iconfont {
  margin-right: 10px;
}
.toggle-button {
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>
