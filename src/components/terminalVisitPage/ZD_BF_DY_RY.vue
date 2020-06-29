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
      <SwipeItem>
        <!-- 拜访效率 -->
        <template>
          <visitData :visitData="visitNumVisitData" style="margin: 10px 0" />
          <ViewTitle @click="seeVisitTrend" title="当月拜访趋势" message="查看" />
          <ViewTitle
            title="所在工作站排行榜"
            describe="日均拜访家数"
            :message="'全部(' + (total_visit_rankLength - 1)+ ')'"
            style="marginTop: 10px"
            v-if="et_total_visit_rank.length"
          />
          <RankingList :rankList="et_total_visit_rank" />
        </template>
      </SwipeItem>
      <SwipeItem>
        <!-- 拜访时长 -->
        <template>
          <visitData :visitData="visitLongTimeData" style="margin: 10px 0" />
          <ViewTitle
            title="所在工作站排行榜"
            describe="拜访总时长"
            :message="'全部（' + (totle_visit_timeLength - 1) + '）'"
            style="marginTop: 10px"
            v-if="et_total_visit_time.length"
          />
          <RankingList :rankList="et_total_visit_time" />
        </template>
      </SwipeItem>
      <SwipeItem>
        <!-- 拜访有效率 -->
        <visitData :visitData="visitEfficiencyData" style="margin: 10px 0" />
        <ViewTitle title="分场所终端拜访率" @click="placeVisitEfficiency" message="查看" />
        <ViewTitle v-if="et_total_visit_efficient.length" title="所在工作站排行榜" describe="有效拜访率" :message="'全部（' + (totle_visit_efficientLength - 1) + '）'" style="marginTop: 10px" />
        <RankingList :rankList="et_total_visit_efficient" />
      </SwipeItem>
      <SwipeItem>
        <!-- 当月拜访计划 -->
        <visitData :visitData="visitPlanData" style="margin: 10px 0" />
        <ViewTitle title="Ta的拜访计划" message="全部（10）" style="marginTop: 10px" />
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
      titleNavList: ["拜访效率", "拜访时长", "拜访有效率", "当月拜访计划"],
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
      totle_visit_efficientLength: 0, // 参与拜访有效率排名人数
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
        this.$router.push('visitTrend')
    },

    // 查看分场所终端拜访
    placeVisitEfficiency() {
        this.$router.push('placeVisitEfficiency')
    }
  },
  watch: {
    reportMessage(val) {
      this.visitNumVisitData = [
        {
          value: val.es_summary.average_number,
          name: "日均家数",
          unit: "家"
        },
        {
          value: val.es_summary.visit_time,
          name: "日均次数",
          unit: "次"
        },
        {
          value: val.es_summary.avg_time,
          name: "日均天数",
          unit: "天"
        },
        {
          value: val.es_summary.avg_time,
          name: "日均拜访时长",
          unit: "小时"
        }
      ];
      this.visitLongTimeData = [
        {
          value: val.es_summary.visit_total_time,
          name: "拜访总时长",
          unit: "小时"
        },
        {
          value: val.es_summary.visit_time,
          name: "拜访总数",
          unit: "次"
        },
        {
          value: val.es_summary.avg_time,
          name: "平均拜访时长",
          unit: "min/次"
        }
      ];
      this.visitEfficiencyData = [
        {
          value: val.es_summary.visit_efficient,
          name: "拜访有效率"
        },
        {
          value: val.es_summary.visit_rate,
          name: "拜访率",
        }
      ];
      this.visitPlanData = [
        {
          value: val.es_summary.plan_rate,
          name: "计划完成率"
        },
        {
          value: val.es_summary.plan_percent,
          name: "计划完成比例"
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
          item['rankShowValue'] = item.visit_efficient;
          return item
      });
      this.totle_visit_efficientLength = val.et_total_visit_efficient.length;
      this.et_total_visit_efficient = val.et_total_visit_efficient.splice(0, 6)

    }
  },
  computed: {
    ...mapState({
      reportMessage: state => state.terminalVisitReportStore.reportMessage
    })
  }
};
</script>