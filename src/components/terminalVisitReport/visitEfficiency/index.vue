<template>
  <!-- 拜访有效率 -->
  <div>
    <visitData :visitData="visitData" />

    <ViewTitle title="分场所终端拜访率" style="marginTop: 10px; marginBottom: 10px" />
    <ViewTitle title="所在工作站排行榜" describe="日均拜访家数" message="全部（10）" />
    <currentRanking />
    <RankingList :rankList="rankList" />
  </div>
</template>

<script>
import visitData from "./../visitData";
export default {
  components: {
    visitData
  },
  data() {
    return {
      visitData: [
        {
          dataData: "18.0%",
          dataUnit: "59家",
          dataTitle: "有效拜访率"
        },
        {
          dataData: "21.0%",
          dataUnit: "60家",
          dataTitle: "拜访率"
        }
      ],
      rankList: [
        {
          name: "张三",
          rankingMessage: "20",
          rankingMessageUnit: "家"
        },
        {
          name: "李四",
          rankingMessage: "210",
          rankingMessageUnit: "家"
        },
        {
          name: "王五",
          rankingMessage: "1201",
          rankingMessageUnit: "家"
        },
        {
          name: "赵六",
          rankingMessage: "120",
          rankingMessageUnit: "家"
        },
        {
          name: "孙七",
          rankingMessage: "20",
          rankingMessageUnit: "家"
        }
      ]
    };
  }
};
</script>

<style lang="less" scoped>
@import url("./index.less");
</style>