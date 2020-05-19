/**
 * 报表列表页面
 */
<template>
  <div class="page-container">
    <HeaderNav title="统计主页"></HeaderNav>
    <div class="page-container_main">
      <button @click="seeTerminalReportIndex">跳转终端报表主页</button>
      <costomInput v-model="test" />
      <span>{{test}}</span>
      <costomInput v-model="test1" />
      <span>{{test1}}</span>
      <Button type="primary">测试</Button>
      <!-- <van-button type="primary">测试</van-button> -->
    </div>
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
      this.$router.push("/terminalVisitReport");
    }
  }
};
</script>

<style scoped>
@import url("./index.css");
</style>