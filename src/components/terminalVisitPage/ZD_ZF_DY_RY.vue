<template>
  <div>
    <titleNav
      :titleList="titleNavList"
      :curTitleIndex="curTitleIndex"
      @navTitleIndexChange="navTitleIndexChange"
    />
    <!-- swapper切换组件，根据curTitleIndex变化，双向绑定 -->
    <Swipe
      indicator-color="white"
      :loop="false"
      :show-indicators="false"
      @change="swipeIndexChange"
      ref="visitSwipe"
    >
      <!-- 走访效率 -->
      <SwipeItem>
        <template>
          <visitData :visitData="zfxlData" style="margin: 10px 0" />
          <ViewTitle @click="seeVisitTrend" title="当月走访趋势" message="查看" />
          <ViewTitle
            title="所在业务部排行榜"
            describe="日均家数"
            :message="'全部(' + (et_visit_rank.length - 1)+ ')'"
            style="marginTop: 10px"
          />
          <RankingList :rankList="et_visit_rank" />
        </template>
      </SwipeItem>
      <!-- 走访时长 -->
      <SwipeItem>
        <template>
          <visitData :visitData="zfscData" style="margin: 10px 0" />
          <ViewTitle
            title="所在业务部排行榜"
            describe="走访总时长"
            :message="'全部（' + (et_visit_time.length - 1) + '）'"
            style="marginTop: 10px"
          />
          <RankingList :rankList="et_visit_time" />

          <ViewTitle
            title="已走访终端问题统计"
            style="marginTop: 10px"
          />
          <QuestionList :list="questionList" />
        </template>
      </SwipeItem>
    </Swipe>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      titleNavList: ["走访效率", "走访时长"],
      zfxlData: [],
      zfscData: [],
      et_visit_rank: [], // 日均走访家数排行榜
      curTitleIndex: 0,
      et_visit_time: [],
      questionList: []
    };
  },
  methods: {
    navTitleIndexChange(e) {
      this.curTitleIndex = e.index;
      this.$refs.visitSwipe.swipeTo(e.index);
    },
    swipeIndexChange(e) {
      this.curTitleIndex = e;
    },

    // // 查看拜访趋势
    seeVisitTrend() {
      this.$router.push("visitTrend");
    },

    // // 查看分场所终端拜访
    // placeVisitEfficiency() {
    //   this.$router.push("placeVisitEfficiency");
    // }
  },
  watch: {
    reportMessage(val) {
      // 走访效率
      this.zfxlData = [
        {
          value: val.es_summary.average_number,
          name: "日均家数",
          unit: "家"
        },
        {
          value: val.es_summary.visit_days,
          name: "走访天数",
          unit: "天"
        },
        {
          value: val.es_summary.average_time,
          name: "日均走访时长",
          unit: "小时"
        }
      ];
      // 走访时长
      this.zfscData = [
        {
          value: val.es_summary.visit_total_time,
          name: "走访总时长",
          unit: "小时"
        },
        {
          value: val.es_summary.visit_time,
          name: "走访总数",
          unit: "次"
        },
        {
          value: val.es_summary.avg_time,
          name: "平均走访时长",
          unit: "min/次"
        }
      ];
      this.et_visit_time = val.et_visit_time;
      // 日均家数排行榜
      this.et_visit_rank = val.et_visit_rank;

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