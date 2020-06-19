<template>
  <!-- 拜访有效率 -->
  <div>
    <visitData :visitData="visitMessage" />

    <ViewTitle
      title="分场所终端拜访率"
      @click="seePlaceVisitEfficiency"
      style="marginTop: 10px; marginBottom: 10px"
    />
    <ViewTitle title="所在工作站排行榜" describe="日均拜访家数" message="全部（10）" />
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
    seePlaceVisitEfficiency() {
      this.$router.push("placeVisitEfficiency");
    }
  },
  watch: {
    reportMessage(val) {
      let es_summary = val.es_summary;
      this.visitMessage = [
        {
          dataData: `${es_summary.visit_efficient || 0}%`,
          dataTitle: "有效拜访率"
        },
        {
          dataData: `${es_summary.visit_rate || 0}%`,
          dataTitle: "拜访率"
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
@import url("./index.less");
</style>