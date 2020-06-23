<template>
  <div>
    <visitData :visitData="visitData" style="margin: 10px 0" />
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      visitData: []
    };
  },
  watch: {
    reportMessage(val) {
      this.visitData = [
        {
          value: val.es_visit_summary.visit_total_time,
          name: "拜访总时长",
          unit: "小时"
        },
        {
          value: val.es_visit_summary.visit_time,
          name: "拜访总数",
          unit: "小时"
        },
        {
          value: val.es_visit_summary.avg_time,
          name: "平均拜访时长",
          unit: "min/次"
        }
      ];
    }
  },
  computed: {
    ...mapState({
      reportMessage: state => state.terminalVisitReportStore.reportMessage
    })
  }
};
</script>