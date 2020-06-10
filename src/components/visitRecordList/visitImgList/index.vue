<template>
  <!-- 拜访照片列表 -->
  <ul class="visit-images-intercept-container">
    <li v-for="(item, index) in shareData.visit_photo_list" :key="index" class="visit-item">
      <vanImage class="img-item" :src="item" @click="previewImg(index)" />
      <div v-if="index == 3" class="tip-more-container" @click="seeAllVisitImg">
          <span class="tip-text">查看全部</span>
          <span class="tip-text">共{{shareData.visit_photo_list.length}}张</span>
      </div>
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
      // 查看所有拜访照片
      seeAllVisitImg() {

      }
  }
};
</script>

<style lang="less" scoped>
@import url("./index.less");
</style>