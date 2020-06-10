<template>
  <!-- 业务员信息 -->
  <div class="salesman-message-container">
    <img
      class="salesman-header"
      :src="shareData.user_head ? shareData.user_head[0].value : ''"
      alt
    />
    <div class="salesman-message-value-container">
      <div class="salesman-name-container">
        <span class="salesman-name">{{shareData.partner_name}}</span>
        <span class="salesman-visit-time">{{shareData.leave_data}}</span>
      </div>
      <p class="salesman-address">{{shareData.position}}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    shareData: Object
  }
};
</script>

<style lang="less" scoped>
@import url("./index.less");
</style>