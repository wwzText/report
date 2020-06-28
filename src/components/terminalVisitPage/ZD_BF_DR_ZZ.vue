<template>
  <div>
    <visitData :visitData="visitData" style="margin: 10px 0" />
    <ViewTitle title="同级排行榜" describe="拜访总时长" style="margin: 10px 0" :message="'全部（' + (et_rank_sameorg_egvtimes.length - 1) + ')'" />
    <RankingList :rankList="et_rank_sameorg_egvtimes" />
    <ViewTitle title="下级排行榜" describe="拜访总时长" style="margin: 10px 0" :message="'全部（' + (et_rank_suborg_egvtimes.length - 1) + ')'" />
    <RankingList :rankList="et_rank_suborg_egvtimes" />
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      visitData: [],
      et_rank_sameorg_egvtimes: [],
      et_rank_suborg_egvtimes: []
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
          unit: "次"
        },
        {
          value: val.es_visit_summary.avg_time,
          name: "平均拜访时长",
          unit: "min/次"
        }
      ];
      this.et_rank_sameorg_egvtimes = val.et_rank_sameorg_egvtimes;
      this.et_rank_suborg_egvtimes = val.et_rank_suborg_egvtimes;
    }
  },
  computed: {
    ...mapState({
      reportMessage: state => state.terminalVisitReportStore.reportMessage
    })
  }
};
</script>