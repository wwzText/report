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
      <!-- 拜访效率 -->
      <SwipeItem>
        <template>
          <visitData :visitData="visitNumVisitData" style="margin: 10px 0" />
          <ViewTitle @click="seeVisitTrend" title="当月拜访趋势" message="查看" />
          <ViewTitle
            title="同级排行榜"
            describe="日均家数"
            :message="'全部(' + (et_rank_sameorg_egvnumber.length - 1)+ ')'"
            style="marginTop: 10px"
          />
          <RankingList :rankList="et_rank_sameorg_egvnumber" />
          <ViewTitle
            title="下级排行榜"
            describe="日均家数"
            :message="'全部(' + (et_rank_suborg_egvnumber.length - 1)+ ')'"
            style="marginTop: 10px"
          />
          <RankingList :rankList="et_rank_suborg_egvnumber" />
        </template>
      </SwipeItem>
      <!-- 拜访时长 -->
      <SwipeItem>
        <template>
          <visitData :visitData="visitLongTimeData" style="margin: 10px 0" />
          <ViewTitle
            title="同级排行榜"
            describe="拜访总时长"
            :message="'全部（' + (et_rank_sameorg_egvtimes.length - 1) + '）'"
            style="marginTop: 10px"
          />
          <RankingList :rankList="et_rank_sameorg_egvtimes" />
          <ViewTitle
            title="下级排行榜"
            describe="拜访总时长"
            :message="'全部（' + (et_rank_suborg_egvtimes.length) + '）'"
            style="marginTop: 10px"
          />
          <RankingList :rankList="et_rank_suborg_egvtimes" />
        </template>
      </SwipeItem>
      <!-- 拜访有效率 -->
      <SwipeItem>
        <visitData :visitData="visitEfficiencyData" style="margin: 10px 0" />
        <ViewTitle title="分场所终端拜访率" @click="placeVisitEfficiency" message="查看" />
        <ViewTitle
          title="所在工作站排行榜"
          describe="有效拜访率"
          :message="'全部（' + (et_rank_sameorg_efficient.length - 1) + '）'"
          style="marginTop: 10px"
        />
        <RankingList :rankList="et_rank_sameorg_efficient" />
        <ViewTitle
          title="所在工作站排行榜"
          describe="有效拜访率"
          :message="'全部（' + (et_rank_suborg_efficient.length - 1) + '）'"
          style="marginTop: 10px"
        />
        <RankingList :rankList="et_rank_suborg_efficient" />
      </SwipeItem>
    </Swipe>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      visitData: [],
      titleNavList: ["拜访效率", "拜访时长", "拜访有效率"],
      curTitleIndex: 0,
      visitNumVisitData: [],
      visitLongTimeData: [],
      visitEfficiencyData: [],
      visitPlanData: [],

      et_rank_suborg_egvtimes: [],
      et_rank_sameorg_egvnumber: [],
      et_rank_suborg_egvnumber: [],
      et_rank_sameorg_egvtimes: [], // 拜访有效率排行榜
      et_rank_sameorg_efficient: [],
      et_rank_suborg_efficient: [],
      total_visit_rankLength: 0, // 参与日均拜访家数人数
      totle_visit_timeLength: 0, // 参与拜访总时长排名人数
      totle_visit_efficientLength: 0 // 参与拜访有效率排名人数
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

    // 查看拜访趋势
    seeVisitTrend() {
      this.$router.push("visitTrend");
    },

    // 查看分场所终端拜访
    placeVisitEfficiency() {
      this.$router.push("placeVisitEfficiency");
    }
  },
  watch: {
    reportMessage(val) {
      console.log('watchVal', val)
      this.visitNumVisitData = [
        {
          value: val.es_visit_summary.average_number,
          name: "日均家数",
          unit: "家"
        },
        {
          value: val.es_visit_summary.visit_time,
          name: "日均次数",
          unit: "次"
        },
        {
          value: val.es_visit_summary.avg_time,
          name: "日均天数",
          unit: "天"
        },
        {
          value: val.es_visit_summary.avg_time,
          name: "日均拜访时长",
          unit: "小时"
        }
      ];
      this.visitLongTimeData = [
        {
          value: val.es_visit_summary.visit_total_time,
          name: "拜访总时长",
          unit: "小时"
        },
        {
          value: val.es_visit_summary.visit_time,
          name: "拜访总数",
          unit: "次"
        },
        {
          value: val.es_visit_summary.avg_time,
          name: "平均拜访时长",
          unit: "min/次"
        }
      ];
      this.visitEfficiencyData = [
        {
          value: val.es_visit_summary.visit_efficient,
          name: "拜访有效率",
          unit: "小时"
        },
        {
          value: val.es_visit_summary.visit_rate,
          name: "拜访率",
          unit: "小时"
        }
      ];

      // 同级拜访有效率
      this.et_rank_sameorg_efficient = val.et_rank_sameorg_efficient.map(item => {
        item["rankShowValue"] = item.org_desc;
        return item;
      });

      // 下级拜访有效率
      this.et_rank_suborg_efficient = val.et_rank_suborg_efficient.map(item => {
        item["rankShowValue"] = item.visit_efficient;
        return item;
      });

      // 同级拜访时长
      this.et_rank_sameorg_egvtimes = val.et_rank_sameorg_egvtimes.map(item => {
        item["rankShowValue"] = item.visit_total_time;
        return item;
      });

      // 下级拜访时长
      this.et_rank_suborg_egvtimes = val.et_rank_suborg_egvtimes.map(item => {
        item["rankShowValue"] = item.total_visit_time;
        return item;
      });

      // 同级平均家数
      this.et_rank_sameorg_egvnumber = val.et_rank_sameorg_egvnumber.map(item => {
        item["rankShowValue"] = item.average_number;
        return item;
      });

      // 下级平均家数
      this.et_rank_suborg_egvnumber = val.et_rank_suborg_egvnumber.map(item => {
        item["rankShowValue"] = item.average_number;
        return item;
      });
    }
  },
  computed: {
    ...mapState({
      reportMessage: state => state.terminalVisitReportStore.reportMessage
    })
  }
};
</script>