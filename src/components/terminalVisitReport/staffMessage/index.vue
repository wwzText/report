<template>
  <!-- 业务员信息 -->
  <div class="staff-message-container">
    <div class="staff-message">
      <span class="staff-name">{{headerMessage.usertxt || headerMessage.org_desc}}</span>
      <span class="staff-duty">{{headerMessage.position_desc}}</span>
      <p class="staff-work-address">{{headerMessage.org_desc_sup || headerMessage.org_desc}}</p>
    </div>
    <button
      class="see-record-btn"
      v-if="userOrOrganization == 'RY' && dateOrMonth == 'DR'"
      @click="seeVisitRecord"
    >查看{{reportTypeStr}}记录></button>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      reportTypeStr: ""
    }
  },
  created() {
    this.reportTypeStr =
      this.reportType == "BF"
        ? "拜访"
        : this.reportType == "ZF"
        ? "走访"
        : "督查";
  },
  methods: {
    seeVisitRecord() {
      let data = {
        im_date: this.terminalVisitQueryTime,

        sales_office: this.reportAjaxData
          ? this.reportAjaxData.zorg1.replace("O ", "")
            ? this.reportAjaxData.zorg1.replace("O", "")
            : ""
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

        detail_type: `${this.targetType}_${this.reportType}`
      };

      this.$bridge.callhandler({
        type: "navToAppPath",
        data
      });
    }
  },
  computed: {
    ...mapState({
      userOrOrganization: state =>
        state.terminalVisitReportStore.userOrOrganization,
      dateOrMonth: state => state.terminalVisitReportStore.dateOrMonth,
      headerMessage: state => state.terminalVisitReportStore.headerMessage,
      reportAjaxData: state => state.terminalVisitReportStore.reportAjaxData,
      terminalVisitQueryTime: state =>
        state.terminalVisitReportStore.terminalVisitQueryTime,
      targetType: state => state.terminalVisitReportStore.targetType,
      reportType: state => state.terminalVisitReportStore.reportType,
      userInfo: state => state.userInfoStore.userInfo
    })
  }
};
</script> 

<style lang="less" scoped>
@import url("@/assets/less/theme.less");
@import url("./index.less");
</style>