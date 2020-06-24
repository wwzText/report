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
                value: val.es_summary.visit_number,
                name: "走访家数",
                unit: '家'
            }, {
                value: val.es_summary.question_number,
                name: "有问题经销商数",
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