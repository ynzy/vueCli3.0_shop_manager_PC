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
      <el-table-column type="expand"></el-table-column>
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
          <el-button size="mini" type="danger" icon="el-icon-delete">删除</el-button>
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
export default {
  props: {
    options: {
      type: Object,
      default: function() {
        return {
          type: 'many', // many 动态参数 only 静态属性
          isBtnDisabled: true // 是否可以操作按钮
        }
      }
    },
    paramsTable: Array
  },
  data() {
    return {}
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
</style>
