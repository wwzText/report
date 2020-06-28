<template>
  <div>
    <visitData :visitData="visitData" style="margin: 10px 0" />
    <ViewTitle title="已拜访经销商统计" :neednavTo="false" style="marginTop: 10px" />
    <QuestionList :list="questionList" />
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      visitData: [],
      questionList: []
    };
  },
  watch: {
    reportMessage(val) {
        this.visitData = [
            {
                value: val.es_visit_summary.visit_number,
                name: "拜访总数",
                unit: '家'
            }, {
                value: val.es_visit_summary.average_number,
                name: "日均拜访数",
                unit: '家/人'
            }, {
                value: val.es_visit_summary.question_number,
                name: "平均拜访时长",
                unit: '家'
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