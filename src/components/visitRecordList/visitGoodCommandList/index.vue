<template>
  <div class="good-command-container">
    <div class="good-number-container">
      <span class="iconfont icondianzan-01" v-if="shareData.thumbups_tab.length"></span>
      <span class="good-num" v-if="shareData.thumbups_tab.length">{{shareData.thumbups_tab.length}}</span>
      <span class="iconfont iconpinglun-01" v-if="shareData.comments_tab.length"></span>
      <span class="good-num" v-if="shareData.comments_tab.length">{{shareData.comments_tab.length}}</span>
    </div>

    <div class="good-list-container">
      <span class="iconfont icondianzan-01"></span>
      <div class="good-people-container">
        <span
          class="good-prople-name"
          v-for="(item, index) in shareData.thumbups_tab"
          :key="index"
        >{{item.usrname}}，</span>
      </div>
      <span class="all-good-text">共{{shareData.thumbups_tab.length}}人点赞</span>
    </div>
    <div class="command-list-container">
        <p v-for="(item, index) in shareData.comments_tab" :key="index" class="command-item">
            <span class="command-name">{{item.usrname}}</span>
            <span v-if="item.to_usrname"> 回复 </span>
            <span v-if="item.to_usrname" class="command-name">{{item.to_usrname}}</span>
            <span>：{{item.zcomment}}</span>
        </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    shareData: Object
  }
};
</script>

<style lang="less" scoped>
@import url("./index.less");
</style>