<template>
  <div>
    <switchDataMonth />
    <staffMessage />
    <!-- 没有swiper的状态 -->
    <div v-if="swiperList.length == 1">
      <visitData :visitData="swiperList[0].visitData" style="margin: 10px 0" />
      <div>
        <template v-for="(item, index) in swiperList[0].rankLists">
          <ViewTitle
            v-if="item.list.length"
            :key="index"
            :title="item.title"
            :describe="item.desc"
            :message="'全部（' + (item.list.length - 1) +'）'"
            style="marginTop: 10px"
            @click="seeRankAllList(0, index)"
          />
          <RankingList v-if="item.list.length" :rankList="item.list.slice(0, 4)" :key="index" />
        </template>
      </div>
      <ViewTitle title="已拜访问题统计" @click="seeQuestionInNative" v-if="swiperList[0].question" />
      <QuestionList :list="swiperList[0].question" />
    </div>
    <!-- 有swiper的状态 -->
    <div v-else style="marginTop: 10px">
      <titleNav
        :titleList="swiperNavList"
        :curTitleIndex="curTitleIndex"
        @navTitleIndexChange="navTitleIndexChange"
      />
      <Swipe
        indicator-color="white"
        :loop="false"
        :show-indicators="false"
        @change="swipeIndexChange"
        ref="visitSwipe"
      >
        <SwipeItem v-for="(swiperItem, index) in swiperList" :key="'o' + index">
          <visitData :visitData="swiperItem.visitData" style="marginTop: 10px" />

          <ViewTitle
            v-if="swiperItem.showPlace"
            title="分场所终端拜访率"
            message="查看"
            style="marginTop: 10px"
            @click="seePlace"
          />
          <ViewTitle
            v-if="swiperItem.trend"
            :title="'查看当月' + (reportType == 'BF' ? '拜访' : '走访') + '趋势'"
            message="查看"
            style="marginTop: 10px"
            @click="seeTrend"
          />
          <div v-for="(rankItem, i) in swiperItem.rankLists" :key="'t' + i">
            <ViewTitle
              v-if="rankItem.list.length"
              :key="'w' + i"
              :title="rankItem.title"
              :describe="rankItem.desc"
              :message="'全部（' + (rankItem.list.length - 1) +'）'"
              style="marginTop: 10px"
              @click="seeRankAllList(index, i)"
            />
            <RankingList
              v-if="rankItem.list.length"
              :onlyUtil="rankItem.onlyUtil"
              :only="rankItem.onlyValue"
              :rankList="rankItem.list.slice(0, 4)"
              :key="'rankitem' + index"
            />
          </div>
          <ViewTitle
            v-if="swiperItem.question"
            title="已拜访问题统计"
            @click="seeQuestionInNative"
            style="marginTop: 10px"
          />
          <QuestionList v-if="swiperItem.question" :list="swiperItem.question" />
          <ViewTitle
            v-if="swiperItem.planList"
            title="TA的拜访计划"
            @click="seeAllPlan(swiperItem.planList)"
            style="marginTop: 10px"
          />
          <div class="add-visit-btn-main" v-if="swiperItem.planList">
            <button class="add-visit-btn" @click="addPlanToSale">给Ta新增拜访计划+</button>
          </div>
          <planList :planList="swiperItem.planList" />
        </SwipeItem>
      </Swipe>
    </div>
  </div>
</template>

<script>
import switchDataMonth from "@/components/terminalVisitReport/switchDataMonth";
import staffMessage from "@/components/terminalVisitReport/staffMessage";
import planList from "@/components/terminalVisitReport/planList";
import { mapState } from "vuex";

export default {
  components: {
    switchDataMonth,
    staffMessage,
    planList
  },
  created() {
    this.changePageTitleName();
    this.determineUrlByStoreParam();
    this.$bridge.callhandler({
      type: "isBack",
      data: "false"
    });
  },
  data() {
    return {
      componentName: "",
      curTitleIndex: 0
    };
  },

  methods: {
    // 给销售员添加计划
    addPlanToSale() {
      this.$bridge.callhandler({
        type: "addPlan",
        data: {
          appuser: this.reportAjaxData
            ? this.reportAjaxData.username
            : this.userInfo.appuser,
          userBp: this.reportAjaxData
            ? this.reportAjaxData.userbp
            : this.userInfo.partner
        }
      });
    },
    // 查看所有计划
    seeAllPlan(list) {
      this.$bridge.callhandler({
        type: "personPlanList",
        data: {
          appuser: this.reportAjaxData
            ? this.reportAjaxData.username
            : this.userInfo.appuser,

          userBp: this.reportAjaxData
            ? this.reportAjaxData.userbp
            : this.userInfo.partner
        }
      });
    },

    // 查看分场所终端拜访率
    seePlace() {
      this.$router.push("placeVisitEfficiency");
    },

    // 查看拜访走访趋势
    seeTrend() {
      this.$router.push("visitTrend");
    },
    // 查看所有问题
    seeQuestionInNative() {
      console.log(this.reportAjaxData);
      let data = {
        im_date: this.terminalVisitQueryTime,
        sales_office: this.reportAjaxData
          ? this.reportAjaxData.zorg1.replace("O", "")
          : this.userInfo.sales_org.replace("O ", ""),

        sales_group: this.reportAjaxData
          ? this.reportAjaxData.zorg2
            ? this.reportAjaxData.zorg2.replace("O", "")
            : ""
          : this.userInfo.sales_group.replace("O ", ""),

        sales_station: this.reportAjaxData
          ? this.reportAjaxData.zorg3
            ? this.reportAjaxData.zorg3.replace("O", "")
            : ""
          : this.userInfo.sales_station.replace("O ", ""),

        ywy_no: this.reportAjaxData
          ? this.reportAjaxData.username
          : this.userInfo.appuser,

        detail_type: `${this.targetType}_${this.reportType}`,
        warning: "X"
      };
      this.$bridge.callhandler({
        type: "navToAppPath",
        data
      });
    },
    // 修改页面标题
    changePageTitleName() {
      let name = `${this.targetType == "ZD" ? "终端" : "经销商"}${
        this.reportType == "BF"
          ? "拜访"
          : this.reportType == "ZF"
          ? "走访"
          : "督查"
      }`;

      this.$store.commit("changeHeaderNavTitle", {
        name
      });
    },

    // 跳转到排行榜列表页
    seeRankAllList(index, i) {
      this.$store.commit("changeSwiperIndex", {
        index,
        i
      });
      this.$router.push("visitRanking");
    },

    navTitleIndexChange(e) {
      this.curTitleIndex = e.index;
      this.$refs.visitSwipe.swipeTo(e.index);
    },
    swipeIndexChange(e) {
      this.curTitleIndex = e;
    },

    // 根据 terminalVisitReportStore 仓库中的参数确定访问URL及访问参数
    determineUrlByStoreParam() {
      // 判断是否有时间，第一次初始化的情况下是没有的
      if (!this.terminalVisitQueryTime) return;

      let url = `${this.targetType}_${this.reportType}_${this.dateOrMonth}_${this.userOrOrganization}`;
      let queryObj = {
        appuser: this.userInfo.appuser,
        org_code: this.userInfo.sales_station
      };

      // 判断日期方式，按月份筛选月份只取月，日期自己加上去，按日期正常传
      if (this.dateOrMonth === "DR") {
        queryObj["visit_date"] = this.terminalVisitQueryTime;
      } else {
        queryObj["start_date"] = `${this.terminalVisitQueryTime}-01`;
        queryObj["end_date"] = `${this.terminalVisitQueryTime}-31`;
      }

      if (this.userOrOrganization === "RY") {
        queryObj["user_bp"] = this.reportAjaxData
          ? this.reportAjaxData.userbp
          : this.userInfo.partner;

        queryObj["org_code"] = this.reportAjaxData
          ? this.reportAjaxData.zposition
          : this.userInfo.sales_station;
      } else {
        if (this.reportAjaxData.zorg1) {
          queryObj["org_code"] = this.reportAjaxData.zorg1;
          queryObj["org_type"] = "1";
        }
        if (this.reportAjaxData.zorg2) {
          queryObj["org_code"] = this.reportAjaxData.zorg2;
          queryObj["org_type"] = "2";
        }
        if (this.reportAjaxData.zorg3) {
          queryObj["org_code"] = this.reportAjaxData.zorg3;
          queryObj["org_type"] = "3";
        }
      }

      if (this.userOrOrganization === "RY" && this.reportType !== "BF") {
        if (this.reportType == "ZF") {
          queryObj["visit_type"] = "ZZ01";
        } else {
          queryObj["visit_type"] = "ZB03";
        }

        if (this.reportAjaxData) {
          if (this.reportAjaxData.zorg1) {
            queryObj["org_code"] = this.reportAjaxData.zorg1;
            queryObj["org_type"] = "1";
          }
          if (this.reportAjaxData.zorg2) {
            queryObj["org_code"] = this.reportAjaxData.zorg2;
            queryObj["org_type"] = "2";
          }
          if (this.reportAjaxData.zorg3) {
            queryObj["org_code"] = this.reportAjaxData.zorg3;
            queryObj["org_type"] = "3";
          }
        } else {
          if (this.userInfo.sales_office) {
            queryObj["org_code"] = this.userInfo.sales_office;
            queryObj["org_type"] = "1";
          }
          if (this.userInfo.sales_group) {
            queryObj["org_code"] = this.userInfo.sales_group;
            queryObj["org_type"] = "2";
          }
          if (this.userInfo.sales_station) {
            queryObj["org_code"] = this.userInfo.sales_station;
            queryObj["org_type"] = "3";
          }
        }
      }

      this.getReportData(url, queryObj);
    },

    // 根据store中的很多参数实际发起请求
    async getReportData(url, queryObj) {
      // 数据组件展示名称
      this.componentName = url;

      this.$showLoading();
      await this.$store.dispatch("getReportData", {
        url,
        queryObj
      });
      this.$hideLoading();
    }
  },

  watch: {
    // 监听切换日期
    terminalVisitQueryTime() {
      this.determineUrlByStoreParam();
    },
    curTitleIndex(val) {
      this.curTitleIndex = val;
    }
  },

  computed: {
    ...mapState({
      userOrOrganization: state =>
        state.terminalVisitReportStore.userOrOrganization,
      dateOrMonth: state => state.terminalVisitReportStore.dateOrMonth,
      targetType: state => state.terminalVisitReportStore.targetType,
      reportType: state => state.terminalVisitReportStore.reportType,
      terminalVisitQueryTime: state =>
        state.terminalVisitReportStore.terminalVisitQueryTime,
      reportMessage: state => state.terminalVisitReportStore.reportMessage,
      swiperList: state => state.terminalVisitReportStore.swiperList,
      swiperNavList: state => state.terminalVisitReportStore.swiperNavList,
      userInfo: state => state.userInfoStore.userInfo,
      reportAjaxData: state => state.terminalVisitReportStore.reportAjaxData,
      curTitleIndex: state => state.terminalVisitReportStore.curTitleIndex
    })
  }
};
</script>

<style lang="less" scoped>
@import url("./index.less");
</style>