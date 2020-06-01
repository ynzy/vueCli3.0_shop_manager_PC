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
    <!-- 分配权限弹框 -->
    <SetRightDialogVue
      :dialog="setRightDialog"
      :rightsList="rightsList"
      :role="role"
      @handleAllotRights="handleAllotRights"
    />
  </div>
</template>

<script>
import crumbs from '@/components/crumbs/index.vue'
import { getRoles, getRights, allotRights } from '../../../api/power'
import RolePrivilegesVue from './component/RolePrivileges.vue'
import SetRightDialogVue from './component/SetRightDialog.vue'

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
      roleList: [],
      role: {}, // 当前角色
      setRightDialog: {
        title: '分配权限',
        dialogVisible: false
      },
      rightsList: []
    }
  },
  methods: {
    async handleAllotRights(item) {
      let [err, res] = await allotRights({ roleId: this.role.id, rids: item.rids })
      if (err) {
        console.log(err)
        return this.$message.error(err.meta.msg || '更新权限失败')
      }
      this.$message.success('分配权限成功')
      this.getRoleList()
      this.setRightDialog.dialogVisible = false
    },
    async getRoleList() {
      let [err, res] = await getRoles()
      if (err) {
        console.log(err)
        return this.$message.error(err.meta.msg || '获取角色列表失败')
      }
      // console.log(res)
      this.$message.success(res.meta.msg)
      this.roleList = res.data
    },
    // 展示分配权限弹框
    async showSetRightDialog(role) {
      // 在展示对话框之前，先获取到权限的树形结构数据
      let [err, res] = await getRights({ type: 'tree' })
      if (err) {
        console.log(err)
        return this.$message.error(err.meta.msg || '获取权限列表失败')
      }
      console.log(res)
      this.rightsList = res.data
      this.role = role
      this.setRightDialog.dialogVisible = true
    }
  },
  mounted() {
    this.getRoleList()
  },
  components: {
    crumbs,
    RolePrivilegesVue,
    SetRightDialogVue
  }
}
</script>
<style lang="less" scoped>
/* @import url(); 引入css类 */
</style>
