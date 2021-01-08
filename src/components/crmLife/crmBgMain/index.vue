<template>
  <div :class="bgType == 1 ? 'crm-all-main1' : 'crm-all-main2'">
    <div :class="bgType == 1 ? 'crm-content-bg1' : 'crm-content-bg2'">
      <img src="./../../../assets/img/crm_life/crm_logo.png" class="crm-logo" />
      <div style="flex: 1; overflow: hidden;">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
import { Swiper } from "vue-awesome-swiper";
export default {
  components: {
    Swiper,
  },
  props: {
    // 背景类型，决定使用哪张背景图片
    bgType: {
      type: Number,
      default: 0,
    },
  },
  watch: {
    bgType() {
      console.log(1)
    }
  }
};
</script>

<style scoped>
.crm-logo {
  margin: 18px 0 9px 18px;
  width: 48px;
}
.crm-all-main1,
.crm-all-main2 {
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.crm-content-bg1,
.crm-content-bg2 {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  background-repeat: no-repeat;
  background-size: 90%;
  background-position: 50% 60px;
  height: 100%;
}

.crm-all-main1 {
  background-image: url("./../../../assets/img/crm_life/crm_page_bg.png");
}

.crm-all-main2 {
  background-image: url("./../../../assets/img/crm_life/crm_page_bg2.png");
}

.crm-content-bg1 {
  background-image: url("./../../../assets/img/crm_life/crm_text_bg.png");
}
.crm-content-bg2 {
  background-image: url("./../../../assets/img/crm_life/crm_text_bg2.png");
}
</style>>