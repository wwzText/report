<template>
  <div class="page-container">
    <HeaderNav title="终端报表-拜访主页"></HeaderNav>
    <div class="page-container_main"></div>
  </div>
</template>

<script>
import { indexModule } from "@/module/indexModule.js";
export default {
  created() {
    console.log(indexModule);
  }
};
</script>

<style scoped>
@import url("./index.css");
</style>