<!-- 角色权限列表 -->
<template>
  <div>
    <div v-if="rolePrivileges.children.length">
      <el-row
        class="flex_align_center"
        :class="['bd-bottom', { 'bd-top': i1 == 0 }]"
        v-for="(item1, i1) in rolePrivileges.children"
        :key="i1"
      >
        <!-- 渲染一级权限 -->
        <el-col :span="5">
          <el-tag closable @close="removeRightById(rolePrivileges, item1.id)">
            {{ item1.authName }}
          </el-tag>
          <i class="el-icon-caret-right"></i>
        </el-col>
        <!-- 渲染二级三级权限 -->
        <el-col :span="19">
          <!-- 通过for循环 嵌套渲染二级权限 -->
          <el-row
            class="flex_align_center"
            :class="[i2 == 0 ? '' : 'bd-top']"
            v-for="(item2, i2) in item1.children"
            :key="i2"
          >
            <el-col :span="6">
              <el-tag closable @close="removeRightById(rolePrivileges, item2.id)" type="success">
                {{ item2.authName }}
              </el-tag>
              <i class="el-icon-caret-right"></i>
            </el-col>
            <el-col :span="18">
              <el-tag
                v-for="(item3, i3) in item2.children"
                :key="i3"
                type="warning"
                closable
                @close="removeRightById(rolePrivileges, item3.id)"
              >
                {{ item3.authName }}
              </el-tag>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <div v-else>该角色暂无权限，请进行配置</div>
    <!-- <pre>{{ rolePrivileges.children }}</pre> -->
  </div>
</template>

<script>
import { deleteRolesRights } from '../../../../api/power'
export default {
  props: {
    rolePrivileges: Object
  },
  data() {
    return {}
  },
  methods: {
    // 根据id删除对应的权限
    async removeRightById(role, rightId) {
      // 弹框确定是否要删除
      let confirmResult = await this.$confirm('此操作将删除该权限, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      console.log(confirmResult != 'confirm')
      if (confirmResult != 'confirm') return this.$message.info('取消了删除')
      let [err, res] = await deleteRolesRights({ roleId: role.id, rightId })
      if (err) {
        console.log(err)
        return this.$message.error(err.meta.msg || '删除失败')
      }
      // console.log(res)
      // this.$message.success('删除成功')
      // todo:原理是什么？
      // 把返回的数据，重新赋值给role.children，可以做到静默刷新数据
      role.children = res.data
    }
  },
  mounted() {
    console.log(this.rolePrivileges)
  },
  components: {}
}
</script>
<style lang="less" scoped>
/* @import url(); 引入css类 */
.flex_align_center {
  display: flex;
  align-items: center;
}
.el-tag {
  margin: 7px;
}
.bd-top {
  border-top: 1px solid #eee;
}
.bd-bottom {
  border-bottom: 1px solid #eee;
}
</style>
