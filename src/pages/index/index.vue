/**
 * 报表列表页面
 */
<template>
  <div>
    
  </div>
</template>

<script>
// import { indexModule } from "@/module/indexModule.js";


export default {
  data() {
    return {
      test: 11,
      test1: "asa"
    };
  },
  methods: {
    seeTerminalReportIndex() {
      this.$router.push('/workCircle/terminalVisitReport');
    }
  }
};
</script>

<style scoped>
@import url("./index.css");
</style>