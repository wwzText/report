<template>
  <!-- 拜访效率 -->
  <div>
    <visitData :visitData="visitMessage" />
    <ViewTitle @click="visitTrend" title="当月拜访趋势" style="marginTop: 10px; marginBottom: 10px" />
    <ViewTitle title="所在工作站排行榜" @click="handleToRanking" describe="日均拜访家数" message="全部（10）" />
    <currentRanking />
    <RankingList :rankList="rankList" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import visitData from "./../visitData";

export default {
  components: {
    visitData
  },
  data() {
    return {
      visitMessage: [],
      rankList: [
        {
          name: "张三",
          rankingMessage: "20",
          rankingMessageUnit: "家"
        },
        {
          name: "李四",
          rankingMessage: "210",
          rankingMessageUnit: "家"
        },
        {
          name: "王五",
          rankingMessage: "1201",
          rankingMessageUnit: "家"
        },
        {
          name: "赵六",
          rankingMessage: "120",
          rankingMessageUnit: "家"
        },
        {
          name: "孙七",
          rankingMessage: "20",
          rankingMessageUnit: "家"
        }
      ]
    };
  },
  methods: {
    visitTrend() {
      this.$router.push("visitTrend");
    },

    handleToRanking() {
      this.$router.push("visitRanking");
    }
  },
  watch: {
    reportMessage(val) {
      let es_summary = val.es_summary;
      this.visitMessage = [
        {
          dataData: es_summary.average_number,
          dataUnit: "家",
          dataTitle: "日均拜访家数"
        },
        {
          dataData: es_summary.average_visit_time,
          dataUnit: "次",
          dataTitle: "日均次数"
        },
        {
          dataData: es_summary.visit_days,
          dataUnit: "天",
          dataTitle: "拜访天数"
        },
        {
          dataData: es_summary.average_day_time,
          dataUnit: "小时",
          dataTitle: "日均拜访时长"
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

<style lang="less" scoped>
@import url("./index.less");
</style>