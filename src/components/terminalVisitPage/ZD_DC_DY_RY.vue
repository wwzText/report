<template>
  <div>
    <visitData :visitData="zfxlData" style="margin: 10px 0" />

    <ViewTitle
      title="所在工作站排行榜"
      describe="督查终端总数"
      :message="'全部(' + (et_visit_number.length - 1)+ ')'"
      style="marginTop: 10px"
    />
    <RankingList :rankList="et_visit_number" />
    <ViewTitle
      title="已督查终端统计"
      style="marginTop: 10px"
    />
    <QuestionList :list="questionList" />
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      zfxlData: [],
      zfscData: [],
      et_visit_rank: [], // 日均走访家数排行榜
      curTitleIndex: 0,
      et_visit_number: [],
      questionList: []
    };
  },
  methods: {},
  watch: {
    reportMessage(val) {
      console.log("watchVal", val);
      // 走访效率
      this.zfxlData = [
        {
          value: val.es_summary.visit_number,
          name: "督查总数",
          unit: "家"
        }
      ];
      this.et_visit_number = val.et_visit_number;
      // 日均家数排行榜
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