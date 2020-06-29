<template>
  <div>
    <visitData :visitData="visitData" style="margin: 10px 0" />
    <ViewTitle v-if="et_total_visit_time.length" title="所在工作站排行榜" describe="拜访总时长" :message="'全部（' + (et_total_visit_time.length - 1) + ')'" />
    <RankingList :rankList="et_total_visit_time" />
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      visitData: [],
      et_total_visit_time: []
    };
  },
  watch: {
    reportMessage(val) {
        this.visitData = [
            {
                value: val.es_summary.visit_total_time,
                name: "拜访总时长",
                unit: '小时'
            }, {
                value: val.es_summary.visit_time,
                name: "拜访总数",
                unit: '次'
            }, {
                value: val.es_summary.avg_time,
                name: "平均拜访时长",
                unit: 'min/次'
            }
        ]
        this.et_total_visit_time = val.et_total_visit_time
    }
  },
  computed: {
    ...mapState({
      reportMessage: state => state.terminalVisitReportStore.reportMessage
    })
  }
};
</script>