<!--  -->
<template>
  <div>
    <!-- 面包屑导航 -->
    <crumbs :crumbList="crumbList"></crumbs>
    <!-- 卡片视图 -->
    <el-card>
      <el-row>
        <!-- 添加角色 -->
        <el-col>
          <el-button type="primary">添加角色</el-button>
        </el-col>
      </el-row>
      <el-table :data="roleList" border stripe>
        <!-- 展开列 -->
        <el-table-column type="expand">
          <template slot-scope="scope">
            <RolePrivilegesVue :role-privileges="scope.row" />
          </template>
        </el-table-column>
        <!-- 索引列 -->
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="roleName" label="角色名称"></el-table-column>
        <el-table-column prop="roleDesc" label="角色描述"></el-table-column>
        <el-table-column label="操作" width="300">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" icon="el-icon-edit">编辑</el-button>
            <el-button size="mini" type="danger" icon="el-icon-delete">删除</el-button>
            <el-button
              size="mini"
              type="warning"
              icon="el-icon-setting"
              @click="showSetRightDialog(scope.row)"
              >分配权限</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import crumbs from '@/components/crumbs/index.vue'
import { getRoles } from '../../../api/power'
import RolePrivilegesVue from './component/RolePrivileges.vue'

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
      ],
      // 所有角色列表数据
      roleList: []
    }
  },
  methods: {
    async getRoleList() {
      let [err, res] = await getRoles()
      if (err) {
        console.log(err)
        return this.$message.error(err.meta.msg || '获取角色列表失败')
      }
      // console.log(res)
      this.$message.success(res.meta.msg)
      this.roleList = res.data
    }
  },
  mounted() {
    this.getRoleList()
  },
  components: {
    crumbs,
    RolePrivilegesVue
  }
}
</script>
<style lang="less" scoped>
/* @import url(); 引入css类 */
</style>
