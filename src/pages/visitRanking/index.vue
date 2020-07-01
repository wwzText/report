<template>
  <div>
    <div class="switch-conatiner" v-if="swiperNavList.length">
      <div class="use-type-container" @click="chooseRankingType">
        <span>{{swiperNavList[CompSwiperIndex]}}</span>
        <span class="iconfont iconmenu-down"></span>
      </div>
    </div>

    <monthList :showMonth="showMonthSelect" @closePopup="closeMonthPopup" />
    <calendar :showCalenar="showCalenar" @changeDate="changeDate" />
    <ActionSheet
      @cancel="closeRankingTypeAction"
      @select="selectRankingType"
      :actions="headerList"
      cancel-text="取消"
      v-model="showRankingSelect"
    ></ActionSheet>

    <RankingList
      style="marginTop: 10px"
      :header="swiperList[CompSwiperIndex].rankLists[rankIndex].header"
      :rankList="swiperList[CompSwiperIndex].rankLists[rankIndex].list"
    />
  </div>
</template>

<script>
import monthList from "@/components/terminalVisitReport/monthList";
import { ActionSheet } from "vant";
import { mapState } from "vuex";
export default {
  components: {
    monthList,
    ActionSheet
  },
  data() {
    return {
      showSelectDate: "",
      showMonthSelect: false, // 显示最近6个月选择器
      showCalenar: false,
      showRankingSelect: false, // 显示排行榜类型选择器
      rankingTypeStr: "11",
      tableHeaderConfig: [],
      rankList: [],
      headerList: [],

      CompSwiperIndex: 0
    };
  },
  created() {
    this.curShowSelectDate();
    this.swiperNavList.map(item => {
      if (item != "当月拜访计划") {
        this.headerList.push({
          name: item
        });
      }
    });

    this.CompSwiperIndex = this.swiperIndex;
  },
  methods: {
    // 初始化月份为当月
    curShowSelectDate() {
      let date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      this.showSelectDate = `${year}-${month}`;
    },
    // 显示选择查看时间
    showSelectDateComponent() {
      if (this.dateOrMonth == "DY") {
        this.showMonthSelect = true;
      } else {
        this.showCalenar = true;
        console.log(this.showCalenar)
      }
    },

    // 弹出选择排行榜类型
    chooseRankingType() {
      this.showRankingSelect = true;
    },

    // 关闭月份选择弹出框
    closeMonthPopup(e) {
      this.showMonthSelect = false;
      e.timeStr ? (this.showSelectDate = e.timeStr) : null;
    },
    // 日历确认回调
    changeDate(obj) {
      this.showCalenar = false;
      this.showSelectDate = obj.timeStr;
    },

    // 关闭类型选择器
    closeRankingTypeAction() {
      this.showRankingSelect = false;
    },

    // 选择排名类型
    selectRankingType(e) {
      console.log(e);
      this.headerList.map((item, index) => {
        if (item.name == e.name) {
          this.CompSwiperIndex = index;
        }
      });

      // this.rankingTypeStr = e.name;
      this.showRankingSelect = false;
    }
  },
  computed: {
    ...mapState({
      swiperList: state => state.terminalVisitReportStore.swiperList,
      swiperIndex: state => state.terminalVisitReportStore.swiperIndex,
      rankIndex: state => state.terminalVisitReportStore.rankIndex,
      swiperNavList: state => state.terminalVisitReportStore.swiperNavList,
      dateOrMonth: state => state.terminalVisitReportStore.dateOrMonth,
      terminalVisitQueryTime: state => state.terminalVisitReportStore.terminalVisitQueryTime
    })
  }
};
</script>

<style lang="less" scoped>
@import url("./index.less");
</style>