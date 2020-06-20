<!--  -->
<template>
  <div>
    <el-dialog
      :title="dialog.title"
      :visible.sync="dialog.dialogVisible"
      @close="handleClose"
      width="50%"
    >
      <!-- 时间线 -->
      <el-timeline>
        <el-timeline-item
          v-for="(activity, index) in logProgressInfo"
          :key="index"
          :timestamp="activity.time"
        >
          {{ activity.context }}
        </el-timeline-item>
      </el-timeline>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    dialog: {
      type: Object,
      default: function(value) {
        return {
          title: '物流进度',
          dialogVisible: false
        }
      }
    },
    logProgressInfo: Array
  },
  data() {
    return {}
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
