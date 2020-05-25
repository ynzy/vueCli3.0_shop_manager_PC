<!-- 面包屑导航 -->
<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item v-for="crumb in crumbList" :key="crumb.id">
        {{ crumb.authName }}
      </el-breadcrumb-item>
      <!-- <el-breadcrumb-item>活动列表</el-breadcrumb-item> -->
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  name: 'crumbs',
  props: {
    crumbList: Array
  },
  data() {
    return {}
  },
  methods: {},
  mounted() {},
  components: {}
}
</script>
<style lang="less" scoped>
/* @import url(); 引入css类 */
.el-breadcrumb {
  margin-bottom: 15px;
  font-size: 12px;
}
</style>
