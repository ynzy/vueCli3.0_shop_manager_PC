<!--  -->
<template>
  <div>
    <!-- 操作按钮 -->
    <el-button
      :disabled="options.isBtnDisabled"
      type="primary"
      size="mini"
      @click="showEditDialog('add')"
    >
      {{ btnText }}
    </el-button>
    <!-- 动态表格参数 -->
    <el-table :data="paramsTable" border stripe>
      <!-- 展开行 -->
      <el-table-column type="expand">
        <template slot-scope="scope">
          <!-- 循环渲染tag标签 -->
          <el-tag
            v-for="(item, i) in scope.row.attr_vals"
            :key="i"
            closable
            @close="handleCloseTag(i, scope.row)"
          >
            {{ item }}
          </el-tag>
          <!-- 添加标签操作 -->
          <el-input
            class="input-new-tag"
            v-if="scope.row.inputVisible"
            v-model="scope.row.inputValue"
            ref="saveTagInput"
            size="small"
            @keyup.enter.native="handleInputConfirm(scope.row)"
            @blur="handleInputConfirm(scope.row)"
          >
          </el-input>
          <el-button v-else class="button-new-tag" size="small" @click="showInput(scope.row)"
            >+ New Tag</el-button
          >
        </template>
      </el-table-column>
      <el-table-column type="index"></el-table-column>
      <el-table-column :label="labelOne" prop="attr_name"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            icon="el-icon-edit"
            @click="showEditDialog('edit', scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
const DescText = {
  many: ['添加参数', '参数名称'],
  only: ['添加属性', '属性名称']
}
import Bus from '@/utils/bus'
import { putCateAttributes } from '../../../../api/goods'
export default {
  props: {
    options: {
      type: Object,
      default: function() {
        return {
          type: 'many', // many 动态参数 only 静态属性
          isBtnDisabled: true, // 是否可以操作按钮
          cateId: null //分类id
        }
      }
    },
    paramsTable: Array
  },
  data() {
    return {
      inputVisible: false, // 控制按钮与文本框的切换显示
      inputValue: '' // 文本框输入的内容
    }
  },
  computed: {
    btnText() {
      return DescText[this.options.type][0]
    },
    labelOne() {
      return DescText[this.options.type][1]
    }
  },
  methods: {
    // 显示输入框
    showInput(item) {
      item.inputVisible = true
      // 获取焦点
      // $nextTick 方法的作用，就是当页面上元素被重新渲染之后，才会指定回调函数中的代码
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    // 文本框失去焦点或按下了enter都会触发 添加标签
    handleInputConfirm(row) {
      // 用户输入不合法内容（多个空格）
      if (row.inputValue.trim().length === 0) {
        row.inputValue = ''
        row.inputVisible = false
        return
      }
      // 输入的内容，需要做后续处理
      row.attr_vals.push(row.inputValue.trim())
      row.inputVisible = false
      row.inputValue = ''
      this.saveAttrVals(row, 'add')
    },
    // 删除对应的参数可选项
    handleCloseTag(i, row) {
      let deleteArr = row.attr_vals.splice(i, 1)
      console.log(deleteArr)
      this.saveAttrVals(row, 'delete', deleteArr)
    },
    // 将对 attr_vals 保存到数据库
    async saveAttrVals(row, handleType, deleteArr) {
      let params = {
        id: this.options.cateId,
        attrId: row.attr_id,
        attr_name: row.attr_name,
        attr_sel: this.options.type,
        attr_vals: row.attr_vals.join(',')
      }
      let [err, res] = await putCateAttributes(params)
      if (err) {
        console.log(err)
        handleType == 'add' && row.attr_vals.pop()
        handleType == 'delete' && row.attr_vals.push(deleteArr[0])
        return this.$message.error(err.meta.msg || '操作失败')
      }
      console.log(res)
      this.$message.success(res.meta.msg || '保存成功')
    },
    // 删除操作
    handleDelete(val) {
      this.$emit('handleDelete', { attrId: val.attr_id })
    },
    showEditDialog(handleType, val) {
      let showData = {
        dialogVisible: true,
        handleType
      }
      if (val) {
        showData = Object.assign(showData, {
          attr_name: val.attr_name,
          attrId: val.attr_id
        })
      }
      console.log(showData)
      //NOTE: 使用bus发送事件
      //* 使用局部bus
      // Bus.$emit('showParamsDialog', true)
      //* 使用全局bus
      this.$root.Bus.$emit('showParamsDialog', showData)
    }
  },
  mounted() {},
  components: {}
}
</script>
<style lang="less" scoped>
/* @import url(); 引入css类 */
.el-tag {
  margin: 0 10px;
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
