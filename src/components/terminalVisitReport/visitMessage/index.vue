<template>
  <div>
    <ViewTitle
      :title="dataMessage.title"
      style="marginTop: 10px; marginBottom: 1px"
      :neednavTo="false"
    />
    <visitData :visitData="dataMessage.list" />
    <ViewTitle
      title="所在工作站排行榜"
      :describe="'日均' + reportStr +'家数'"
      message="全部"
      style="marginTop: 10px; marginBottom: 1px"
    />
    <ViewTitle v-if="reportType=='ZF'" title="已走访终端问题统计" :neednavTo="false"></ViewTitle>
  </div>
</template>

<script>
import visitData from "./../visitData";
import { mapState } from "vuex";
export default {
  components: {
    visitData
  },
  data() {
    return {
      visitMessage: []
    };
  },
  
  computed: {
    ...mapState({
      reportMessage: state => state.terminalVisitReportStore.reportMessage,
      reportType: state => state.terminalVisitReportStore.reportType,
      headerMessage: state => state.terminalVisitReportStore.headerMessage
    }),
    reportStr() {
      switch (this.reportType) {
        case "BF":
          return "拜访";
        case "ZF":
          return "走访";
        case "DC":
          return "督查";
      }
    }
  },
  watch: {
    reportMessage(val) {
      let es_summary = val.es_summary;
      if (this.reportType !== "DC") {
        this.visitMessage = [
          {
            dataData: es_summary.visit_total_time,
            dataUnit: "小时",
            dataTitle: `${this.reportType == "BF" ? "拜访" : "走访"}总时长`
          },
          {
            dataData: es_summary.visit_time,
            dataUnit: "次",
            dataTitle: `${this.reportType == "BF" ? "拜访" : "走访"}次数`
          },
          {
            dataData: es_summary.avg_time,
            dataUnit: "min/次",
            dataTitle: `平均${this.reportType == "BF" ? "拜访" : "走访"}时长`
          }
        ];
      }
    },
    reportType(val) {
      switch (val) {
        case "BF":
          this.reportStr = "拜访";
          break;
        case "ZF":
          this.reportStr = "走访";
          break;
        case "DC":
          this.reportStr = "督查";
          break;
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import url("./index.less");
</style>