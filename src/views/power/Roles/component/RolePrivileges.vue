<!-- 角色权限列表 -->
<template>
  <div>
    <div v-if="rolePrivileges.children.length">
      <el-row
        :class="['bd-bottom', { 'bd-top': i1 == 0 }]"
        v-for="(item1, i1) in rolePrivileges.children"
        :key="i1"
      >
        <!-- 渲染一级权限 -->
        <el-col :span="5">
          <el-tag>{{ item1.authName }}</el-tag>
          <i class="el-icon-caret-right"></i>
        </el-col>
        <!-- 渲染二级三级权限 -->
        <el-col :span="19"></el-col>
      </el-row>
    </div>
    <div v-else>该角色暂无权限，请进行配置</div>
    <!-- <pre>{{ rolePrivileges.children }}</pre> -->
  </div>
</template>

<script>
export default {
  props: {
    rolePrivileges: Object
  },
  data() {
    return {}
  },
  methods: {},
  mounted() {
    console.log(this.rolePrivileges)
  },
  components: {}
}
</script>
<style lang="less" scoped>
/* @import url(); 引入css类 */
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
