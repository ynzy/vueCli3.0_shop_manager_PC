<!--  -->
<template>
  <div>
    <el-dialog
      :title="titleText"
      :visible.sync="dialog.dialogVisible"
      @close="handleClose"
      width="50%"
    >
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog.dialogVisible = false">取 消</el-button>
        <el-button type="primary">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
const DescText = {
  many: '动态参数',
  only: '静态属性'
}
import Bus from '@/utils/bus'
export default {
  props: {
    dialog: {
      type: Object,
      default: function(value) {
        return {
          dialogVisible: false,
          type: 'many' // many 动态参数 only 静态属性
        }
      }
    }
  },
  data() {
    return {}
  },
  computed: {
    titleText() {
      return DescText[this.dialog.type]
    }
  },
  methods: {
    handleClose() {}
  },
  created() {
    //NOTE: 使用bus监听事件
    // Bus.$on('showParamsDialog', val => {})
    this.$root.Bus.$on('showParamsDialog', val => {
      console.log(val)
      this.dialog.dialogVisible = val
    })
  },
  mounted() {},
  components: {}
}
</script>
<style lang="less" scoped>
/* @import url(); 引入css类 */
</style>
