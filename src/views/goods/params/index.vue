<!--  -->
<template>
  <div>
    <!-- 面包屑导航 -->
    <crumbs :crumbList="crumbList"></crumbs>
    <el-card>
      <!-- 警告区域 -->
      <el-alert
        show-icon
        title="注意：只允许为第三级分类设置相关参数！"
        type="warning"
        :closable="false"
      >
      </el-alert>
      <!-- 选择商品分类区域 -->
      <el-row class="cat_opt">
        <el-col>
          <span>选择商品分类：</span>
          <!-- 选择商品分类的级联选择框 -->
          <el-cascader
            v-model="selectedKeys"
            :options="cateList"
            :props="cascaderProps"
            clearable
            @change="handleCateChanged"
          ></el-cascader>
        </el-col>
      </el-row>
      <!-- tab 页签区域 -->
      <el-tabs v-model="options.type" @tab-click="handleTabClick">
        <el-tab-pane label="动态参数" name="many">
          <paramsTableVue :options="options" :paramsTable="paramsTableData" />
        </el-tab-pane>
        <el-tab-pane label="静态属性" name="only">
          <paramsTableVue :options="options" :paramsTable="paramsTableData" />
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <editParamsDialogVue :dialog="editDialog" />
  </div>
</template>

<script>
import crumbs from '@/components/crumbs/index.vue'
import { getCategories, getCateAttributes } from '../../../api/goods'
import paramsTableVue from './component/paramsTable.vue'
import editParamsDialogVue from './component/editParamsDialog.vue'

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
          authName: '参数列表',
          id: 104,
          path: 'users'
        }
      ],
      // 商品分类列表
      cateList: [],
      // 指定级联选择器的配置对象
      cascaderProps: {
        value: 'cat_id',
        label: 'cat_name',
        children: 'children',
        expandTrigger: 'hover' // 次级菜单的展开方式
      },
      // 选中的父级分类的id数组
      selectedKeys: [],
      // 被激活的页签的名称
      options: {
        type: 'many',
        isBtnDisabled: true
      },
      paramsTableData: [],
      editDialog: {
        dialogVisible: false,
        type: 'many' // many 动态参数 only 静态属性
      }
    }
  },
  computed: {
    cateId() {
      if (this.selectedKeys.length === 3) {
        return this.selectedKeys[2]
      }
      return null
    }
  },
  methods: {
    // tab 页签点击事件的处理函数
    handleTabClick() {
      this.editDialog.dialogVisible = this.options.type
      this.getCateAttr()
    },
    // 级联选择框中项变化，会触发这个函数
    handleCateChanged() {
      // 如果长度不等于3则不是选择的第三级分类
      if (this.selectedKeys.length != 3) {
        this.selectedKeys = []
        this.options.isBtnDisabled = true
        return
      }
      // 证明选中的是三级分类
      // console.log(this.selectedKeys)
      this.options.isBtnDisabled = false
      this.getCateAttr()
    },
    // 根据所选分类的Id，和当前所处的面板，获取对应的参数
    async getCateAttr() {
      console.log(this.options.type)

      let id = Number(this.cateId)
      let sel = this.options.type
      let [err, res] = await getCateAttributes({ id, sel })
      if (err) {
        console.log(err)
        return this.$message.error(err.meta.msg || '获取参数列表失败')
      }
      this.$message.success(res.meta.msg || '获取成功')
      this.paramsTableData = res.data
    },
    async getParentCateList() {
      let [err, res] = await getCategories()
      if (err) {
        console.log(err)
        return this.$message.error(err.msg || '获取父级分类数据失败')
      }
      // console.log(res)
      this.$message.success(res.msg || '获取成功')
      this.cateList = res.data
    }
  },
  mounted() {
    this.getParentCateList()
  },
  components: {
    crumbs,
    paramsTableVue,
    editParamsDialogVue
  }
}
</script>
<style lang="less" scoped>
/* @import url(); 引入css类 */
.cat_opt {
  margin: 15px 0;
}

.el-tag {
  margin: 10px;
}

.input-new-tag {
  width: 120px;
}
</style>
