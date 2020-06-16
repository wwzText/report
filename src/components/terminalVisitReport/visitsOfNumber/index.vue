<template>
  <!-- 拜访效率 -->
  <div>
    <visitData :visitData="visitData" />
    <ViewTitle @click="visitTrend" title="当月拜访趋势" style="marginTop: 10px; marginBottom: 10px" />
    <ViewTitle title="所在工作站排行榜" @click="handleToRanking" describe="日均拜访家数" message="全部（10）" />
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
          dataData: 2,
          dataUnit: "家",
          dataTitle: "日均拜访家数"
        }, {
          dataData: 3,
          dataUnit: "次",
          dataTitle: "日均次数"
        }, {
          dataData: 4,
          dataUnit: "天",
          dataTitle: "拜访天数"
        }, {
          dataData: 5,
          dataUnit: "小时",
          dataTitle: "日均拜访时长"
        }
      ],
      rankList: [
        {
          name: '张三',
          rankingMessage: '20',
          rankingMessageUnit: '家'
        }, {
          name: '李四',
          rankingMessage: '210',
          rankingMessageUnit: '家'
        }, {
          name: '王五',
          rankingMessage: '1201',
          rankingMessageUnit: '家'
        }, {
          name: '赵六',
          rankingMessage: '120',
          rankingMessageUnit: '家'
        }, {
          name: '孙七',
          rankingMessage: '20',
          rankingMessageUnit: '家'
        }
      ]
    };
  },
  methods: {
      visitTrend() {
          this.$router.push('visitTrend')
      },

      handleToRanking() {
        this.$router.push('visitRanking')
      }
  }
};
</script>

<style lang="less" scoped>
@import url("./index.less");
</style>