// 报表入口页面弹出窗口的树组件
<template>
  <div class="tree-contaienr">
    <template v-for="(item, index) in treeObj">
      <div :key="index" class="tree-item-container">
        <div class="tree-item-main">
          <span class="tree-name">{{item.name}}</span>
          <img class="tree-report-img" @click="navToVisitReport" src="./../../assets/img/report_icon.png" alt srcset />
          <span
            class="iconfont iconqianjin-01"
            :class="[item.isOpen ? 'open-jiantou' : 'close-jiantou']"
            @click="changeTreeOpenStatus(item)"
            v-if="item.children"
          ></span>
        </div>
        <reportSelectTree :tree="item.children" v-if="item.children && item.isOpen" />
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: "reportSelectTree",
  props: {
    tree: Array
  },
  data() {
      return {
          treeObj: this.tree
      }
  },
  methods: {
    // 修改item的展开状态
    changeTreeOpenStatus(item) {
      let tree = JSON.parse(JSON.stringify(this.treeObj));
      tree.find(t => {
        if (t.id === item.id) {
          t["isOpen"] = !t.isOpen;
        }
      });
      this.treeObj = tree;
    },

    // 跳转到报表详情页面
    navToVisitReport() {
      this.$router.push('/report/terminalVisitReport')
    }
  }
};
</script>

<style lang="less" scoped>
@import url("./index.less");
</style>