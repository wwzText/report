<template>
  <div>
      <salesmanMessage />
      <salesmanNotesMessage />
      <visitQuestion />
      <visitImgList />
      <visitGoodCommandList />
  </div>
</template>

<script>
import salesmanMessage from "@/components/visitRecordList/salesmanMessage"; // 业务员信息
import salesmanNotesMessage from "@/components/visitRecordList/salesmanNotesMessage"; // 业务员离店备注
import visitQuestion from '@/components/visitRecordList/visitQuestion'; // 拜访问题
import visitImgList from '@/components/visitRecordList/visitImgList'; // 拜访照片列表
import visitGoodCommandList from '@/components/visitRecordList/visitGoodCommandList'; // 拜访点赞评论列表


export default {
  components: {
    salesmanMessage,
    salesmanNotesMessage,
    visitQuestion,
    visitImgList,
    visitGoodCommandList,
  },
  created() {
    this.$store.commit("changeHeaderNavTitle", {
      name: "拜访记录"
    });
  }
};
</script>

<style lang="less" scoped>
</style>