<template>
  <div>
    <p class="last_update_date">
      数据最后更新时间：{{ headerMessage.last_update_date }}
      {{ headerMessage.last_update_time }}
    </p>
    <switchDataMonth />
    <staffMessage />
    <!-- 没有swiper的状态 -->
    <div v-if="swiperList.length == 1">
      <visitData :visitData="swiperList[0].visitData" style="margin: 10px 0" />
      <div v-if="swiperList[0].rankLists">
        <template v-for="(item, index) in swiperList[0].rankLists">
          <ViewTitle
            v-if="item.list.length"
            :key="'aa' + index"
            :title="item.title"
            :describe="item.desc"
            :message="
              '全部（' +
              (item.list[0].rank == 0
                ? item.list.length - 1
                : item.list.length) +
              '）'
            "
            style="margintop: 10px"
            @click="seeRankAllList(0, index)"
          />

          <RankingList
            v-if="item.list.length"
            :rankList="item.list.slice(0, 4)"
            :key="'bb' + index"
            :only="item.onlyValue"
            :onlyUtil="item.onlyUtil"
          />
        </template>
      </div>
      <ViewTitle
        :title="'已' + reportTypeStr + '问题统计'"
        :neednavTo="dateOrMonth == 'DR'"
        style="margintop: 10px"
        @click="seeQuestionInNative"
        v-if="swiperList[0].question"
      />
      <QuestionList style="margintop: 1px" :list="swiperList[0].question" />
    </div>
    <!-- 有swiper的状态 -->
    <div v-if="swiperList.length > 1" style="margintop: 10px">
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
          <visitData
            :visitData="swiperItem.visitData"
            style="margintop: 10px"
          />

          <ViewTitle
            v-if="swiperItem.showPlace"
            :title="'分场所终端' + reportTypeStr + '率'"
            message="查看"
            style="margintop: 10px"
            @click="seePlace"
          />
          <ViewTitle
            v-if="swiperItem.trend"
            :title="
              '查看当月' + (reportType == 'BF' ? '拜访' : '走访') + '趋势'
            "
            message="查看"
            style="margintop: 10px"
            @click="seeTrend"
          />
          <template v-if="swiperItem.rankLists">
            <div v-for="(rankItem, i) in swiperItem.rankLists" :key="'t' + i">
              <ViewTitle
                v-if="rankItem.list.length"
                :key="'w' + i"
                :title="rankItem.title"
                :describe="rankItem.desc"
                :message="
                  '全部（' +
                  (rankItem.list[0].rank == 0
                    ? rankItem.list.length - 1
                    : rankItem.list.length) +
                  '）'
                "
                style="margintop: 10px"
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
          </template>
          <ViewTitle
            v-if="
              swiperItem.question &&
              userOrOrganization == 'RY' &&
              dateOrMonth == 'DR' &&
              targetType == 'ZD' &&
              (reportType == 'DC' || reportType == 'ZF')
            "
            :title="'已' + reportTypeStr + '问题统计'"
            @click="seeQuestionInNative"
            :neednavTo="dateOrMonth == 'DR'"
            style="margintop: 10px"
          />
          <QuestionList
            v-if="
              swiperItem.question &&
              userOrOrganization == 'RY' &&
              dateOrMonth == 'DR' &&
              targetType == 'ZD' &&
              (reportType == 'DC' || reportType == 'ZF')
            "
            :list="swiperItem.question"
          />
          <ViewTitle
            v-if="swiperItem.planList"
            title="TA的拜访计划"
            @click="seeAllPlan(swiperItem.planList)"
            style="margintop: 10px"
          />
          <div class="add-visit-btn-main" v-if="swiperItem.planList">
            <button class="add-visit-btn" @click="addPlanToSale">
              给Ta新增拜访计划+
            </button>
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
    planList,
  },
  created() {
    // 修改对应页面标题
    this.changePageTitleName();

    // 获取数据
    this.determineUrlByStoreParam();

    // 告诉原生这个页面不能直接退出
    this.$bridge.callhandler({
      type: "isBack",
      data: {
        isBack: false,
      },
    });

    if (this.swiperIndex) {
      this.$nextTick(() => {
        this.navTitleIndexChange({
          index: this.swiperIndex,
        });
      });
    }
  },
  destroyed() {
    this.$store.commit("saveSwiperTitleIndex", {
      index: this.curTitleIndex,
    });
  },
  data() {
    return {
      curTitleIndex: 0,
      reportTypeStr: "",
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
            : this.userInfo.partner,
        },
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
            : this.userInfo.partner,
        },
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
        warning: "X",
      };
      this.$bridge.callhandler({
        type: "navToAppPath",
        data,
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
        name,
      });
    },

    // 跳转到排行榜列表页
    seeRankAllList(index, i) {
      this.$store.commit("changeSwiperIndex", {
        index,
        i,
      });
      this.$router.push("visitRanking");
    },

    swipeIndexChange(e) {
      this.curTitleIndex = e;
    },

    navTitleIndexChange(e) {
      this.curTitleIndex = e.index;
      this.$refs.visitSwipe.swipeTo(e.index);
    },

    // 根据 terminalVisitReportStore 仓库中的参数确定访问URL及访问参数
    determineUrlByStoreParam(bool = false) {
      // 判断是否有时间，第一次初始化的情况下是没有的
      if (!this.terminalVisitQueryTime) return;

      this.reportTypeStr =
        this.reportType == "BF"
          ? "拜访"
          : this.reportType == "ZF"
          ? "走访"
          : "督查";
      // this.swiperList = []
      let url = `${this.targetType}_${this.reportType}_${this.dateOrMonth}_${this.userOrOrganization}`;
      if (url === this.reportUrl && !bool) {
        return;
      }
      let queryObj = {
        appuser: this.userInfo.appuser,
        org_code: this.userInfo.sales_station,
      };

      // 判断日期方式，按月份筛选月份只取月，日期自己加上去，按日期正常传
      if (this.dateOrMonth === "DR") {
        queryObj["visit_date"] = this.terminalVisitQueryTime;
      } else {
        queryObj["start_date"] = `${this.terminalVisitQueryTime}-01`;
        queryObj["end_date"] = `${this.terminalVisitQueryTime}-31`;
      }

      let havaAjaxData = !!this.reportAjaxData;
      let reportAjaxData = this.reportAjaxData;
      let userInfo = this.userInfo;

      queryObj["user_bp"] = havaAjaxData
        ? reportAjaxData.userbp
        : userInfo.partner;

      if (this.reportType == "ZF") {
        queryObj["visit_type"] = "ZZ01";
      } else {
        queryObj["visit_type"] = "ZB03";
      }

      queryObj["org_code"] = havaAjaxData
        ? this.reportAjaxData.zorg3 ||
          this.reportAjaxData.zorg2 ||
          this.reportAjaxData.zorg1
        : userInfo.sales_station.replace("O ", "") ||
          userInfo.sales_group.replace("O ", "") ||
          userInfo.sales_office.replace("O ", "");

      queryObj["org_type"] = havaAjaxData
        ? this.reportAjaxData.zorg3
          ? 3
          : this.reportAjaxData.zorg2
          ? 2
          : 1
        : userInfo.sales_station
        ? 3
        : userInfo.sales_group
        ? 2
        : 1;

      this.getReportData(url, queryObj);
    },

    // 根据store中的很多参数实际发起请求
    async getReportData(url, queryObj) {
      this.$showLoading();
      await this.$store.dispatch("getReportData", {
        url,
        queryObj,
      });
      this.$hideLoading();
    },
  },

  watch: {
    // 监听切换日期
    terminalVisitQueryTime() {
      this.determineUrlByStoreParam(true);
    },
  },

  computed: {
    ...mapState({
      userOrOrganization: (state) =>
        state.terminalVisitReportStore.userOrOrganization,
      dateOrMonth: (state) => state.terminalVisitReportStore.dateOrMonth,
      targetType: (state) => state.terminalVisitReportStore.targetType,
      reportType: (state) => state.terminalVisitReportStore.reportType,
      terminalVisitQueryTime: (state) =>
        state.terminalVisitReportStore.terminalVisitQueryTime,
      reportMessage: (state) => state.terminalVisitReportStore.reportMessage,
      swiperList: (state) => state.terminalVisitReportStore.swiperList,
      swiperNavList: (state) => state.terminalVisitReportStore.swiperNavList,
      userInfo: (state) => state.userInfoStore.userInfo,
      reportAjaxData: (state) => state.terminalVisitReportStore.reportAjaxData,
      swiperIndex: (state) => state.terminalVisitReportStore.swiperIndex,
      reportUrl: (state) => state.terminalVisitReportStore.reportUrl,
      headerMessage: (state) => state.terminalVisitReportStore.headerMessage,
    }),
  },
};
</script>

<style lang="less" scoped>
@import url("./index.less");
</style>