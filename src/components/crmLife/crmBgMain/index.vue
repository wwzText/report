<template>
  <div :class="'crm-all-main' + bgType">
    <div :class="'crm-content-bg' + bgType">
      <img src="./../../../assets/img/crm_life/crm_logo.png" class="crm-logo" />
      <Swiper>
        <slot />
      </Swiper>
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
      default: 1,
    },
  },
};
</script>

<style scoped>
.crm-all-main1 {
  width: 100%;
  height: 100%;
  background-image: url("./../../../assets/img/crm_life/crm_page_bg.png");
  background-repeat: no-repeat;
  background-size: 100%;
}

.crm-logo {
  margin: 18px 0 9px 18px;
  width: 48px;
}

.crm-content-bg1 {
  width: 90%;
  height: 100%;
  margin: 0 auto;
  background-image: url("./../../../assets/img/crm_life/crm_text_bg.png");
  background-repeat: no-repeat;
  background-size: 100%;
  background-position-y: 60px;
}

.crm-all-main2 {
  width: 100%;
  height: 100%;
  background-image: url("./../../../assets/img/crm_life/crm_page_bg2.png");
  background-repeat: no-repeat;
  background-size: 100%;
}

.crm-content-bg2 {
  width: 90%;
  height: 100%;
  margin: 0 auto;
  background-image: url("./../../../assets/img/crm_life/crm_text_bg2.png");
  background-repeat: no-repeat;
  background-size: 100%;
  background-position-y: 60px;
}
</style>>