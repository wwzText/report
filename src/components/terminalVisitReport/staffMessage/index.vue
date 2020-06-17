<template>
  <!-- 业务员信息 -->
  <div class="staff-message-container">
    <div class="staff-message">
      <span class="staff-name">{{headerMessage.usertxt || headerMessage.org_desc}}</span>
      <span class="staff-duty">{{headerMessage.position_desc}}</span>
      <p
        class="staff-work-address"
      >{{headerMessage.usertxt ? headerMessage.org_desc : headerMessage.org_desc_sup}}</p>
    </div>
    <button class="see-record-btn" @click="seeVisitRecord">查看拜访记录></button>
  </div>
</template>

<script>
import { NATIVE } from "@/utils/Native";
export default {
  props: {
    headerMessage: Object
  },
  methods: {
    // 查看拜访记录
    // 跳转到原生页面
    seeVisitRecord() {
      // this.$router.push("visitRecordList");
      NATIVE.sendMessageToAndroid("11", res => {
        console.log(res);
      }); 
    }
  },

  created() {
    NATIVE.sendMessageToAndroid("11", res => {
      console.log(res);
    });
  }
};
</script> 

<style lang="less" scoped>
@import url("@/assets/less/theme.less");
@import url("./index.less");
</style>