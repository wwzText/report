/**
 * 终端拜访首页
 */
<template>
  <div>
    <switchDataMonth />
    <staffMessage />
    <visitSwap />
  </div>
</template>

<script>
import switchDataMonth from "@/components/terminalVisitReport/switchDataMonth";
import staffMessage from "@/components/terminalVisitReport/staffMessage";
import visitSwap from "@/components/terminalVisitReport/visitSwap";
import { NATIVE } from "@/utils/Native";
import "@/utils/Native/WebViewJavascriptBridge";

export default {
  components: {
    switchDataMonth,
    staffMessage,
    visitSwap
  },
  created() {
    this.$store.commit("changeHeaderNavTitle", {
      name: "拜访首页"
    });

    this.getUserReportOfDay();
    
    NATIVE.getCurrentUserInfo(res => {
        console.log('res', res)
    });
    // let userInfo = NATIVE.sendMessageToAndroid();
    // console.log(userInfo)
  },

  methods: {
    async getUserReportOfDay() {
      let userReportOfDay = await this.$store.dispatch('getUserReportOfDay', {
        visit_date: "2020-05-12",
        org_code: "50030414",
        appuser: '11223344',
        user_bp: "0011223344"
      });
      console.log(userReportOfDay)
    }
  }
};
</script>

<style scoped>
@import url("./index.css");
</style>