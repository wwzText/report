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
          <RankingList v-if="item.list.length" :rankList="item.list" :key="index" />
        </template>
      </div>
      <ViewTitle title="已拜访经销商统计" v-if="swiperList[0].question" />
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
              :rankList="rankItem.list"
              :key="'rankitem' + index"
            />
          </div>
          <ViewTitle v-if="swiperItem.question.length" title="已拜访经销商统计" style="marginTop: 10px" />
          <QuestionList :list="swiperItem.question" />
        </SwipeItem>
      </Swipe>
    </div>
  </div>
</template>

<script>
import switchDataMonth from "@/components/terminalVisitReport/switchDataMonth";
import staffMessage from "@/components/terminalVisitReport/staffMessage";

import { mapState } from "vuex";

export default {
  components: {
    switchDataMonth,
    staffMessage
  },
  created() {
    this.changePageTitleName();
    this.determineUrlByStoreParam();
  },
  data() {
    return {
      componentName: "",
      curTitleIndex: 0
    };
  },

  methods: {
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
        queryObj["start_date"] = `${this.terminalVisitQueryTime}-1`;
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
      console.log(queryObj);
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
      reportAjaxData: state => state.terminalVisitReportStore.reportAjaxData
    })
  }
};
</script>

<style lang="less" scoped>
@import url("./index.less");
</style>