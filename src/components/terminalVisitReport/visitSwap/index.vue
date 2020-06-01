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
    >
      <SwipeItem>
        <visitsOfNumber />
      </SwipeItem>
      <SwipeItem>2</SwipeItem>
      <SwipeItem>
          <visitEfficiency />
      </SwipeItem>
      <SwipeItem>4</SwipeItem>
    </Swipe>
  </div>
</template>

<script>
import titleNav from "@/components/common/titleNav";
import visitsOfNumber from "./../visitsOfNumber"; // 拜访效率
import visitEfficiency from "@/components/terminalVisitReport/visitEfficiency"; //拜访有效率组件

export default {
  components: {
    titleNav,
    visitEfficiency,
    visitsOfNumber,
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
    }
  }
};
</script>

<style lang="less" scoped>
@import url("./index.less");
</style>