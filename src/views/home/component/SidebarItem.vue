<!--  -->
<template>
  <div>
    <template v-if="!item.children.length">
      <!-- <pre>{{ item }}</pre> -->
      <el-menu-item :index="`/${item.path}`" @click="saveNavState(`/${item.path}`)">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>{{ item.authName }}</span>
        </template>
      </el-menu-item>
    </template>
    <template v-else>
      <!-- <pre>{{ item }}</pre> -->
      <el-submenu :index="item.id + ''">
        <template slot="title">
          <i :class="iconsObj[item.id]"></i>
          <span>{{ item.authName }}</span>
        </template>
        <sidebar-item
          v-for="(itemChild, itemChildIndex) in item.children"
          :item="itemChild"
          :key="itemChildIndex"
        />
      </el-submenu>
    </template>
  </div>
</template>

<script>
export default {
  name: 'SidebarItem',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      iconsObj: {
        '125': 'iconfont icon-user',
        '103': 'iconfont icon-tijikongjian',
        '101': 'iconfont icon-shangpin',
        '102': 'iconfont icon-danju',
        '145': 'iconfont icon-baobiao',
        '437': 'iconfont icon-baobiao',
        '438': 'iconfont icon-baobiao'
      }
    }
  },
  methods: {
    // 保存链接的激活状态
    saveNavState(activePath) {
      this.$sessionStorage.set('activePath', activePath)
      this.activePath = activePath
    }
  },
  mounted() {},
  components: {}
}
</script>
<style lang="less" scoped>
/* @import url(); 引入css类 */
</style>
