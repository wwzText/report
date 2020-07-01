<template>
  <div v-if="rankList.length">
    <ul class="table-header-container">
      <li v-if="header">名字</li>
      <li v-for="(item, index) in header" :key="index" class="header-item-main">
        <span>{{item.name}}</span>
        <span class="header-item-util">{{item.util}}</span>
      </li>
    </ul>
    <ul class="ranking-container">
      <li
        v-for="(item, index) in rankList"
        :style="{display: item.rank == 0 ? 'none' : ''}"
        :key="index"
        class="ranking-item"
      >
        <img v-if="item.rank == 1" src="./../../../assets/img/ranking1.png" alt />
        <img v-if="item.rank == 2" src="./../../../assets/img/ranking2.png" alt />
        <img v-if="item.rank == 3" src="./../../../assets/img/ranking3.png" alt />
        <span
          class="ranking-index"
          v-if="item.rank != 0 && item.rank != 1 && item.rank != 2 && item.rank != 3"
        >{{item.rank}}</span>
        <div class="rank-data-main">
          <span
            class="ranking-name"
            :class="header  ? '' : 'ranking-name--have-header'"
          >{{item.usertxt || item.org_desc}}</span>
          <template v-for="(value, index) in header">
            <span
              :key="index"
              v-if="value.code != 'title'"
              class="table-message-item"
            >{{item[value.value] || 0}}</span>
          </template>
        </div>
        <span v-if="!header" class="ranking-message-value">{{item[only] || 0}}</span>
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
  }
};
</script>

<style lang="less" scoped>
@import url("./index.less");
</style>