/**
 * 报表列表页面
 */
<template>
  <div class="page-container">
    <HeaderNav title="统计主页"></HeaderNav>
    <div class="page-container_main">
      <button @click="seeTerminalReportIndex">跳转终端报表主页</button>
    </div>
  </div>
</template>

<script>
import { indexModule } from "@/module/indexModule.js";
export default {
  created() {
    console.log(indexModule);
  },

  methods: {
    seeTerminalReportIndex() {
      this.$router.push('/terminalVisitReport')
    }
  }
};
</script>

<style scoped>
@import url("./index.css");
</style>