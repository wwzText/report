<template>
  <div>
    <ViewTitle title="管辖工作站直属管理员统计数据" :neednavTo="false" style="marginTop: 10px" />
    <visitData :visitData="visitData" />

    <ViewTitle
      title="已走访终端问题统计"
      style="marginTop: 10px"
      :neednavTo="false"
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
          unit: "家/人"
        },
        {
          value: val.es_summary.avg_time,
          name: "平均走访时长",
          unit: "min/次"
        }
      ];
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