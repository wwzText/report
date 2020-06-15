/**
 * 终端拜访首页
 */
<template>
  <div>
    <switchDataMonth />
    <staffMessage :headerMessage="headerMessage" />
    <visitSwap v-if="userOfOrganization !== 'user'" />
    <visitMessage v-if="userOfOrganization === 'user'" :headerMessage="headerMessage" />
  </div>
</template>

<script>
import switchDataMonth from "@/components/terminalVisitReport/switchDataMonth";
import staffMessage from "@/components/terminalVisitReport/staffMessage";
import visitSwap from "@/components/terminalVisitReport/visitSwap";
// 人员状态下
import visitMessage from "@/components/terminalVisitReport/visitMessage";

import "@/utils/Native/WebViewJavascriptBridge";
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

    this.getUserReportOfDay();

    // NATIVE.getCurrentUserInfo(res => {
    //     console.log('res', res)
    // });
    // let userInfo = NATIVE.sendMessageToAndroid();
    // console.log(userInfo)
  },

  data() {
    return {
      headerMessage: {}
    };
  },

  methods: {
    async getUserReportOfDay() {
      this.$showLoading();
      let userReportOfDay = await this.$store.dispatch("getUserReportOfDay", {
        visit_date: "2020-05-12",
        org_code: "50030414",
        appuser: "11223344",
        user_bp: "0011223344"
      });
      console.log(userReportOfDay);
      this.headerMessage = userReportOfDay.es_summary;
      this.$hideLoading();

      // console.log(userReportOfDay)
    }
  },

  computed: {
    ...mapState({
      userOfOrganization: state => state.terminalVisitReportStore.userOrOrganization,
      dateOrMonth: state => state.terminalVisitReportStore.dateOrMonth,
    })
  }
};
</script>

<style scoped>
@import url("./index.css");
</style>