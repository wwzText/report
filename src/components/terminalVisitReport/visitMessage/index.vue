<template>
  <div>
    <ViewTitle :title="reportStr + '时长'" style="marginTop: 10px; marginBottom: 1px" :neednavTo="false" />
    <visitData :visitData="visitMessage" />
    <ViewTitle
      title="所在工作站排行榜"
      :describe="'日均' + reportStr +'家数'"
      message="全部"
      style="marginTop: 10px; marginBottom: 1px"
    />
    <ViewTitle
      v-if="reoprtType=='ZF'"
      title="已走访终端问题统计"
      :neednavTo="false"
    ></ViewTitle>

  </div>
</template>

<script>
import visitData from "./../visitData";
import { mapState } from 'vuex';
export default {
  components: {
    visitData
  },
  data() {
    return {
      visitMessage: [],
    };
  },
  computed: {
    ...mapState({
      reportMessage: state => state.terminalVisitReportStore.reportMessage,
      reoprtType: state => state.terminalVisitReportStore.reoprtType,
    }),
    reportStr() {
      switch(this.reoprtType) {
        case 'BF':
           return'拜访';
        case 'ZF':
          return '走访';
        case 'DC':
          return '督查';
      }
    }
  },
  watch: {
    reportMessage(val) {
      let es_summary = val.es_summary
      this.visitMessage = [
        {
          dataData: es_summary.visit_total_time,
          dataUnit: "小时",
          dataTitle: `${this.reoprtType == 'BF' ? '拜访' : '走访'}总时长`
        },
        {
          dataData: es_summary.visit_time,
          dataUnit: "次",
          dataTitle: `${this.reoprtType == 'BF' ? '拜访' : '走访'}次数`
        },
        {
          dataData: es_summary.avg_time,
          dataUnit: "min/次",
          dataTitle: `平均${this.reoprtType == 'BF' ? '拜访' : '走访'}时长`
        }
      ];
    },
    reoprtType(val) {
      switch(val) {
        case 'BF':
          this.reportStr = '拜访';
          break;
        case 'ZF':
          this.reportStr = '走访';
          break;
        case 'DC':
          this.reportStr = '督查';
          break;
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import url("./index.less");
</style>