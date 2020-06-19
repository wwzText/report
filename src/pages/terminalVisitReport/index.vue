<template>
  <div>
    <switchDataMonth />
    <staffMessage :headerMessage="es_summary" />
    <visitSwap v-if="dateOrMonth === 'month'" />
    <visitMessage v-if="dateOrMonth === 'date'" :headerMessage="es_summary" />
  </div>
</template>

<script>
import switchDataMonth from "@/components/terminalVisitReport/switchDataMonth";
import staffMessage from "@/components/terminalVisitReport/staffMessage";
import visitSwap from "@/components/terminalVisitReport/visitSwap";
// 人员状态下
import visitMessage from "@/components/terminalVisitReport/visitMessage";
import { mapState } from "vuex";


export default {
  components: {
    switchDataMonth,
    staffMessage,
    visitSwap,
    visitMessage
  },
  created() {
    this.$store.commit("changeHeaderNavTitle", {
      name: "拜访首页"
    });
    this.determineUrlByStoreParam();
  },

  data() {
    return {
      es_summary: {}
    };
  },

  methods: {
    // 根据 terminalVisitReportStore 仓库中的参数确定访问URL及访问参数
    determineUrlByStoreParam() {
      // 判断是否有时间，第一次初始化的情况下是没有的
      if (!this.terminalVisitQueryTime) return;

      let url = `${this.targetType == "terminal" ? "ZD" : "JXS"}_${
        this.reoprtType
      }_${this.dateOrMonth == "date" ? "DR" : "DY"}_${
        this.userOrOrganization == "user" ? "RY" : "ZZ"
      }`;
      let queryObj = {
        appuser: "11223344",
        org_code: "50030414"
      };

      if (this.dateOrMonth === "date") {
        queryObj["visit_date"] = this.terminalVisitQueryTime;
      } else {
        queryObj["start_date"] = `${this.terminalVisitQueryTime}-1`;
        queryObj["end_date"] = `${this.terminalVisitQueryTime}-31`;
      }
      if (this.userOrOrganization === "user") {
        queryObj["user_bp"] = "0011223344";
      } else {
        queryObj["org_type"] = "3";
      }
      this.getReportData(url, queryObj);
    },

    // 根据store中的很多参数实际发起请求
    async getReportData(url, queryObj) {
      this.$showLoading();
      let reportData = await this.$store.dispatch("getReportData", {
        url,
        queryObj
      });
      for (let item in reportData) {
        if (item === "es_summary") {
          this.$store.commit("setEsSummary", {
            es_summary: reportData.es_summary
          });
          this.es_summary = reportData.es_summary;
        }
        if (item === "es_visit_summary") {
          this.$store.commit("setEsSummary", {
            es_summary: reportData.es_visit_summary
          });
          this.es_summary = reportData.es_visit_summary
        }
      }
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
      reoprtType: state => state.terminalVisitReportStore.reoprtType,
      terminalVisitQueryTime: state =>
        state.terminalVisitReportStore.terminalVisitQueryTime
    })
  }
};
</script>

<style scoped>
@import url("./index.css");
</style>