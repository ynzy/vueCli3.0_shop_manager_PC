<!--  -->
<template>
  <div>
    <el-dialog
      :title="dialog.type == 'add' ? `添加${dialog.title}` : `修改${dialog.title}`"
      :visible.sync="dialog.dialogVisible"
      @close="handleClose"
      width="40%"
    >
      <!-- 添加分类的表单 -->
      <el-form ref="form" :model="editForm" :rules="editFormRules" label-width="80px">
        <el-form-item label="分类名称" prop="cat_name">
          <el-input v-model="editForm.cat_name"></el-input>
        </el-form-item>
        <el-form-item label="父级分类" v-if="dialog.type == 'add'">
          <!-- options指定数据源 -->
          <!-- props指定配置对象 -->
          <el-cascader
            v-model="selectedKeys"
            :options="parentCateList"
            :props="cascaderProps"
            clearable
            @change="parentCateChanged"
          ></el-cascader>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog.dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getCategories } from '../../../../api/goods'
export default {
  props: {
    dialog: {
      type: Object,
      default: function(value) {
        return {
          title: '提示',
          dialogVisible: false,
          type: 'add'
        }
      }
    },
    editForm: {
      type: Object,
      default: function(value) {
        return {
          cat_pid: 0, // 父级分类id  如果要添加1级分类，则父分类Id应该设置为  0
          cat_name: '', // 分类名称
          cat_level: 0 // 分类等级  0表示一级分类；1表示二级分类；2表示三级分类
        }
      }
    }
  },
  data() {
    return {
      editFormRules: {
        cat_name: [{ required: true, message: '请输入分类名称', trigger: 'blur' }]
      },
      // 父级分类列表
      parentCateList: [],
      // 指定级联选择器的配置对象
      cascaderProps: {
        value: 'cat_id',
        label: 'cat_name',
        children: 'children',
        checkStrictly: true,
        expandTrigger: 'hover' // 次级菜单的展开方式
      },
      // 选中的父级分类的id数组
      selectedKeys: []
    }
  },
  methods: {
    handleConfirm() {
      this.$refs.form.validate(valid => {
        if (!valid) return
        this.$emit('handleConfirm', this.editForm)
      })
    },
    // 选择项发生变化触发这个函数
    parentCateChanged() {
      // console.log(this.selectedKeys)
      // !查找父级分类id，分类等级
      // 如果selectedKeys 数组中的length>0,证明选中的父级分类
      // 否则，就说明没有选中任何父级分类
      if (this.selectedKeys.length > 0) {
        // 父级分类的id
        this.editForm.cat_pid = this.selectedKeys[this.selectedKeys.length - 1]
        // 为当前分类的等级赋值
        this.editForm.cat_level = this.selectedKeys.length
        return
      }
      this.editForm.cat_pid = 0
      this.editForm.cat_level = 0
    },
    // 获取父级分类列表
    async getParentCateList() {
      let [err, res] = await getCategories({ type: 2 })
      if (err) {
        console.log(err)
        return this.$message.error(err.message || '获取父级分类数据失败')
      }
      // console.log(res)
      this.$message.success(res.message || '获取成功')
      this.parentCateList = res.data
    },
    handleClose() {
      this.$refs.form.resetFields()
      this.selectedKeys = []
      this.editForm.cat_pid = 0
      this.editForm.cat_level = 0
    }
  },
  mounted() {
    this.getParentCateList()
  },
  components: {}
}
</script>
<style lang="less" scoped>
/* @import url(); 引入css类 */
.el-cascader {
  width: 100%;
}
</style>
