<template>
  <!-- 拜访照片列表 -->
  <ul class="visit-images-intercept-container">
    <li v-for="(item, index) in imgList" :key="index" class="visit-item">
      <vanImage class="img-item" :src="item" @click="previewImg(index)" />
      <div v-if="index == 3" class="tip-more-container" @click="seeAllVisitImg">
          <span class="tip-text">查看全部</span>
          <span class="tip-text">共{{imgList.length}}张</span>
      </div>
    </li>
  </ul>
</template>

<script>
import { ImagePreview } from 'vant';
export default {
  data() {
    return {
      imgList: [
        "http://img1.imgtn.bdimg.com/it/u=1268268107,2466926288&fm=26&gp=0.jpg",
        "http://img5.imgtn.bdimg.com/it/u=3518694853,444724462&fm=26&gp=0.jpg",
        "http://img2.imgtn.bdimg.com/it/u=3003457608,2342312610&fm=26&gp=0.jpg",
        "http://img4.imgtn.bdimg.com/it/u=2332537253,3610935447&fm=26&gp=0.jpg",
      ]
    };
  },
  methods: {
      // 图片预览
      previewImg(index) {
          ImagePreview({
              images: this.imgList,
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