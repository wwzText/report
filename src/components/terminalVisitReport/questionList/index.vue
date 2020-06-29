<template>
  <ul class="question-main">
    <template v-for="(item, index) in list">
      <li :key="index" class="question-item" v-if="item.quest_num != 0">
        <span class="question-name">{{item.quest_desc}}</span>
        <span>{{item.percent}}</span>
        <span class="question-num">{{item.quest_num}}家</span>
        <span class="iconfont iconqianjin-01"></span>
      </li>
    </template>
  </ul>
</template>

<script>
export default {
  props: {
    list: Array
  }
};
</script>

<style lang="less" scoped>
@import url("./index.less");
</style>