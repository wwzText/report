<template>
  <div>
    <visitData :visitData="visitMessage" />
    <ViewTitle title="Ta的拜访计划" message="全部（10）" style="marginTop: 10px;" />
    <planList :planList="planList" />
  </div>
</template>

<script>
import visitData from "./../visitData";
import planList from "./../planList";
import { mapState } from "vuex";
export default {
  components: {
    visitData,
    planList
  },
  data() {
    return {
      visitMessage: [],
      planList: [
        {
          planName: "计划标题",
          planTime: "12月1日-12月10日",
          actualNum: 10,
          planNum: 20
        },
        {
          planName: "计划标题",
          planTime: "12月1日-12月10日",
          actualNum: 10,
          planNum: 20
        },
        {
          planName: "计划标题",
          planTime: "12月1日-12月10日",
          actualNum: 10,
          planNum: 20
        }
      ]
    };
  },
  watch: {
    reportMessage(val) {
      let es_summary = val.es_summary;
      this.visitMessage = [
         {
          dataData: `${es_summary.plan_rate || 0}%`,
          dataTitle: "计划完成率"
        },
        {
          dataData: es_summary.plan_percent || 0,
          dataTitle: "计划完成占比"
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

<style lang="less" scoped>
</style>