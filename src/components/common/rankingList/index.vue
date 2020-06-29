<template>
  <div v-if="rankList.length">
    <ul class="table-header-container">
      <li v-for="(item, index) in header" :key='index'>{{item.title}}</li>
    </ul>
    <ul class="ranking-container">
      <li v-for="(item, index) in rankList" :style="{display: item.rank == 0 ? 'none' : ''}" :key="index" class="ranking-item">
        <img v-if="item.rank == 1" src="./../../../assets/img/ranking1.png" alt />
        <img v-if="item.rank == 2" src="./../../../assets/img/ranking2.png" alt />
        <img v-if="item.rank == 3" src="./../../../assets/img/ranking3.png" alt />
        <span class="ranking-index" v-if="index != 0 && index != 1 && index != 2">{{index}}</span>
        <span class="ranking-name" :class="header  ? '' : 'ranking-name--have-header'">{{item.usertxt || item.org_desc}}</span>
        <template v-for="(value, index) in header">
          <span :key="index" v-if="value.code != 'title'" class="table-message-item">{{item[value.code]}}</span>
        </template>
        <span class="ranking-message-value">{{item[only]}}</span>
        <span class="ranking-message-unit">{{onlyUtil}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    rankList: Array, // 参与排名业务员列表
    rangMessageList: Array, // 用于展示的字段列表，复用时根据各自不同的配置改变显隐顺序
    only: String,
    header: Array, // 表头数组，并用于显示表单中的字段
    onlyUtil: String
  },
  created() {
    console.log(this.only)
  }
};
</script>

<style lang="less" scoped>
@import url("./index.less");
</style>