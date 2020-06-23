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
                value: val.es_visit_summary.visit_number,
                name: "拜访总数",
                unit: '家'
            }, {
                value: val.es_visit_summary.average_number,
                name: "人均拜访数",
                unit: '家/人'
            }, {
                value: val.es_visit_summary.question_number,
                name: "有问题经销商数",
                unit: '家'
            }
        ]
    }
  },
  computed: {
    ...mapState({
      reportMessage: state => state.terminalVisitReportStore.reportMessage
    })
  }
};
</script>