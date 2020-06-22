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
            :message="'全部(' + (total_visit_rankLength - 1)+ ')'"
            style="marginTop: 10px"
          />

          <ViewTitle
            title="下级排行榜"
            describe="日均家数"
            :message="'全部(' + (total_visit_rankLength - 1)+ ')'"
            style="marginTop: 10px"
          />
          <RankingList :rankList="et_total_visit_rank" />
        </template>
      </SwipeItem>
      <!-- 拜访时长 -->
      <SwipeItem>
        <template>
          <visitData :visitData="visitLongTimeData" style="margin: 10px 0" />
          <ViewTitle
            title="所在工作站排行榜"
            describe="拜访总时长"
            :message="'全部（' + (totle_visit_timeLength - 1) + '）'"
            style="marginTop: 10px"
          />
          <RankingList :rankList="et_total_visit_time" />
        </template>
      </SwipeItem>
      <!-- 拜访有效率 -->
      <SwipeItem>
        <visitData :visitData="visitEfficiencyData" style="margin: 10px 0" />
        <ViewTitle title="分场所终端拜访率" @click="placeVisitEfficiency" message="查看" />
        <ViewTitle
          title="所在工作站排行榜"
          describe="有效拜访率"
          :message="'全部（' + (totle_visit_efficientLength - 1) + '）'"
          style="marginTop: 10px"
        />
        <RankingList :rankList="et_total_visit_efficient" />
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

      et_total_visit_rank: [], // 日均拜访家数排行榜
      et_total_visit_time: [], // 拜访总时长排行榜
      et_total_visit_efficient: [], // 拜访有效率排行榜
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
      // 拜访效率
      val.et_total_visit_rank = val.et_total_visit_rank.map(item => {
        item["rankShowValue"] = item.average_number;
        return item;
      });
      this.total_visit_rankLength = val.et_total_visit_rank.length;
      this.et_total_visit_rank = val.et_total_visit_rank.splice(0, 6);

      // 拜访时长
      val.et_total_visit_time = val.et_total_visit_time.map(item => {
        item["rankShowValue"] = item.visit_total_time;
        return item;
      });
      this.totle_visit_timeLength = val.et_total_visit_time.length;
      this.et_total_visit_time = val.et_total_visit_time.splice(0, 6);

      // 拜访有效率
      val.et_total_visit_efficient = val.et_total_visit_efficient.map(item => {
        item["rankShowValue"] = item.visit_efficient;
        return item;
      });
      this.totle_visit_efficientLength = val.et_total_visit_efficient.length;
      this.et_total_visit_efficient = val.et_total_visit_efficient.splice(0, 6);
    }
  },
  computed: {
    ...mapState({
      reportMessage: state => state.terminalVisitReportStore.reportMessage
    })
  }
};
</script>