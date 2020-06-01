<template>
  <div>
    <visitData :visitData="visitData" />
    <ViewTitle title="Ta的拜访计划" message="全部（10）" style="marginTop: 10px;" />
    <planList :planList="planList" />
  </div>
</template>

<script>
import visitData from "./../visitData";
import planList from './../planList';
export default {
  components: {
    visitData,
    planList,
  },
  data() {
    return {
      visitData: [
        {
          dataData: "18.0%",
          dataTitle: "计划完成率"
        },
        {
          dataData: "18/100",
          dataTitle: "计划完成占比"
        }
      ],
      planList: [
        {
          planName: "计划标题",
          planTime: "12月1日-12月10日",
          actualNum: 10,
          planNum: 20
        },
        {
          planName: "计划标题",
          planTime: "12月1日-12月10日",
          actualNum: 10,
          planNum: 20
        },
        {
          planName: "计划标题",
          planTime: "12月1日-12月10日",
          actualNum: 10,
          planNum: 20
        }
      ]
    };
  }
};
</script>

<style lang="less" scoped>
</style>