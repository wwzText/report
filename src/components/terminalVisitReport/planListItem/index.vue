<template>
  <div class="plan-item-container" @click="seePlanFromNative">
    <p class="plan-item-name">{{item.description}}</p>
    <div class="plan-item-message-container">
      <span class="plan-item-time">{{item.datefrom}} - {{item.dateto}}</span>
      <p class="plan-item-number">
        已拜访
        <span class="plan-item-height-number">{{item.act_num}}</span> /
        <span class="plan-item-height-number">{{item.plan_num}}</span> 总数
      </p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  props: {
    item: Object
  },
  methods: {
    seePlanFromNative() {
      this.$bridge.callhandler({
        type: "personPlanDetail",
        data: {
          appuser: this.reportAjaxData
            ? this.reportAjaxData.username
            : this.userInfo.appuser,

          userBp: this.reportAjaxData
            ? this.reportAjaxData.userbp
            : this.userInfo.partner,
          objectid: this.item.objectid
        }
      });
    }
  },
  computed: {
    ...mapState({
      userInfo: state => state.userInfoStore.userInfo,
      reportAjaxData: state => state.terminalVisitReportStore.reportAjaxData
    })
  }
};
</script>

<style lang="less" scoped>
@import url("./index.less");
</style>