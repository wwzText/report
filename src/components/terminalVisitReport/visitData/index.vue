<template>
  <div class="visit-data-container">
    <ul class="visit-data-main">
      <li class="visit-data-item" v-for="(item, index) in visitData" :key="index">
        <div class="visit-data-message">
          <span class="visit-data-data">{{item.dataData}}</span>
          <span class="visit-data-unit">{{item.dataUnit}}</span>
        </div>
        <p class="visit-data-title">{{item.dataTitle}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    visitData: Array
  }
};
</script>

<style lang="less" scoped>
@import url("./index.less");
</style>