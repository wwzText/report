// 报表入口页面弹出窗口的树组件
<template>
  <Collapse v-model="activeName" accordion>
    <div class="user-item-main" v-for="item in tree.userList" :key="item.id">
      <p class="user-item">{{item.name}}</p>
      <img @click="navToVisitReport('RY')" src="./../../assets/img/report_icon.png" alt />
    </div>
    <Collapse-item
      :value="1"
      :title="item.name"
      :name="item.id"
      v-for="item in tree.organizationList"
      :key="item.id"
    >
      <!-- {{item.name}} -->
      <template #value>
        <img @click="navToVisitReport('ZZ')" src="./../../assets/img/report_icon.png" alt />
      </template>
      <reportSelectTree :tree="item.children" v-if="item.children" />
    </Collapse-item>
  </Collapse>
</template>

<script>
export default {
  name: "reportSelectTree",
  props: {
    tree: Object
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
    navToVisitReport(payload) {
      this.$store.commit('setTerminalUserOrOrganization', {
        type: payload === 'RY' ? 'user' : 'organization'
      })
      this.$router.push("/report/terminalVisitReport");
    }
  }
};
</script>

<style lang="less">
@import url("./index.less");
</style>