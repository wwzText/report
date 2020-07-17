// 报表入口页面弹出窗口的树组件
<template>
  <div>
    <Collapse v-model="activeName" accordion>
      <template v-for="(item, index) in tree">
        <Collapse-item  v-if='!item.usertxt' :key="item.id" :title="rightName(item)" :name="item.id">
          <!-- {{item.name}} -->
          <template #value>
            <img @click="navToVisitReport('ZZ', item)" class="pc-img" src="./../../assets/img/report_icon.png" alt />
          </template>
          <reportSelectTree :tree="item.children" v-if="item.children" />
        </Collapse-item>
        <div :key="'people' + index" v-if='item.usertxt' class="tree-people-main">
            <span class="tree-people-name">{{item.usertxt}}</span>
            <img @click="navToVisitReport('RY', item)" class="pc-img" src="./../../assets/img/report_icon.png" alt />
        </div>
      </template>
    </Collapse>
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
      treeObj: this.tree,
      activeName: ""
    };
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
    navToVisitReport(payload, item) {
      this.$store.commit("setTerminalUserOrOrganization", {
        type: payload === "RY" ? "RY" : "ZZ",
        reportAjaxData: item
      });
      
      this.$router.push("/report/terminalVisitReport");
    },
    rightName(item) {
      if (item.usertxt) {
        return item.usertxt;
      }
      if (item.zorg3_txt) {
        return item.zorg3_txt;
      }
      if (item.zorg2_txt) {
        return item.zorg2_txt;
      }
      if (item.zorg1_txt) {
        return item.zorg1_txt;
      }
    }
  },
  computed: {
    componentIsCollapse() {
      if (this.tree[0].children[0].children) {
        return true;
      }
      return false;
    }
  }
};
</script>

<style lang="less">
@import url("./index.less");
</style>