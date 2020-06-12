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
  async created() {
    this.$store.commit("changeHeaderNavTitle", {
      name: "拜访首页"
    });
    
    // NATIVE.getCurrentUserInfo(res => {
    //     console.log('res', res)
    // });
    NATIVE.sendMessageToAndroid(res => {
        console.log('res',res)
    });
  }
};
</script>

<style scoped>
@import url("./index.css");
</style>