<!-- 商品分类 -->
<template>
  <div>
    <!-- 面包屑导航 -->
    <crumbs :crumbList="crumbList"></crumbs>
    <!-- 卡片视图 -->
    <el-card>
      <el-row>
        <el-col>
          <el-button type="primary" @click="showEditCateDialog('add')">添加分类</el-button>
        </el-col>
      </el-row>
      <!-- 表格 -->
      <tree-table
        class="tree-table"
        :data="catelist"
        :columns="columns"
        show-index
        index-text="#"
        border
        :show-row-hover="false"
        :selection-type="false"
        :expand-type="false"
      >
        <!-- 是否有效 -->
        <template slot="isok" slot-scope="scope">
          <i
            class="el-icon-success"
            v-if="scope.row.cat_deleted === false"
            style="color: lightgreen;"
          ></i>
          <i class="el-icon-error" v-else style="color: red;"></i>
        </template>
        <!-- 排序 -->
        <template slot="order" slot-scope="scope">
          <el-tag size="mini" v-if="scope.row.cat_level === 0">一级</el-tag>
          <el-tag type="success" size="mini" v-else-if="scope.row.cat_level === 1">二级</el-tag>
          <el-tag type="warning" size="mini" v-else>三级</el-tag>
        </template>
        <!-- 操作 -->
        <template slot="opt">
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            @click="showEditCateDialog('edit')"
            >编辑</el-button
          >
          <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
        </template>
      </tree-table>
      <!-- 分页区域 -->
      <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[3, 5, 15, 20]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
    <EditCateDialogVue :dialog="cateDialog" :editForm="editCateForm" />
  </div>
</template>

<script>
import { getCategories } from '@/api/goods.js'
import crumbs from '@/components/crumbs/index.vue'
import EditCateDialogVue from './component/EditCateDialog.vue'

export default {
  data() {
    return {
      crumbList: [
        {
          authName: '商品管理',
          id: 101,
          path: 'users'
        },
        {
          authName: '商品列表',
          id: 104,
          path: 'users'
        }
      ],
      // 商品分类的数据列表
      catelist: [],
      // 商品分类查询参数
      queryInfo: {
        type: 3,
        pagenum: 1,
        pagesize: 5
      },
      total: 0,
      // 为table指定列的定义
      columns: [
        {
          label: '分类名称',
          prop: 'cat_name',
          width: '200px'
        },
        {
          label: '是否有效',
          width: '100px',
          // 表示当前列定义为模板列
          type: 'template',
          // 表示当前这一列使用模板名称
          template: 'isok'
        },
        {
          label: '排序',
          width: '100px',
          // 表示当前列定义为模板列
          type: 'template',
          // 表示当前这一列使用模板名称
          template: 'order'
        },
        {
          label: '操作',
          width: '100px',
          // 表示当前列定义为模板列
          type: 'template',
          // 表示当前这一列使用模板名称
          template: 'opt'
        }
      ],
      // 分类弹框
      cateDialog: {
        title: '分类',
        dialogVisible: true,
        type: 'add'
      },
      // 分类表单
      editCateForm: {
        cat_name: ''
      }
    }
  },
  methods: {
    showEditCateDialog(type) {
      this.cateDialog.type = type
      if (type == 'edit') {
        return
      }
      this.cateDialog.dialogVisible = true
    },

    // 获取商品分类数据
    async getCateList() {
      let [err, res] = await getCategories(this.queryInfo)
      if (err) {
        console.log(err)
        return this.$message.error(err.meta.msg || '获取失败')
      }
      console.log(res)
      this.catelist = res.data.result
      this.total = res.data.total
    },
    // 监听 pageSize 发生改变
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize
      this.getCateList()
    },
    // 监听 页码值 发生改变
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage
      this.getCateList()
    }
  },
  mounted() {
    this.getCateList()
  },
  components: {
    crumbs,
    EditCateDialogVue
  }
}
</script>
<style lang="less" scoped>
/* @import url(); 引入css类 */
.tree-table {
  margin-top: 20px;
}
</style>
