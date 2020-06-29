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
            title="所在大区排行榜"
            describe="日均家数"
            :message="'全部(' + (et_rank_sameorg_egvtimes.length - 1)+ ')'"
            style="marginTop: 10px"
            v-if="et_rank_sameorg_egvtimes.length"
          />
          <RankingList :rankList="et_rank_sameorg_egvtimes" />
          <ViewTitle
            title="管辖工作站排行榜"
            describe="日均家数"
            :message="'全部(' + (et_rank_suborg_egvtimes.length - 1)+ ')'"
            style="marginTop: 10px"
            v-if="et_rank_sameorg_egvtimes.length"
          />
          <RankingList :rankList="et_rank_suborg_egvtimes" />
          <ViewTitle
            title="管辖工作站直属管理员排行榜"
            describe="日均家数"
            :message="'全部(' + (et_rank_direct_egvtimes.length - 1)+ ')'"
            style="marginTop: 10px"
            v-if="et_rank_direct_egvtimes.length"
          />
          <RankingList :rankList="et_rank_direct_egvtimes" />
        </template>
      </SwipeItem>
      <!-- 走访时长 -->
      <SwipeItem>
        <template>
          <visitData :visitData="zfscData" style="margin: 10px 0" />
          <ViewTitle
            title="已走访终端问题统计"
            :neednavTo="false"
            style="marginTop: 10px"
          />
          <QuestionList :list="questionList" />

          <ViewTitle
            title="所在大区排行榜"
            :neednavTo="false"
            describe="走访总时长"
            :message="'全部（' + (et_rank_sameorg_totaltime.length - 1) + '）'"
            style="marginTop: 10px"
            v-if="et_rank_sameorg_totaltime.length"
          />
          <RankingList :rankList="et_rank_sameorg_totaltime" />
          <ViewTitle
            title="管辖工作站排行榜"
            describe="拜访总时长"
            :message="'全部（' + (et_rank_suborg_totaltime.length - 1) + '）'"
            style="marginTop: 10px"
            v-if="et_rank_suborg_totaltime.length"
          />
          <RankingList :rankList="et_rank_suborg_totaltime" />
          <ViewTitle
            title="管辖工作站直属挂历元排行榜"
            describe="拜访总时长"
            :message="'全部（' + (et_rank_direct_totaltime.length - 1) + '）'"
            style="marginTop: 10px"
            v-if="et_rank_direct_totaltime.length"
          />
          <RankingList :rankList="et_rank_direct_totaltime" />
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
      curTitleIndex: 0,
      et_rank_direct_totaltime: [],
      et_rank_suborg_totaltime: [],
      et_rank_sameorg_totaltime: [],
      et_rank_direct_egvtimes: [],
      et_rank_suborg_egvtimes: [],
      et_rank_sameorg_egvtimes: [],
      et_rank_direct_totaltime: [],
      questionList: [],
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
    }

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
          value: val.es_summary.average_day_time,
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
          value: val.es_summary.visit_number,
          name: "走访总数",
          unit: "次"
        },
        {
          value: val.es_summary.avg_time,
          name: "平均走访时长",
          unit: "min/次"
        }
      ];
      this.et_rank_sameorg_egvtimes = val.et_rank_sameorg_egvtimes;
      this.et_rank_suborg_egvtimes = val.et_rank_suborg_egvtimes;
      this.et_rank_direct_egvtimes = val.et_rank_direct_egvtimes;

      this.questionList = val.et_visit_quest;
      this.et_rank_sameorg_totaltime = val.et_rank_sameorg_totaltime;
      this.et_rank_suborg_totaltime = val.et_rank_suborg_totaltime;
      this.et_rank_direct_totaltime = val.et_rank_direct_totaltime;
    }
  },
  computed: {
    ...mapState({
      reportMessage: state => state.terminalVisitReportStore.reportMessage
    })
  }
};
</script>