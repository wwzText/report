<template>
  <div>
    <switchDataMonth />
    <staffMessage />
    <component :is="componentName"></component>
  </div>
</template>

<script>
import switchDataMonth from "@/components/terminalVisitReport/switchDataMonth";
import staffMessage from "@/components/terminalVisitReport/staffMessage";
import ZD_BF_DR_RY from '@/components/terminalVisitPage/ZD_BF_DR_RY';
import ZD_BF_DR_ZZ from '@/components/terminalVisitPage/ZD_BF_DR_ZZ';
import ZD_BF_DY_RY from '@/components/terminalVisitPage/ZD_BF_DY_RY';
import ZD_BF_DY_ZZ from '@/components/terminalVisitPage/ZD_BF_DY_ZZ';

import JXS_BF_DR_ZZ from '@/components/terminalVisitPage/JXS_BF_DR_ZZ';
import JXS_BF_DY_ZZ from '@/components/terminalVisitPage/JXS_BF_DY_ZZ';
import JXS_BF_DR_RY from '@/components/terminalVisitPage/JXS_BF_DR_RY';
import JXS_BF_DY_RY from '@/components/terminalVisitPage/JXS_BF_DY_RY';


import ZD_ZF_DR_RY from '@/components/terminalVisitPage/ZD_ZF_DR_RY';
import ZD_ZF_DY_RY from '@/components/terminalVisitPage/ZD_ZF_DY_RY';
import ZD_ZF_DR_ZZ from '@/components/terminalVisitPage/ZD_ZF_DR_ZZ';
import ZD_ZF_DY_ZZ from '@/components/terminalVisitPage/ZD_ZF_DY_ZZ';

import JXS_ZF_DR_RY from '@/components/terminalVisitPage/JXS_ZF_DR_RY';
import JXS_ZF_DY_RY from '@/components/terminalVisitPage/JXS_ZF_DY_RY';
import JXS_ZF_DR_ZZ from '@/components/terminalVisitPage/JXS_ZF_DR_ZZ';
import JXS_ZF_DY_ZZ from '@/components/terminalVisitPage/JXS_ZF_DY_ZZ';

import ZD_DC_DR_RY from '@/components/terminalVisitPage/ZD_DC_DR_RY';
import ZD_DC_DY_RY from '@/components/terminalVisitPage/ZD_DC_DY_RY';
import ZD_DC_DR_ZZ from '@/components/terminalVisitPage/ZD_DC_DR_ZZ';
import ZD_DC_DY_ZZ from '@/components/terminalVisitPage/ZD_DC_DY_ZZ';

import { mapState } from "vuex";

export default {
  components: {
    switchDataMonth,
    staffMessage,
    ZD_BF_DR_RY,
    ZD_BF_DR_ZZ,
    ZD_BF_DY_RY,
    ZD_BF_DY_ZZ,
    JXS_BF_DY_ZZ,
    JXS_BF_DR_ZZ,
    JXS_BF_DR_RY,
    JXS_BF_DY_RY,

    ZD_ZF_DR_RY,
    ZD_ZF_DY_RY,
    ZD_ZF_DR_ZZ,
    ZD_ZF_DR_ZZ,

    JXS_ZF_DR_RY,
    JXS_ZF_DY_RY,
    JXS_ZF_DR_ZZ,
    JXS_ZF_DR_ZZ,

    ZD_DC_DR_RY,
    ZD_DC_DY_RY,
    ZD_DC_DR_ZZ,
    ZD_DC_DR_ZZ,
  },
  created() {
    this.changePageTitleName();
    this.determineUrlByStoreParam();
  },
  data() {
    return {
      componentName: ""
    }
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
    // 根据 terminalVisitReportStore 仓库中的参数确定访问URL及访问参数
    determineUrlByStoreParam() {
      // 判断是否有时间，第一次初始化的情况下是没有的
      if (!this.terminalVisitQueryTime) return;

      let url = `${this.targetType}_${this.reportType}_${this.dateOrMonth}_${this.userOrOrganization}`;
      let queryObj = {
        appuser: "11223344",
        org_code: "50030414"
      };

      // 判断日期方式，按月份筛选月份只取月，日期自己加上去，按日期正常传
      if (this.dateOrMonth === "DR") {
        queryObj["visit_date"] = this.terminalVisitQueryTime;
      } else {
        queryObj["start_date"] = `${this.terminalVisitQueryTime}-1`;
        queryObj["end_date"] = `${this.terminalVisitQueryTime}-31`;
      }

      if (this.userOrOrganization === "RY") {
        queryObj["user_bp"] = "0011223344";
      }

      queryObj["org_type"] = "3";
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
      reportMessage: state => state.terminalVisitReportStore.reportMessage
    })
  }
};
</script>

<style scoped>
@import url("./index.css");
</style>