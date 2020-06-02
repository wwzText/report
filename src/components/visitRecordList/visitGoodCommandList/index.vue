<template>
  <div class="good-command-container">
    <div class="good-number-container">
      <span class="iconfont icondianzan-01"></span>
      <span class="good-num">{{goodPeopleList.length}}</span>
      <span class="iconfont iconpinglun-01"></span>
      <span class="good-num">32</span>
    </div>
    <div class="good-list-container">
      <span class="iconfont icondianzan-01"></span>
      <div class="good-people-container">
        <span
          class="good-prople-name"
          v-for="(item, index) in goodPeopleList"
          :key="index"
        >{{item}}，</span>
      </div>
      <span class="all-good-text">共{{goodPeopleList.length}}人点赞</span>
    </div>
    <div class="command-list-container">
        <p v-for="(item, index) in commandPeopleList" :key="index" class="command-item">
            <span class="command-name">{{item.from}}</span>
            <span v-if="item.to"> 回复 </span>
            <span v-if="item.to" class="command-name">{{item.to}}</span>
            <span>：{{item.commandValue}}</span>
        </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      goodPeopleList: [
        "张三",
        "李四",
        "王五",
        "赵6",
        "张三",
        "李四",
        "王五",
        "赵6",
        "张三",
        "李四",
        "王五",
        "赵6",
        "张三",
        "李四",
        "王五",
        "赵6"
      ],
      commandPeopleList: [
        {
          from: "张三",
          commandValue: "测试评论"
        },
        {
          from: "李四",
          to: "张三",
          commandValue: "测试评论回复功能测试评论回复功能测试评论回复功能"
        }
      ]
    };
  }
};
</script>

<style lang="less" scoped>
@import url("./index.less");
</style>