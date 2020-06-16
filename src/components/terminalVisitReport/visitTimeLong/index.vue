<template>
  <!-- 拜访时长 -->
  <div>
    <visitData :visitData="visitMessage" />
    <ViewTitle
      title="所在工作站排行榜"
      describe="日均拜访天数"
      message="全部（10）"
      style="marginTop: 10px; marginBottom: 10px"
    />
    <currentRanking />
    <RankingList :rankList="rankList" />
  </div>
</template>

<script>
import visitData from "./../visitData";
import { mapState } from "vuex";
export default {
  components: {
    visitData
  },
  data() {
    return {
      visitMessage: [
        {
          dataData: 2,
          dataUnit: "小时",
          dataTitle: "总拜访时长"
        },
        {
          dataData: 33.3,
          dataUnit: "次",
          dataTitle: "拜访次数"
        },
        {
          dataData: 48.7,
          dataUnit: "min/次",
          dataTitle: "平均拜访时长"
        }
      ],

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
  watch: {
    es_summary(val) {
      this.visitMessage = [
        {
          dataData: val.visit_total_time,
          dataUnit: "小时",
          dataTitle: "总拜访时长"
        },
        {
          dataData: val.visit_time,
          dataUnit: "次",
          dataTitle: "拜访次数"
        },
        {
          dataData: val.avg_time,
          dataUnit: "min/次",
          dataTitle: "平均拜访时长"
        }
      ]
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