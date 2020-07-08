<template>
  <div class="work-share-container">
    <!-- <salesmanMessage :shareData="shareData" />
    <salesmanNotesMessage :shareData="shareData" />
    <visitQuestion :shareData="shareData" />-->
    <ViewTitle
      title="评论点赞列表"
      :neednavTo="false"
      style="marginTop: 10px; marginBottom: 1px"
    />
    <visitGoodCommandList v-if="shareData.thumbups_tab" :shareData="shareData" />
    <ViewTitle
      title="图片"
      :neednavTo="false"
      style="marginTop: 10px; marginBottom: 1px"
    />
    <visitImgList v-if="shareData.visit_photo_list" :shareData="shareData" />
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

    document.title = "工作圈分享";
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

<style lang="less" scoped>
.work-share-container{
  background-color: #D9D9D9;
  height: 100%;
  overflow: auto;
}
</style>