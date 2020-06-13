/**
 * 报表列表页面
 */
<template>
  <div>
    <div class="index-list-container">
      <div class="index-list-item" @click="showPeopleSelectPopup(1)">
        <img class="index-list-item_img" src="./../../assets/img/zd_bf.png" />
        <span class="index-list-item_name">终端拜访</span>
        <span class="iconfont iconqianjin-01"></span>
      </div>
      <div class="index-list-item index-list-margin-item">
        <img class="index-list-item_img" src="./../../assets/img/jxs_bf.png" />
        <span class="index-list-item_name">经销商拜访</span>
        <span class="iconfont iconqianjin-01"></span>
      </div>
      <div class="index-list-item">
        <img class="index-list-item_img" src="./../../assets/img/zd_zf.png" />
        <span class="index-list-item_name">终端走访</span>
        <span class="iconfont iconqianjin-01"></span>
      </div>
      <div class="index-list-item index-list-margin-item">
        <img class="index-list-item_img" src="./../../assets/img/jxs_zf.png" />
        <span class="index-list-item_name">经销商走访</span>
        <span class="iconfont iconqianjin-01"></span>
      </div>
      <div class="index-list-item">
        <img class="index-list-item_img" src="./../../assets/img/zd_dc.png" />
        <span class="index-list-item_name">终端督查</span>
        <span class="iconfont iconqianjin-01"></span>
      </div>
      <div class="index-list-item index-list-margin-item">
        <img class="index-list-item_img" src="./../../assets/img/jxs_dc.png" />
        <span class="index-list-item_name">经销商督查</span>
        <span class="iconfont iconqianjin-01"></span>
      </div>
    </div>
    <Popup v-model="showPopup" position="right" :style="{ height: '100%', width: '90%' }">
      <reportSelectTree :tree="tree" />
    </Popup>
  </div>
</template>

<script>

import reportSelectTree from "@/components/reportSelectTree";
export default {
  async created() {
    this.$store.commit("changeHeaderNavTitle", {
      name: "分析报表"
    });

  },
  components: {
    reportSelectTree
  },
  data() {
    return {
      showPopup: true, // 是否弹出人员/部门选择框
      tree: [
        {
          name: "一部门",
          id: 1,
          children: [
            {
              name: "1小组"
            }
          ]
        },
        {
          name: "二部门",
          id: 2,
          children: [
            {
              name: "2小组"
            }
          ]
        },
        {
          name: "三部门",
          id: 3,
          children: [
            {
              name: "3小组"
            }
          ]
        }
      ]
    };
  },
  methods: {
    showPeopleSelectPopup(selectIndex) {
      console.log(selectIndex);
      this.showPopup = true;
    }
  }
};
</script>

<style lang="less" scoped>
@import url("./index.less");
</style>