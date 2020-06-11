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
    NATIVE.getCurrentUserInfo(function(res) {
        console.log(res)
    });

    NATIVE.getCurrentUserInfo(res => {
        console.log(res)
    });
  }

};
</script>

<style scoped>
@import url("./index.css");
</style>