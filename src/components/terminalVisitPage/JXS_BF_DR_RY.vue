<template>
  <div>
    <ViewTitle title="基础数据" :neednavTo="false" style="marginTop: 10px"/>
    <visitData :visitData="visitData" />
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
                name: "拜访总数",
                unit: '家'
            }, {
                value: val.es_summary.question_number,
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