<!--  -->
<template>
  <div>
    <!-- 面包屑导航 -->
    <crumbs :crumbList="crumbList"></crumbs>
    <!-- 卡片视图区域 -->
    <el-card>
      <div id="main" style="width: 750px;height:400px;"></div>
    </el-card>
  </div>
</template>

<script>
import crumbs from '@/components/crumbs/index.vue'
import { getReport } from '@/api/report'
import echarts from 'echarts'
import _ from 'lodash'
export default {
  data() {
    return {
      crumbList: [
        {
          authName: '数据统计',
          id: 101,
          path: 'users'
        },
        {
          authName: '数据报表',
          id: 104,
          path: 'users'
        }
      ],
      defaultOptions: {
        title: {
          text: '用户来源'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#E9EEF3'
            }
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            boundaryGap: false
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ]
      },
      options: {}
    }
  },
  methods: {
    async getReportData() {
      let [err, res] = await getReport()
      if (err) {
        console.log(err)
        return this.$message.error(err.meta.msg || '获取失败')
      }
      console.log(res)
      this.$message.success(res.meta.msg || '获取成功')
      this.options = _.merge(res.data, this.defaultOptions)
      this.initEcharts()
    },
    initEcharts() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById('main'))
      // 绘制图表
      myChart.setOption(this.options)
    }
  },
  mounted() {
    this.getReportData()
  },
  components: {
    crumbs
  }
}
</script>
<style lang="less" scoped>
/* @import url(); 引入css类 */
</style>
