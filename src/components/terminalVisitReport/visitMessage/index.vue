<template>
  <div>
    <ViewTitle title="拜访时长" style="marginTop: 10px; marginBottom: 1px" :neednavTo="false" />
    <visitData :visitData="visitMessage" />
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
import { mapState } from 'vuex';
export default {
  components: {
    visitData
  },
  data() {
    return {
      visitMessage: [],
    };
  },
  computed: {
    ...mapState({
      es_summary: state => state.terminalVisitReportStore.es_summary
    })
  },
  watch: {
    es_summary(val) {
      this.visitMessage = [
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