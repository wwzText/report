<template>
  <div>
    <!-- 标题导航组件 -->
    <titleNav
      :titleList="titleNavList"
      :curTitleIndex="curTitleIndex"
      @navTitleIndexChange="navTitleIndexChange"
      style="marginBottom: 10px"
    />

    <!-- swapper切换组件，根据curTitleIndex变化，双向绑定 -->
    <Swipe
        indicator-color="white" 
        :loop="false"
        :show-indicators="false"
        @change="swipeIndexChange"
        ref="visitSwipe"
    >
      <SwipeItem>
        <!-- 拜访效率 -->
        <visitsOfNumber />
      </SwipeItem>
      <SwipeItem>
        <!-- 拜访时长 -->
        <visitTimeLong />
      </SwipeItem>
      <SwipeItem>
          <!-- 拜访有效率 -->
          <visitEfficiency />
      </SwipeItem>
      <SwipeItem>
        <!-- 当月拜访计划 -->
        <visitPlan />
      </SwipeItem>
    </Swipe>
  </div>
</template>

<script>
import titleNav from "@/components/common/titleNav";
import visitsOfNumber from "./../visitsOfNumber"; // 拜访效率
import visitEfficiency from "@/components/terminalVisitReport/visitEfficiency"; //拜访有效率组件
import visitTimeLong from "@/components/terminalVisitReport/visitTimeLong"; // 拜访时长
import visitPlan from "@/components/terminalVisitReport/visitPlan"; //当月拜访计划
export default {
  components: {
    titleNav,
    visitEfficiency,
    visitsOfNumber,
    visitTimeLong,
    visitPlan,
  },
  data() {
    return {
      titleNavList: ["拜访效率", "拜访时长", "拜访有效率", "当月拜访计划"], // 标题导航列表
      curTitleIndex: 0 // 标题导航当前选中下标
    };
  },
  methods: {
    navTitleIndexChange(obj) {
      this.curTitleIndex = obj.index;
      this.$refs.visitSwipe.swipeTo(obj.index)
    },

    swipeIndexChange(e) {
      this.curTitleIndex = e;
    }
  }
};
</script>

<style lang="less" scoped>
@import url("./index.less");
</style>