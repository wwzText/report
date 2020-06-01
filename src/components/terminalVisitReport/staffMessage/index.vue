<template>
  <!-- 业务员信息 -->
  <div class="staff-message-container">
    <div class="staff-message">
      <span class="staff-name">李某某</span>
      <span class="staff-duty">业务员</span>
      <p class="staff-work-address">XXX大区-XXX业务部-XXX工作站</p>
    </div>
    <button class="see-record-btn" @click="seeVisitRecord">查看拜访记录></button>
  </div>
</template>

<script>
export default {
  methods: {
    // 查看拜访记录
    seeVisitRecord() {
        this.$router.push('visitRecordList')
    }
  }
};
</script>

<style lang="less" scoped>
@import url("@/assets/less/theme.less");
@import url("./index.less");
</style>