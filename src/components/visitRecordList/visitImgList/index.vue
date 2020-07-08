<template>
  <!-- 拜访照片列表 -->
  <ul class="visit-images-intercept-container">
    <li v-for="(item, index) in shareData.visit_photo_list" :key="index" class="visit-item">
      <vanImage class="img-item" :src="item" @click="previewImg(index)" />
    </li>
  </ul>
</template>

<script>
import { ImagePreview } from 'vant';
export default {
  props: {
    shareData: Object
  },
  methods: {
      // 图片预览
      previewImg(index) {
          ImagePreview({
              images: this.shareData.visit_photo_list,
              startPosition: index
          })
      },
  }
};
</script>

<style lang="less" scoped>
@import url("./index.less");
</style>