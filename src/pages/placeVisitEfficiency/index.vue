<template>
  <!-- 分场所拜访效率 -->
  <div>
    <div class="place-container">
      <div class="place-message-container">
        <div class="space-name-container">
          <img src="./../../assets/img/placeKTV.png" alt />
          <span class="place-name">夜场</span>
        </div>
        <span class="place-visit-tip">拜访家数 <span class="place-visit-num">40</span> 家</span>
        <span class="place-visit-tip">中端数 <span class="place-visit-num">120</span> 家</span>
      </div>
      <VanCircle :text="circleText()" v-model="curRate" :speed="100" :rate="50" size="64" layer-color="#e8e8e8" color="#F99C34" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
        curRate: 0
    };
  },
  methods: {
      circleText() {
          return `${(40 / 120 * 100).toFixed(2)} %`
      }
  }
};
</script>

<style lang="less" scoped>
@import url("./index.less");
</style>