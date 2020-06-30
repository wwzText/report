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
    >查看拜访记录></button>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  methods: {
    seeVisitRecord() {
      this.$bridge.callhandler({
        type: "navToAppPath", 
        data: {
          sales_office: this.reportAjaxData.zorg1,
          sales_station: this.reportAjaxData.zorg2,
          sales_group: this.reportAjaxData.zorg3,
          ywy_no: this.reportAjaxData.username,
          detail_type: `${this.targetType}_${this.reportType}`
        }
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
      terminalVisitQueryTime: state => state.terminalVisitReportStore.terminalVisitQueryTime,
      targetType: state => state.terminalVisitReportStore.targetType,
      reportType:  state => state.terminalVisitReportStore.reportType,
    })
  }
};
</script> 

<style lang="less" scoped>
@import url("@/assets/less/theme.less");
@import url("./index.less");
</style>