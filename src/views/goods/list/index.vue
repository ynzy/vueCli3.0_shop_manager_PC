<!--  -->
<template>
  <div>
    <!-- 面包屑导航 -->
    <crumbs :crumbList="crumbList"></crumbs>
    <!-- 卡片视图区域 -->
    <el-card>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input
            placeholder="请输入内容"
            v-model="queryInfo.query"
            clearable
            @clear="getGoodsList"
          >
            <el-button slot="append" icon="el-icon-search" @click="getGoodsList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="goEditpage('add')">添加商品</el-button>
        </el-col>
      </el-row>
      <!-- table表格区域 -->
      <el-table :data="goodsList" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="商品名称" prop="goods_name"></el-table-column>
        <el-table-column label="商品价格(元)" prop="goods_price" width="95px"></el-table-column>
        <el-table-column label="商品重量" prop="goods_weight" width="70px"></el-table-column>
        <el-table-column label="创建时间" prop="add_time" width="140px">
          <template slot-scope="scope">
            {{ scope.row.add_time | dateFormat }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="130px">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="removeById(scope.row.goods_id)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        background
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import crumbs from '@/components/crumbs/index.vue'
import { queryGoodsList, deleteGoods } from '../../../api/goods'
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
      // 查询参数
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 10
      },
      goodsList: [],
      total: 0
    }
  },
  methods: {
    // 添加编辑商品
    goEditpage(type) {
      this.$router.push(`/goods/add`)
    },
    // 删除商品
    async removeById(id) {
      const confirmResult = await this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)

      if (confirmResult !== 'confirm') {
        return this.$message.info('已经取消删除！')
      }
      let [err, res] = await deleteGoods({ id })
      if (err) {
        console.log(err)
        return this.$message.error(err.meta.msg || '删除失败')
      }
      this.$message.success(res.meta.msg || '删除成功')
      // console.log(res)
      this.getGoodsList()
    },
    // 获取分页商品列表
    async getGoodsList() {
      let [err, res] = await queryGoodsList(this.queryInfo)
      if (err) {
        console.log(err)
        return this.$message.error(err.meta.msg || '获取失败')
      }
      console.log(res)
      // this.$message.success(res.meta.msg || '获取成功')
      this.goodsList = res.data.goods
      this.total = res.data.total
    },
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize
      this.getGoodsList()
    },
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage
      this.getGoodsList()
    }
  },
  mounted() {
    this.getGoodsList()
  },
  components: {
    crumbs
  }
}
</script>
<style lang="less" scoped>
/* @import url(); 引入css类 */
</style>
