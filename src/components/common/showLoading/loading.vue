<template>
  <div class="loading-container" v-if="showLoadingBool">
    <Loading vertical>{{loadingText}}</Loading>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loadingText: '加载中...',
      showLoadingBool: false
    }
  }
}
</script>

<style scoped>
.loading-container {
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 999;
}
.loading-text {
  font-size: 14px;
  margin-top: 10px;
}
</style>