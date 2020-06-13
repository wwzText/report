<template>
  <!-- 业务员信息 -->
  <div class="staff-message-container">
    <div class="staff-message">
      <span class="staff-name">{{headerMessage.usertxt}}</span>
      <span class="staff-duty">{{headerMessage.position_desc}}</span>
      <p class="staff-work-address">{{headerMessage.org_desc}}</p>
    </div>
    <button class="see-record-btn" @click="seeVisitRecord">查看拜访记录></button>
  </div>
</template>

<script>
export default {

  props: {
    headerMessage: Object
  },
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