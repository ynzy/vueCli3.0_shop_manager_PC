<!--  -->
<template>
  <div>
    <!-- 面包屑导航 -->
    <crumbs :crumbList="crumbList"></crumbs>
    <!-- 卡片视图 -->
    <el-card>
      <!-- 提示区 -->
      <el-alert title="添加商品信息" type="info" center show-icon :closable="false"> </el-alert>
      <!-- 步骤条 -->
      <!-- 字符串转数字 -->
      <el-steps :space="200" :active="activeIndex - 0" finish-status="success" align-center>
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
      <!-- tab栏区域 -->
      <el-form
        :model="editForm"
        :rules="editFormRules"
        ref="editFormRef"
        label-position="top"
        label-width="100px"
      >
        <el-tabs
          v-model="activeIndex"
          tab-position="left"
          :before-leave="beforeTabLeave"
          @tab-click="tabClicked"
        >
          <el-tab-pane label="基本信息" name="0">
            <el-form-item label="商品名称" prop="goods_name">
              <el-input v-model="editForm.goods_name" placeholder="请输入商品名称"></el-input>
            </el-form-item>
            <el-form-item label="商品价格" prop="goods_price">
              <el-input
                v-model="editForm.goods_price"
                type="number"
                placeholder="请输入商品价格"
              ></el-input>
            </el-form-item>
            <el-form-item label="商品重量" prop="goods_weight">
              <el-input v-model="editForm.goods_weight" placeholder="请输入商品重量"></el-input>
            </el-form-item>
            <el-form-item label="商品数量" prop="goods_number">
              <el-input
                v-model="editForm.goods_number"
                type="number"
                placeholder="请输入商品数量"
              ></el-input>
            </el-form-item>
            <el-form-item label="商品分类" prop="goods_cat">
              <!-- 选择商品分类的级联选择框 -->
              <el-cascader
                v-model="editForm.goods_cat"
                :options="cateList"
                :props="cascaderProps"
                clearable
                @change="handleCateChanged"
              ></el-cascader>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品参数" name="1">
            <!-- 渲染表单的item项 -->
            <el-form-item :label="item.attr_name" v-for="item in manyTableData" :key="item.attr_id">
              <el-checkbox-group v-model="item.attr_vals">
                <el-checkbox
                  :label="cb"
                  v-for="(cb, i) in item.attr_vals"
                  :key="i"
                  border
                ></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品属性" name="2">
            <!-- 渲染表单的item项 -->
            <el-form-item :label="item.attr_name" v-for="item in onlyTableData" :key="item.attr_id">
              <el-input v-model="item.attr_vals"></el-input>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品图片" name="3">
            <el-upload
              action=""
              :http-request="uploadSectionFile"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              list-type="picture"
            >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-tab-pane>
          <el-tab-pane label="商品内容" name="4">商品内容</el-tab-pane>
        </el-tabs>
      </el-form>
    </el-card>
    <!-- 图片预览 -->
    <el-dialog title="图片预览" :visible.sync="previewVisible" width="50%">
      <img :src="previewPath" alt="" style="width:100%;height:100%" />
    </el-dialog>
  </div>
</template>

<script>
import crumbs from '@/components/crumbs/index.vue'
import { getCategories, getCateAttributes } from '../../../api/goods'
import { uploadImg } from '@/api/upload'
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
          authName: '添加商品',
          id: 104,
          path: 'users'
        }
      ],
      activeIndex: '3',
      // 商品表单数据对象
      editForm: {
        goods_name: '', // 商品名称
        goods_price: '', // 价格
        goods_weight: '', // 重量
        goods_number: '', // 数量
        goods_cat: [1, 3, 6], // 以为','分割的分类列表
        pics: [], // 上传的图片临时路径（对象）
        attrs: [], // 商品的参数（数组），包含 动态参数 和 静态属性
        goods_introduce: '' // 介绍
      },
      // 表单校验规则
      editFormRules: {
        goods_name: [{ required: true, message: '请输入商品名称', trigger: 'blur' }],
        goods_price: [{ required: true, message: '请输入商品价格', trigger: 'blur' }],
        goods_weight: [{ required: true, message: '请输入商品重量', trigger: 'blur' }],
        goods_number: [{ required: true, message: '请输入商品数量', trigger: 'blur' }],
        goods_cat: [{ required: true, message: '请选择商品分类', trigger: 'blur' }]
      },
      // 商品分类列表
      cateList: [],
      // 指定级联选择器的配置对象
      cascaderProps: {
        value: 'cat_id',
        label: 'cat_name',
        children: 'children',
        expandTrigger: 'hover' // 次级菜单的展开方式
      },
      // 动态参数列表数据
      manyTableData: [],
      // 静态参数列表数据
      onlyTableData: [],
      previewPath: '', // 预览路径
      previewVisible: false //预览弹框
    }
  },
  computed: {
    // 分类id
    cateId() {
      if (this.editForm.goods_cat.length === 3) {
        return this.editForm.goods_cat[2]
      }
      return null
    }
  },
  methods: {
    // 覆盖默认的上传行为，自定义图片上传请求
    async uploadSectionFile(params) {
      //* 1. 图片处理
      const { file } = params
      const fileType = file.type //获取文件类型
      const isImage = fileType.indexOf('image') != -1 // 判断是否是图片类型
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        // 判断大小
        this.$message.error('上传图片的大小不能超过 2MB!')
        return Promise.reject()
      }
      if (!isImage) {
        // 文件格式
        this.$message.error('请选择图片文件！')
        return Promise.reject()
      }
      //* 2. 图片上传
      const fromData = new FormData()
      fromData.append('file', file)
      const [err, res] = await uploadImg(fromData)
      if (err) {
        console.log(err)
        return this.$message.error(err.meta.msg || '上传失败')
      }
      // console.log(res)
      this.$message.success(res.meta.msg || '上传成功')
      // 1. 拼接得到一个图片信息对象
      const pic = res.data.tmp_path
      // 2. 将图片信息对象，push到pics数组中
      this.editForm.pics.push({ pic })
      //* 3. 返回数据可以在组件on事件的response中捕获,比如：on-remove
      return res.data //
    },
    // 处理图片预览效果
    handlePreview(file) {
      this.previewPath = file.response.url
      this.previewVisible = true
    },
    // 处理移除图片的操作
    handleRemove(file) {
      //* 1. 获取将要删除的图片的临时路径
      const { tmp_path } = file.response
      //* 2. 从 pics 数组中，找到这个图片对应的索引值
      const i = this.editForm.pics.findIndex(item => item.pic == tmp_path)
      //* 3. 调用数组的splice方法，把图片信息对象，从pics数组中移除
      this.editForm.pics.splice(i, 1)
    },
    // 切换标签页之前的钩子
    beforeTabLeave(activeName, oldActiveName) {
      // console.log('即将离开的标签页名字是：' + oldActiveName)
      // console.log('即将进入的标签页名字是：' + activeName)
      if (oldActiveName === '0' && this.editForm.goods_cat.length !== 3) {
        this.$message.error('请先选择商品分类')
        return false
      }
    },
    tabClicked() {
      console.log(this.activeIndex)
      /*     if (this.activeIndex == 1) {
        // 访问动态参数面板
        this.getCateAttributesList()
      } */
      switch (this.activeIndex) {
        case '1':
          // 访问动态参数面板
          this.getCateAttributesList('many')
          break
        case '2':
          // 访问静态参数面板
          this.getCateAttributesList('only')
          break
        case '3':
          break
        case '4':
          break
        default:
          break
      }
    },
    async getCateAttributesList(sel) {
      let [err, res] = await getCateAttributes({ id: this.cateId, sel })
      if (err) {
        console.log(err)
        return this.$message.error(err.meta.msg || '获取数据失败')
      }
      console.log(res)
      // this.$message.success(res.meta.msg || '获取成功')
      if (sel == 'many') {
        res.data.forEach(item => {
          //* ''.split(',') -> [""]
          //* split分隔空字符串之后会出现空字符， 三元运算符防止数据渲染时出现空字符
          item.attr_vals = item.attr_vals ? item.attr_vals.split(',') : []
        })
        this.manyTableData = res.data
      } else if (sel == 'only') {
        this.onlyTableData = res.data
      }
    },
    // 级联选择框中项变化，会触发这个函数
    handleCateChanged() {
      // 如果长度不等于3则不是选择的第三级分类
      if (this.editForm.goods_cat.length != 3) {
        this.editForm.goods_cat = []
        return
      }
      // 证明选中的是三级分类
      // console.log(this.editForm.goods_cat)
      console.log(this.editForm.goods_cat)
    },
    // 获取商品分类列表
    async getCategoriesList() {
      let [err, res] = await getCategories({})
      if (err) {
        console.log(err)
        return this.$message.error(err.meta.msg || '获取商品分类数据失败')
      }
      console.log(res)
      // this.$message.success(res.meta.msg || '获取成功')
      this.cateList = res.data
    }
  },
  mounted() {
    this.getCategoriesList()
  },
  components: {
    crumbs
  }
}
</script>
<style lang="less" scoped>
/* @import url(); 引入css类 */
.el-steps {
  display: flex;
  justify-content: center;
}
.el-checkbox {
  margin: 0 10px 0 0 !important;
}
</style>
