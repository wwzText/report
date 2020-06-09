<template>
  <div>这是工作圈分享页面</div>
</template>

<script>
import { Http } from "@/api";
import { timeStampToTime } from "@/utils";
export default {
  created() {
    // 获取url上的参数
    this.getQueryData();

    // 获取工作圈分享内容
    this.getWorkShareData();
  },

  methods: {
    getQueryData() {
      this.$showLoading();
      let query = location.href.split("?")[1].split("&");
      let queryObj = {};
      query.map(item => {
        let itemArr = item.split("=");
        queryObj[itemArr[0]] = itemArr[1];
      });

      this.getShareDataOfObj = queryObj;
    },

    async getWorkShareData() {
      let sharaData = await Http.request("getWorkCircleDetail", {
        ...this.getShareDataOfObj
      });
			this.$hideLoading();
			console.log(timeStampToTime(sharaData[0].visit_out_time, 'H:M:S'))
    }
  }
};
</script>