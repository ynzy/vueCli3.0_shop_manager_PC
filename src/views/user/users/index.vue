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
          <el-input
            v-model="queryInfo.query"
            @keyup.enter.native="getUserList"
            clearable
            @clear="getUserList"
            placeholder="请输入内容"
            class="input-with-select"
          >
            <el-button @click="getUserList" slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="showEditDialog('add')">添加用户</el-button>
        </el-col>
      </el-row>
      <!-- 用户列表区域 -->
      <el-table :data="userList" stripe border style="width: 100%">
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="username" label="姓名" width="180"></el-table-column>
        <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
        <el-table-column prop="mobile" label="电话"></el-table-column>
        <el-table-column prop="role_name" label="角色"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.mg_state"
              @change="userStateChanged(scope.row)"
              active-color="#13ce66"
              inactive-color="#ff4949"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180px">
          <template slot-scope="scope">
            <!-- 修改按钮 -->
            <el-tooltip effect="dark" content="修改" placement="top" :enterable="false">
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="mini"
                @click="showEditDialog('edit', scope.row.id)"
              ></el-button>
            </el-tooltip>
            <!-- 删除按钮 -->
            <el-tooltip effect="dark" content="删除" placement="top" :enterable="false">
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="removeUserById(scope.row.id)"
              ></el-button>
            </el-tooltip>
            <!-- 分配角色按钮 -->
            <el-tooltip effect="dark" content="分配角色" placement="top" :enterable="false">
              <el-button
                type="warning"
                icon="el-icon-setting"
                size="mini"
                @click="setRole(scope.row)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
    <edit-dialog-vue
      :dialog="editDialog"
      :editForm="editForm"
      @editUserInfo="editUserInfo"
    ></edit-dialog-vue>
  </div>
</template>

<script>
import {
  userList,
  userStateUpdate,
  addUser,
  getUser,
  editUser,
  deleteUser
} from '../../../api/user'
import crumbs from '@/components/crumbs/index.vue'
import EditDialogVue from './component/EditDialog.vue'

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
      ],
      queryInfo: {
        query: '',
        pagenum: 1, // 当前页数
        pagesize: 5 // 当前每页显示多少条数据
      },
      userList: [],
      total: 0,
      editDialog: {
        title: '用户',
        dialogVisible: false,
        type: 'add'
      },
      editForm: {} //添加编辑用户信息
    }
  },
  methods: {
    // 获取用户列表
    async getUserList() {
      let [err, res] = await userList(this.queryInfo)
      if (err) {
        console.log(err)
        this.$message.error('获取用户列表失败！')
        return
      }
      console.log(res)
      this.userList = res.data.users
      this.total = res.data.total
    },
    // 监听 switch 用户状态
    async userStateChanged(userInfo) {
      let [err, res] = await userStateUpdate({ id: userInfo.id, mg_state: userInfo.mg_state })
      if (err) {
        console.log(err)
        userInfo.mg_state = !userInfo.mg_state
        return this.$message.error('更新用户状态失败')
      }
      this.$message.success('更新用户状态成功')
    },
    // 显示编辑弹框
    showEditDialog(type, userId) {
      this.editDialog.type = type
      if (type == 'edit') {
        return this.getUserInfo(userId)
      }
      this.editForm = {
        username: 'user',
        password: '123456',
        email: '758922096@qq.com',
        mobile: '15899693536'
      }
      this.editDialog.dialogVisible = true
    },
    // 编辑用户
    editUserInfo(value) {
      const { type, from } = value
      // console.log(type, from)
      if (type == 'edit') {
        return this.handleEditUser(from)
      }
      this.handelAdduser(from)
    },
    // 通过id获取用户信息
    async getUserInfo(id) {
      let [err, res] = await getUser({ id })
      if (err) {
        console.log(err)
        return this.$message.error(err.meta.msg)
      }
      console.log(res.data)
      this.editForm = res.data
      this.editDialog.dialogVisible = true
    },
    // 添加用户
    async handelAdduser(from) {
      let [err, res] = await addUser(from)
      if (err) {
        console.log(err)
        return this.$message.error(err.meta.msg || '添加用户失败')
      }
      console.log(res)
      this.$message.success(res.meta.msg)
      this.getUserList()
      this.editDialog.dialogVisible = false
    },
    // 编辑用户
    async handleEditUser(from) {
      let [err, res] = await editUser(from)
      if (err) {
        console.log(err)
        return this.$message.error(err.meta.msg || '编辑用户失败')
      }
      console.log(res)
      this.$message.success(res.meta.msg)
      this.getUserList()
      this.editDialog.dialogVisible = false
    },
    // 删除用户
    async removeUserById(id) {
      // 弹窗询问是否删除
      const confirmResult = await this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      // 如果用户确认删除，则返回值为字符串 confirm
      // 如果用户取消了删除，则返回值为字符串 cancel
      console.log(confirmResult)
      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消删除')
      }
      let [err, res] = await deleteUser({ id })
      if (err) {
        console.log(err)
        return this.$message.error(err.meta.msg || '删除用户失败')
      }
      this.$message.success(res.meta.msg || '删除用户成功')
      this.getUserList()
    },
    // 监听 pageSize 发生改变
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize
      this.getUserList()
    },
    // 监听 页码值 发生改变
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage
      this.getUserList()
    }
  },
  mounted() {
    this.getUserList()
  },
  components: {
    crumbs,
    EditDialogVue
  }
}
</script>
<style lang="less" scoped>
/* @import url(); 引入css类 */
</style>
