<template>
  <div>
    <ViewTitle title="走访时长" :neednavTo="false" style="marginTop: 10px" />
    <visitData :visitData="visitData" />

    <ViewTitle
      title="所在业务部排行榜"
      describe="走访总时长"
      :message="'全部（' + (et_visit_time.length - 1) + '）'"
      style="marginTop: 10px"
      v-if="et_visit_time.length"
    />
    <RankingList :rankList="et_visit_time" />
    <ViewTitle
      title="已走访终端问题统计"
      style="marginTop: 10px"
    />
    <QuestionList :list="questionList" />
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      visitData: [],
      et_visit_time: [],
      questionList: []
    };
  },
  watch: {
    reportMessage(val) {
      this.visitData = [
        {
          value: val.es_summary.visit_total_time,
          name: "走访总时长",
          unit: "小时"
        },
        {
          value: val.es_summary.visit_number,
          name: "走访总数",
          unit: "次"
        },
        {
          value: val.es_summary.avg_time,
          name: "平均走访时长",
          unit: "min/次"
        }
      ];
      this.et_visit_time = val.et_visit_time;
      this.questionList = val.et_visit_quest;
    }
  },
  computed: {
    ...mapState({
      reportMessage: state => state.terminalVisitReportStore.reportMessage
    })
  }
};
</script>