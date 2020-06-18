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
export default {
  props: {
    headerMessage: Object
  },
  methods: {
    // 查看拜访记录
    // 跳转到原生页面
    seeVisitRecord() {
      // this.$bridge.registerhandler("AndroidSend", (data, responseCallback) => {
      //   console.log(data);
      //   responseCallback(data);
      // });
      
      this.$bridge.registerhandler("AndroidSend", (data, responseCallback) => {
        alert("AndroidSend called with:", data);
        responseCallback(data);
      });
  
      this.$bridge.callhandler("webSend", "终于过来了");
    }
  },

  created() {}
};
</script> 

<style lang="less" scoped>
@import url("@/assets/less/theme.less");
@import url("./index.less");
</style>