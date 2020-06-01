<template>
  <div>
      <salesmanMessage />
      <salesmanNotesMessage />
      <visitQuestion />
  </div>
</template>

<script>
import salesmanMessage from "@/components/visitRecordList/salesmanMessage"; // 业务员信息
import salesmanNotesMessage from "@/components/visitRecordList/salesmanNotesMessage"; // 业务员离店备注
import visitQuestion from '@/components/visitRecordList/visitQuestion'; // 拜访问题

export default {
  components: {
    salesmanMessage,
    salesmanNotesMessage,
    visitQuestion,
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