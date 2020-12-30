<template>
  <div class="crm-all-main">
    <img src="./../../../assets/img/crm_life/crm_logo.png" class="crm-logo" />
    <div class="crm-content-bg">
      <slot />
    </div>
  </div>
</template>



<style scoped>
.crm-all-main {
  width: 100%;
  height: 100%;
  background-image: url("./../../../assets/img/crm_life/crm_page_bg.png");
  background-repeat: no-repeat;
  background-size: 100%;
}

.crm-logo{
    margin: 18px 0 9px 18px;
    width: 48px;
}

.crm-content-bg {
  width: 90%;
  height: 100%;
  margin: 0 auto;
  background-image: url("./../../../assets/img/crm_life/crm_text_bg.png");
  background-repeat: no-repeat;
  background-size: 100%;
}
</style>