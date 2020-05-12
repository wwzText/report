<template>
  <div>
    <div class="datachange-container" @click="changeDataType">
      <div :class="[dataType === 'month' ? 'datachange-isactive': 'datachange-ishide']">
        <span>按月份</span>
        <span class="iconfont report-jiaohuan"></span>
      </div>
      <div :class="[dataType === 'data' ? 'datachange-isactive': 'datachange-ishide']">
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
      default: "data"
    }
  },
  data() {
    return {
      dataType: this.timeType
    }
  },
  methods: {
    changeDataType() {
      this.dataType = this.dataType === 'data' ? 'month' : 'data';
      
    }
  }
};
</script>

<style lang="less" scoped>
@import url("./index.less");
</style>