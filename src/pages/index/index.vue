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
      <reportSelectTree :tree="userOrOrganizationList" />
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

      /**
       * @description 组织业务员筛选列表JSON格式
       * @param {Array} userList 业务员列表
       * @param {Array} organizationList 组织列表
       */
      userOrOrganizationList: {
        userList: [
          {
            name: "张三",
            id: 1
          },
          {
            name: "李四",
            id: 2
          }
        ],
        organizationList: [
          {
            name: "成都大区",
            id: 10220,
            children: {
              userList: [
                {
                  name: "张三",
                  id: 1
                },
                {
                  name: "李四",
                  id: 2
                }
              ],
              organizationList: [
                {
                  name: "成都大区",
                  id: 10220,
                  children: {
                    userList: [
                      {
                        name: "张三",
                        id: 1
                      },
                      {
                        name: "李四",
                        id: 2
                      }
                    ]
                  }
                },
                {
                  name: "绵羊大区",
                  id: 10221
                },
                {
                  name: "乐山大区",
                  id: 10222
                }
              ]
            }
          },
          {
            name: "绵羊大区",
            id: 10221
          },
          {
            name: "乐山大区",
            id: 10222
          }
        ]
      }
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