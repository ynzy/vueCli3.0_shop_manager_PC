<!--  -->
<template>
  <div>
    <el-dialog
      :title="dialog.title"
      :visible.sync="dialog.dialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <!-- 树形控件 -->
      <el-tree
        :data="rightsList"
        :props="treeProps"
        show-checkbox
        node-key="id"
        :default-checked-keys="defaultKeys"
        :default-expand-all="true"
      ></el-tree>

      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCancle">取 消</el-button>
        <el-button type="primary" @click="dialog.dialogVisible = false">确 定</el-button>
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
    rightsList: Array, //权限列表
    role: Object //角色信息
  },
  data() {
    return {
      // 树形控件配置对象
      treeProps: {
        children: 'children',
        label: 'authName'
      },
      // 默认被选中节点的id组合
      defaultKeys: []
    }
  },
  watch: {
    role(val, oldVal) {
      this.getLeafKeys(val, this.defaultKeys)
    }
  },
  methods: {
    // 为角色分配权限
    allotRights() {},
    handleClose(done) {
      this.defaultKeys = []
      done()
    },
    handleCancle() {
      this.defaultKeys = []
      this.dialog.dialogVisible = false
    },
    // 通过递归形式，获取角色下所有三级权限的id，并保存到rightsList中
    getLeafKeys(node, arr) {
      // 如果当前node节点不包含children属性，则是三级节点
      if (!node.children) {
        return arr.push(node.id)
      }
      node.children.forEach(item => {
        this.getLeafKeys(item, arr)
      })
    }
  },
  mounted() {},
  components: {}
}
</script>
<style lang="less" scoped>
/* @import url(); 引入css类 */
</style>
