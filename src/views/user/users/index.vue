<!--  -->
<template>
  <div>
    <!-- 面包屑导航 -->
    <crumbs :crumbList="crumbList"></crumbs>
    <!-- 卡片视图 -->
    <el-card class="box-card">
      <!-- 搜索与添加区域 -->
      <el-row :gutter="20">
        <el-col :span="10">
          <el-input placeholder="请输入内容" class="input-with-select">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary">添加用户</el-button>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import crumbs from '@/components/crumbs/index.vue'
export default {
  data() {
    return {
      crumbList: [
        {
          authName: '用户管理',
          id: 125,
          path: 'users'
        },
        {
          authName: '用户列表',
          id: 110,
          path: 'users'
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
