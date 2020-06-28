<template>
  <div>
    <visitData :visitData="zfxlData" style="margin: 10px 0" />

    <ViewTitle
      title="所在大区排行榜"
      describe="人均督查总数"
      :message="'全部(' + (et_rank_sameorg_egvnum.length - 1)+ ')'"
      style="marginTop: 10px"
    />
    <RankingList :rankList="et_rank_sameorg_egvnum" />  

    <ViewTitle
      title="管辖工作站排行榜"
      describe="人均督查总数"
      :message="'全部(' + (et_rank_suborg_egvnum.length - 1)+ ')'"
      style="marginTop: 10px"
    />
    <RankingList :rankList="et_rank_suborg_egvnum" />

    <ViewTitle
      title="管辖工作站直属管理员排行榜"
      describe="人均督查总数"
      :message="'全部(' + (et_rank_direct_egvnum.length - 1)+ ')'"
      style="marginTop: 10px"
    />
    <RankingList :rankList="et_rank_direct_egvnum" />
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
      et_rank_sameorg_egvnum: [],
      et_rank_suborg_egvnum: [],
      et_rank_direct_egvnum: [],
      questionList: []
    };
  },
  methods: {},
  watch: {
    reportMessage(val) {
      
      this.zfxlData = [
        {
          value: `${val.es_summary.visit_number}/${val.es_summary.termial_number}`,
          name: "已督查/终端总数",
          unit: "家"
        }
      ];
      this.et_rank_sameorg_egvnum = val.et_rank_sameorg_egvnum;
      this.et_rank_suborg_egvnum = val.et_rank_suborg_egvnum;
      this.et_rank_direct_egvnum = val.et_rank_direct_egvnum;
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