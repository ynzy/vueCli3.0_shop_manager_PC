<!--  -->
<template>
  <div>
    <!-- 面包屑导航 -->
    <crumbs :crumbList="crumbList"></crumbs>
  </div>
</template>

<script>
import crumbs from '@/components/crumbs/index.vue'
export default {
  data() {
    return {
      crumbList: [
        {
          authName: '权限管理',
          id: 103,
          path: 'rights'
        },
        {
          authName: '角色列表',
          id: 111,
          path: 'roles'
        }
      ]
    }
  },
  methods: {},
  mounted() {},
  components: {
    crumbs
  }
}
</script>
<style lang="less" scoped>
/* @import url(); 引入css类 */
</style>
