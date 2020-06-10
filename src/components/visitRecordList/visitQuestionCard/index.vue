<template>
  <!-- 拜访问题标签 -->
  <ul class="question-card-container">
    <li v-for="(item, index) in check_info" :key="index">
      <span :class="judgeClass(item.step_result)">{{item.step_name}}</span>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    check_info: Array
  },
  data() {
    return {};
  },

  methods: {
    // 根据问题的类型返回不同的class，改变颜色
    judgeClass(type) {
      let className = "";
      switch (type * 1) {
        case 1:
          className = "not-question";
          break;
        case 2:
          className = "have-question";
          break;
        case 0:
          className = "not-judge";
          break;
      }
      return className;
    }
  }
};
</script>

<style lang="less" scoped>
@import url("./index.less");
</style>