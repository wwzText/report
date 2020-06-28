<template>
  <div>
    <visitData :visitData="visitData" style="margin: 10px 0" />
    <ViewTitle title="已走访经销商数" :neednavTo="false" style="marginTop: 10px" />
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
          value: val.es_summary.visit_number,
          name: "走访家数",
          unit: "家"
        },
        {
          value: val.es_summary.question_number,
          name: "有问题经销商数"
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