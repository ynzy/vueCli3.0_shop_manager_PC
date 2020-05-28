<!--  -->
<template>
  <div>
    <!-- 面包屑导航 -->
    <crumbs :crumbList="crumbList"></crumbs>
    <!-- 卡片视图 -->
    <el-card>
      <el-table :data="rightsList" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="authName" label="权限名称"></el-table-column>
        <el-table-column prop="path" label="路径"></el-table-column>
        <el-table-column label="权限等级">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.level == 0">一级</el-tag>
            <el-tag v-else-if="scope.row.level == 1" type="success">二级</el-tag>
            <el-tag v-else type="“wranning”">三级</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import crumbs from '@/components/crumbs/index.vue'
import { getRights } from '@/api/power'
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
          authName: '权限列表',
          id: 112,
          path: 'roles'
        }
      ],
      // 权限列表
      rightsList: []
    }
  },
  methods: {
    async getRightsList() {
      let [err, res] = await getRights({ type: 'list' })
      if (err) {
        console.log(err)
        return this.$message.error(err.meta.msg || '获取权限列表失败')
      }
      // console.log(res)
      this.$message.success(res.meta.msg)
      this.rightsList = res.data
    }
  },
  mounted() {
    this.getRightsList()
  },
  components: {
    crumbs
  }
}
</script>
<style lang="less" scoped>
/* @import url(); 引入css类 */
</style>
