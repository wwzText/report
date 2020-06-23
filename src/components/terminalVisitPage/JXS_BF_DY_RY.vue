<template>
  <div>
    <ViewTitle title="基础数据" :neednavTo="false" style="marginTop: 10px" />
    <visitData :visitData="visitData" />
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
          value: val.es_summary.visit_number,
          name: "拜访总数",
          unit: "家"
        },
        {
          value: val.es_summary.question_number,
          name: "有问题经销商数",
          unit: "家"
        }
      ];
      this.questionList = val.et_visit_quest;
      console.log(this.questionList)
    }
  },
  computed: {
    ...mapState({
      reportMessage: state => state.terminalVisitReportStore.reportMessage
    })
  }
};
</script>