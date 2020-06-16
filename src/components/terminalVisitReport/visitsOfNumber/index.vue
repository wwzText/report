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
    es_summary(val) {
      this.visitMessage = [
        {
          dataData: val.average_number,
          dataUnit: "家",
          dataTitle: "日均拜访家数"
        },
        {
          dataData: val.average_visit_time,
          dataUnit: "次",
          dataTitle: "日均次数"
        },
        {
          dataData: val.visit_days,
          dataUnit: "天",
          dataTitle: "拜访天数"
        },
        {
          dataData: val.average_day_time,
          dataUnit: "小时",
          dataTitle: "日均拜访时长"
        }
      ];
    }
  },
  computed: {
    ...mapState({
      es_summary: state => state.terminalVisitReportStore.es_summary
    })
  }
};
</script>

<style lang="less" scoped>
@import url("./index.less");
</style>