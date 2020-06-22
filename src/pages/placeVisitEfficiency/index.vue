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
          <span class="place-visit-num">{{es_summary.visit_ev}}</span> 家
        </span>
        <span class="place-visit-tip">
          终端数
          <span class="place-visit-num">{{es_summary.count_ev}}</span> 家
        </span>
      </div>
      <VanCircle
        :text="es_summary.rate_ev"
        :speed="10"
        size="64"
        layer-color="#e8e8e8"
        color="#F99C34"
        :value="(es_summary.visit_ev / es_summary.count_ev).toFixed(0)"
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
          <span class="place-visit-num">{{es_summary.visit_re}}</span> 家
        </span>
        <span class="place-visit-tip">
          终端数
          <span class="place-visit-num">{{es_summary.count_re}}</span> 家
        </span>
      </div>
      <VanCircle
        :text="es_summary.rate_re"
        :speed="10"
        size="64"
        layer-color="#e8e8e8"
        color="#F99C34"
        :value="(es_summary.visit_re / es_summary.count_re).toFixed(0)"
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
          <span class="place-visit-num">{{es_summary.visit_ka}}</span> 家
        </span>
        <span class="place-visit-tip">
          终端数
          <span class="place-visit-num">{{es_summary.count_ka}}</span> 家
        </span>
      </div>
      <VanCircle
        :text="es_summary.rate_ka"
        :speed="10"
        size="64"
        layer-color="#e8e8e8"
        color="#F99C34"
        :value="(es_summary.visit_ka / es_summary.count_ka).toFixed(0)"
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
          <span class="place-visit-num">{{es_summary.visit_rt}}</span> 家
        </span>
        <span class="place-visit-tip">
          终端数
          <span class="place-visit-num">{{es_summary.count_rt}}</span> 家
        </span>
      </div>
      <VanCircle
        :text="es_summary.rate_rt"
        :speed="10"
        size="64"
        layer-color="#e8e8e8"
        color="#F99C34"
        :value="(es_summary.visit_rt / es_summary.count_rt).toFixed(0)"
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
  watch: {
    es_summary(val) {
      console.log('val', val)
    }
  },
  computed: {
    ...mapState({
      es_summary: state =>
        state.terminalVisitReportStore.reportMessage.es_summary
    })
  }
};
</script>

<style lang="less" scoped>
@import url("./index.less");
</style>