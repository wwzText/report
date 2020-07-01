<template>
  <!-- 分场所拜访效率 -->
  <div>
    <div class="place-container">
      <div class="place-message-container">
        <div class="space-name-container">
          <img src="./../../assets/img/placeKTV.png" alt />
          <span class="place-name">夜场</span>
        </div>
        <span class="place-visit-tip">
          拜访家数
          <span class="place-visit-num">{{headerMessage.visit_ev}}</span> 家
        </span>
        <span class="place-visit-tip">
          终端数
          <span class="place-visit-num">{{headerMessage.count_ev}}</span> 家
        </span>
      </div>
      <VanCircle
        :text="headerMessage.rate_ev"
        :speed="10"
        size="64"
        layer-color="#e8e8e8"
        color="#F99C34"
        :value="(headerMessage.visit_ev / headerMessage.count_ev)"
      />
    </div>

    <div class="place-container">
      <div class="place-message-container">
        <div class="space-name-container">
          <img src="./../../assets/img/placeRetail.png" alt />
          <span class="place-name">传统零售</span>
        </div>
        <span class="place-visit-tip">
          拜访家数
          <span class="place-visit-num">{{headerMessage.visit_re}}</span> 家
        </span>
        <span class="place-visit-tip">
          终端数
          <span class="place-visit-num">{{headerMessage.count_re}}</span> 家
        </span>
      </div>
      <VanCircle
        :text="headerMessage.rate_re"
        :speed="10"
        size="64"
        layer-color="#e8e8e8"
        color="#F99C34"
        :value="(headerMessage.visit_re / headerMessage.count_re)"
      />
    </div>

    <div class="place-container">
      <div class="place-message-container">
        <div class="space-name-container">
          <img src="./../../assets/img/placeKa.png" alt />
          <span class="place-name">KA</span>
        </div>
        <span class="place-visit-tip">
          拜访家数
          <span class="place-visit-num">{{headerMessage.visit_ka}}</span> 家
        </span>
        <span class="place-visit-tip">
          终端数
          <span class="place-visit-num">{{headerMessage.count_ka}}</span> 家
        </span>
      </div>
      <VanCircle
        :text="headerMessage.rate_ka"
        :speed="10"
        size="64"
        layer-color="#e8e8e8"
        color="#F99C34"
        :value="(headerMessage.visit_ka / headerMessage.count_ka)"
      />
    </div>

    <div class="place-container">
      <div class="place-message-container">
        <div class="space-name-container">
          <img src="./../../assets/img/placefood.png" alt />
          <span class="place-name">餐饮</span>
        </div>
        <span class="place-visit-tip">
          拜访家数
          <span class="place-visit-num">{{headerMessage.visit_rt}}</span> 家
        </span>
        <span class="place-visit-tip">
          终端数
          <span class="place-visit-num">{{headerMessage.count_rt}}</span> 家
        </span>
      </div>
      <VanCircle
        :text="headerMessage.rate_rt"
        :speed="10"
        size="64"
        layer-color="#e8e8e8"
        color="#F99C34"
        :value="(headerMessage.visit_rt / headerMessage.count_rt)"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      curRate: 0
    };
  },
  computed: {
    ...mapState({
      headerMessage: state =>
        state.terminalVisitReportStore.headerMessage
    })
  }
};
</script>

<style lang="less" scoped>
@import url("./index.less");
</style>