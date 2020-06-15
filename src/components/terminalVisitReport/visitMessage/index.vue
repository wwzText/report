<template>
  <div>
    <ViewTitle title="拜访时长" style="marginTop: 10px; marginBottom: 1px" :neednavTo="false" />
    <visitData :visitData="visitData" />
    <ViewTitle
      title="所在工作站排行榜"
      describe="日均拜访家数"
      message="全部"
      style="marginTop: 10px; marginBottom: 1px"
    />
  </div>
</template>

<script>
import visitData from "./../visitData";
export default {
  components: {
    visitData
  },
  props: {
    headerMessage: Object
  },
  data() {
    return {
      visitData: [], //
    };
  },
  watch: {
    headerMessage(val) {
      this.visitData = [
        {
          dataData: val.visit_total_time,
          dataUnit: "小时",
          dataTitle: "总拜访时长"
        },
        {
          dataData: val.visit_time,
          dataUnit: "次",
          dataTitle: "拜访次数"
        },
        {
          dataData: val.avg_time,
          dataUnit: "min/次",
          dataTitle: "平均拜访时长"
        }
      ];
    }
  }
};
</script>

<style lang="less" scoped>
@import url("./index.less");
</style>