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
            @clear="getOrderList"
          >
            <el-button slot="append" icon="el-icon-search" @click="getOrderList"></el-button>
          </el-input>
        </el-col>
      </el-row>
      <!-- table表格区域 -->
      <el-table :data="orderList" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="订单编号" prop="order_number"></el-table-column>
        <el-table-column label="订单价格" prop="order_price"></el-table-column>
        <el-table-column label="是否付款" prop="pay_status">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.pay_status === '1'">已付款</el-tag>
            <el-tag type="danger" v-else>未付款</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="是否发货" prop="is_send">
          <template slot-scope="scope">
            <template>
              {{ scope.row.is_send }}
            </template>
          </template>
        </el-table-column>
        <el-table-column label="下单时间" prop="create_time">
          <template slot-scope="scope">
            {{ scope.row.create_time | dateFormat }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template>
            <el-button size="mini" type="primary" icon="el-icon-edit" @click="showBox"></el-button>
            <el-button
              size="mini"
              type="success"
              icon="el-icon-location"
              @click="showProgressBox"
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
    <!-- 修改地址 -->
    <addressDialogVue :dialog="addressDialog" />
    <!-- 物流进度 -->
    <logisticsProgressVue :dialog="progressDialog" :logProgressInfo="logProgressInfo" />
  </div>
</template>

<script>
import crumbs from '@/components/crumbs/index.vue'
import { getOrders, getKuaidi } from '@/api/order'
import addressDialogVue from './component/addressDialog.vue'
import logisticsProgressVue from './component/logisticsProgress.vue'

export default {
  data() {
    return {
      crumbList: [
        {
          authName: '订单管理',
          id: 101,
          path: 'users'
        },
        {
          authName: '订单列表',
          id: 104,
          path: 'users'
        }
      ],
      orderList: [],
      total: 0,
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 10
      },
      addressDialog: {
        title: '修改地址',
        dialogVisible: false
      },
      progressDialog: {
        title: '物流进度',
        dialogVisible: false
      },
      logProgressInfo: []
    }
  },
  methods: {
    showBox() {
      this.addressDialog.dialogVisible = true
    },
    async showProgressBox() {
      let [err, res] = await getKuaidi({ id: 1106975712662 })
      if (err) {
        console.log(err)
        return this.$message.error(err.meta.msg || '查询失败')
      }
      console.log(res)
      // this.$message.success(res.meta.msg || '查询成功')
      this.logProgressInfo = res.data
      this.progressDialog.dialogVisible = true
    },
    async getOrderList() {
      let [err, res] = await getOrders(this.queryInfo)
      if (err) {
        console.log(err)
        return this.$message.error(err.meta.msg || '获取失败')
      }
      console.log(res)
      this.$message.success(res.meta.msg || '获取成功')
      this.orderList = res.data.goods
      console.log(this.orderList)

      this.total = res.data.total
    },
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize
      this.getOrderList()
    },
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage
      this.getOrderList()
    }
  },
  mounted() {
    this.getOrderList()
  },
  components: {
    crumbs,
    addressDialogVue,
    logisticsProgressVue
  }
}
</script>
<style lang="less" scoped>
/* @import url(); 引入css类 */
</style>
