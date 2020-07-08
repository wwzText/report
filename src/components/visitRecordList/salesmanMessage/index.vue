<template>
  <!-- 业务员信息 -->
  <div class="salesman-message-container">
    <img
      class="salesman-header"
      :src="shareWorkCircleDetail ? shareWorkCircleDetail.user_head[0].value : ''"
      alt
    />
    <div class="salesman-message-value-container">
      <div class="salesman-name-container">
        <span class="salesman-name">{{shareWorkCircleDetail ? shareWorkCircleDetail.partner_name : ''}}</span>
        <span class="salesman-visit-time">{{shareWorkCircleDetail ? shareWorkCircleDetail.leave_data : ''}}</span>
      </div>
      <p class="salesman-address">{{shareWorkCircleDetail ? shareWorkCircleDetail.position : ''}}</p>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex';
export default {
  data() {
    return {
      shareData: {}
    }
  },
  // watch: {
  //   shareWorkCircleDetail(val) {
  //     console.log(val)
  //     this.shareData = val
  //   }
  // },
  computed: {
    ...mapState({
      shareWorkCircleDetail: state => state.terminalVisitReportStore.shareWorkCircleDetail
    })
  }
};
</script>

<style lang="less" scoped>
@import url("./index.less");
</style>