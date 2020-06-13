<!--  -->
<template>
  <div>
    <el-dialog
      :title="'添加' + titleText"
      :visible.sync="dialog.dialogVisible"
      @close="handleClose"
      width="50%"
    >
      <el-form ref="editForm" :model="editForm" :rules="editFormRules" label-width="80px">
        <el-form-item :label="titleText" prop="attr_name">
          <el-input v-model="editForm.attr_name"></el-input>
        </el-form-item>
      </el-form>
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
    },
    editForm: {
      type: Object,
      default: function() {
        return {
          attr_name: ''
        }
      }
    }
  },
  data() {
    return {
      editFormRules: {
        attr_name: [{ required: true, message: '请输入参数名称', trigger: 'blur' }]
      }
    }
  },
  computed: {
    titleText() {
      return DescText[this.dialog.type]
    }
  },
  methods: {
    handleClose() {
      this.$refs.editForm.resetFields()
    }
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
