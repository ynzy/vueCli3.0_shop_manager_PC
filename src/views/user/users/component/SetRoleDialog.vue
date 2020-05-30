<!--  -->
<template>
  <div>
    <el-dialog :title="dialog.title" :visible.sync="dialog.dialogVisible" width="50%">
      <div class="role_column">当前的用户：{{ userInfo.username }}</div>
      <div class="role_column">当前的角色：{{ userInfo.role_name }}</div>
      <div class="role_column">
        分配新角色：
        <el-select v-model="selectedRoleId" placeholder="请选择">
          <el-option
            v-for="item in roleList"
            :key="item.id"
            :label="item.roleName"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCancel">取 消</el-button>
        <el-button type="primary" @click="handleConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    dialog: {
      type: Object,
      default: function(value) {
        return {
          title: '提示',
          dialogVisible: false
        }
      }
    },
    userInfo: Object, // 用户信息
    roleList: Array // 角色列表
  },
  data() {
    return {
      // 选中的角色id
      selectedRoleId: ''
    }
  },
  methods: {
    handleConfirm() {
      if (!this.selectedRoleId) return this.$message.error('请选择要分配的角色')
      this.$emit('saveSoleInfo', { id: this.userInfo.id, rid: this.selectedRoleId })
    },
    handleCancel() {
      this.dialog.dialogVisible = false
    }
  },
  mounted() {},
  components: {}
}
</script>
<style lang="less" scoped>
/* @import url(); 引入css类 */
.role_column {
  margin-bottom: 10px;
  font-size: 16px;
}
</style>
