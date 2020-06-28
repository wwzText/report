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
          value: val.es_summary.visit_number,
          name: "走访总数",
          unit: "家"
        },
        {
          value: val.es_summary.ave_number,
          name: "日均走访数",
          unit: "家/人"
        },
        {
          value: val.es_summary.question_number,
          name: "有问题经销商数",
          unit: "家"
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