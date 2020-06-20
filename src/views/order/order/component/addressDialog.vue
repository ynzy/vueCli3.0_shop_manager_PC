<!--  -->
<template>
  <div>
    <el-dialog
      :title="dialog.title"
      :visible.sync="dialog.dialogVisible"
      @close="handleClose"
      width="50%"
    >
      <el-form
        :model="addressForm"
        :rules="addressFormRules"
        ref="addressFormRef"
        label-width="100px"
      >
        <el-form-item label="省市区/县" prop="address1">
          <el-cascader
            v-model="addressForm.address1"
            :options="cityData"
            :props="cascaderProps"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="详细地址" prop="address2">
          <el-input v-model="addressForm.address2"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog.dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialog.dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// import cityData from './citydata.js'
import { regionDataPlus } from 'element-china-area-data'
export default {
  props: {
    dialog: {
      type: Object,
      default: function(value) {
        return {
          title: '修改地址',
          dialogVisible: false
        }
      }
    },
    addressForm: {
      type: Object,
      default: function(value) {
        return {
          address1: [],
          address2: ''
        }
      }
    }
  },
  data() {
    return {
      addressFormRules: {
        address1: [{ required: true, message: '请选择省市区县', trigger: 'blur' }],
        address2: [{ required: true, message: '请填写详细地址', trigger: 'blur' }]
      },
      cityData: regionDataPlus,
      cascaderProps: {
        /*  value: 'code',
        label: 'name', */
        expandTrigger: 'hover'
      }
    }
  },
  methods: {
    handleClose() {}
  },
  mounted() {},
  components: {}
}
</script>
<style lang="less" scoped>
/* @import url(); 引入css类 */
</style>
