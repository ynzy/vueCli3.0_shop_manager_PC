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
      :default-active="activePath"
    >
      <!-- 一级菜单 -->
      <!-- <el-submenu :index="item.id + ''" v-for="item in menulist" :key="item.id">
         一级菜单区域 
        <template slot="title">
          <i :class="iconsObj[item.id]"></i>
          <span>{{ item.authName }}</span>
        </template>
         二级菜单
        <el-menu-item
          :index="`/${subItem.path}`"
          v-for="subItem in item.children"
          :key="subItem.id"
          @click="saveNavState(`/${subItem.path}`)"
        >
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>{{ subItem.authName }}</span>
          </template>
        </el-menu-item>
      </el-submenu> -->
      <!-- 一级菜单 -->
      <!--  <el-submenu :index="item.id + ''" v-for="item in menulist2" :key="item.id">
        <template slot="title">
          <i :class="iconsObj[item.id]"></i>
          <span>{{ item.authName }}</span>
        </template>
        <el-menu-item
          :index="`/${subItem.path}`"
          v-for="subItem in item.children"
          :key="subItem.id"
          @click="saveNavState(`/${subItem.path}`)"
        >
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>{{ subItem.authName }}</span>
          </template>
        </el-menu-item>
      </el-submenu> -->
      <SidebarItem v-for="item in menulist" :item="item" :key="item.path" />
      <SidebarItem v-for="item in menulist2" :item="item" :key="item.path" />
    </el-menu>
  </el-aside>
</template>

<script>
import { getMenus } from '@/api/auth'
import SidebarItem from './SidebarItem'
export default {
  name: 'vAside',
  data() {
    return {
      isCollapse: false, // 是否折叠
      menulist: [], //菜单列表
      menulist2: [
        {
          id: 437,
          authName: '其他功能',
          path: 'orther',
          children: [
            { id: 438, authName: '富文本', path: 'richText', children: [], order: null },
            { id: 439, authName: '微信登录', path: 'wxLogin', children: [], order: null }
          ],
          order: 1
        },
        {
          id: 438,
          authName: '更多功能',
          path: 'more',
          children: [],
          order: 1
        }
      ],
      iconsObj: {
        '125': 'iconfont icon-user',
        '103': 'iconfont icon-tijikongjian',
        '101': 'iconfont icon-shangpin',
        '102': 'iconfont icon-danju',
        '145': 'iconfont icon-baobiao',
        '437': 'iconfont icon-baobiao',
        '438': 'iconfont icon-baobiao'
      },
      // 被激活的链接地址
      activePath: ''
    }
  },
  mounted() {
    this.getMenusList()
    this.activePath = this.$sessionStorage.get('activePath')
  },
  methods: {
    // 保存链接的激活状态
    saveNavState(activePath) {
      this.$sessionStorage.set('activePath', activePath)
      this.activePath = activePath
    },
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
      // console.log(res)
      this.menulist = res.data
    }
  },
  components: {
    SidebarItem
  }
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
