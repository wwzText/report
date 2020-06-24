<template>
  <div>
    <salesmanMessage :shareData="shareData" />
    <salesmanNotesMessage :shareData="shareData" />
    <visitQuestion :shareData="shareData" />
    <visitImgList :shareData="shareData" />
    <visitGoodCommandList :shareData="shareData" />
  </div>
</template>

<script>
import salesmanMessage from "@/components/visitRecordList/salesmanMessage"; // 业务员信息
import salesmanNotesMessage from "@/components/visitRecordList/salesmanNotesMessage"; // 业务员离店备注
import visitQuestion from "@/components/visitRecordList/visitQuestion"; // 拜访问题
import visitImgList from "@/components/visitRecordList/visitImgList"; // 拜访照片列表
import visitGoodCommandList from "@/components/visitRecordList/visitGoodCommandList"; // 拜访点赞评论列表

import { getQueryObj } from "@/utils";

export default {
  components: {
    salesmanMessage,
    salesmanNotesMessage,
    visitQuestion,
    visitImgList,
    visitGoodCommandList
  },
  created() {
    // 获取url上的参数
    this.getWorkShareData();
    document.title = '工作圈分享';
  },

  data() {
    return {
      shareData: {}
    };
  },

  methods: {
    // 获取分享的参数
    async getWorkShareData() {
      this.$showLoading();
      this.shareData = await this.$store.dispatch(
        "getShareTerminalVisitDetail",
        {
          obj: getQueryObj()
        }
      );
      this.$hideLoading();
    }
  }
};
</script>