<template>
  <div>
    <div>
      <div v-show="timeType === 'month'">
        <span>按月份</span>
        <span class="iconfont report-jiaohuan"></span>
      </div>
      <div v-show="timeType === 'data'">
        <span>按日期</span>
        <span class="iconfont report-jiaohuan"></span>
      </div>
    </div>
    <div></div>
  </div>
</template>

<script>
export default {
    props: {
        timeType: {
            type: String,
            default: 'data'
        }
    }
}
</script>

<style lang="less" scoped>
@import url("./index.css");
</style>