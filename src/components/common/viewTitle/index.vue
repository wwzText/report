<template>
  <div class="view-title-container" @click="handleViewTitleClick">
    <span class="view-title-title">{{title}}</span>
    <span class="view-title-describe">{{describe}}</span>
    <span class="view-title-message" v-if="neednavTo">{{message || '查看'}}</span>
    <span class="iconfont iconqianjin-01" v-if="neednavTo"></span>
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    title: String, // 标题
    describe: String, // 描述
    message: String, // 额外展示信息
    neednavTo: {
      type: Boolean,
      default: true
    } // 是否需要跳转
  },
  methods: {
    handleViewTitleClick() {
      if (this.neednavTo) {
        this.$emit("click");
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import url("./index.less");
</style>