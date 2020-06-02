<template>
  <div>
    <div class="switch-conatiner">
      <div class="select-container" @click="showSelectDateComponent">
        <span>{{showSelectDate}}</span>
        <span class="iconfont iconmenu-down"></span>
      </div>
      <div class="use-type-container" @click="chooseRankingType">
        <span>{{rankingTypeStr}}</span>
        <span class="iconfont iconmenu-down"></span>
      </div>
    </div>

    <monthList :showMonth="showMonthSelect" @closePopup="closeMonthPopup" />
    <ActionSheet
      :close-on-click-overlay="false"
      @cancel="closeRankingTypeAction"
      @select="selectRankingType"
      :actions="rankingType"
      v-model="showRankingSelect"
      cancel-text="取消"
    ></ActionSheet>

    <RankingList style="marginTop: 10px" :header="tableHeaderConfig" :rankList="rankList" />
  </div>
</template>

<script>
import monthList from "@/components/terminalVisitReport/monthList";
import { ActionSheet } from "vant";

export default {
  components: {
    monthList,
    ActionSheet
  },
  data() {
    return {
      showSelectDate: "",
      rankingTypeStr: "日均拜访天数",
      showMonthSelect: false, // 显示最近6个月选择器

      showRankingSelect: false, // 显示排行榜类型选择器
      tableHeaderConfig: [
          {
              title: '排行/名称',
              code: 'title'
          }, {
              title: '日均拜访家数',
              code: 'one'
          }, {
              title: '日均次数',
              code: 'two'
          }, {
              title: '拜访天数',
              code: 'three'
          }, {
              title: '日均拜访时长',
              code: 'four'
          }
      ],
      rankList: [
        {
          name: "张三",
          one: 11,
          two: 12,
          three: 13,
          four: 14,
        },
        {
          name: "李四",
          one: 11,
          two: 12,
          three: 13,
          four: 14,
        },
        {
          name: "王五",
          one: 11,
          two: 12,
          three: 13,
          four: 14,
        },
        {
          name: "赵六",
          one: 11,
          two: 12,
          three: 13,
          four: 14,
        },
        {
          name: "孙七",
          one: 11,
          two: 12,
          three: 13,
          four: 14,
        }
      ],
      rankingType: [
        {
          name: "日均拜访家数"
        },
        {
          name: "拜访总时长"
        },
        {
          name: "有效拜访率"
        }
      ]
    };
  },
  created() {
    this.curShowSelectDate();
  },
  methods: {
    // 初始化月份为当月
    curShowSelectDate() {
      let date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      this.showSelectDate = `${year}-${month}`;
    },
    // 显示选择查看时间
    showSelectDateComponent() {
      this.showMonthSelect = true;
    },

    // 弹出选择排行榜类型
    chooseRankingType() {
      this.showRankingSelect = true;
    },

    // 关闭月份选择弹出框
    closeMonthPopup(e) {
      this.showMonthSelect = false;
      e.timeStr ? (this.showSelectDate = e.timeStr) : null;
    },

    // 关闭类型选择器
    closeRankingTypeAction() {
      this.showRankingSelect = false;
    },

    // 选择排名类型
    selectRankingType(e) {
      this.rankingTypeStr = e.name;
      this.showRankingSelect = false;
    }
  }
};
</script>

<style lang="less" scoped>
@import url("./index.less");
</style>