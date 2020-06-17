/**
 * 报表列表页面
 */
<template>
  <div>
    <div class="index-list-container">
      <div class="index-list-item" @click="showPeopleSelectPopup('terminal', 'BF')">
        <img class="index-list-item_img" src="./../../assets/img/zd_bf.png" />
        <span class="index-list-item_name">终端拜访</span>
        <span class="iconfont iconqianjin-01"></span>
      </div>
      <div
        class="index-list-item index-list-margin-item"
        @click="showPeopleSelectPopup('distributor', 'BF')"
      >
        <img class="index-list-item_img" src="./../../assets/img/jxs_bf.png" />
        <span class="index-list-item_name">经销商拜访</span>
        <span class="iconfont iconqianjin-01"></span>
      </div>
      <div class="index-list-item" @click="showPeopleSelectPopup('terminal', 'ZF')">
        <img class="index-list-item_img" src="./../../assets/img/zd_zf.png" />
        <span class="index-list-item_name">终端走访</span>
        <span class="iconfont iconqianjin-01"></span>
      </div>
      <div
        class="index-list-item index-list-margin-item"
        @click="showPeopleSelectPopup('distributor', 'ZF')"
      >
        <img class="index-list-item_img" src="./../../assets/img/jxs_zf.png" />
        <span class="index-list-item_name">经销商走访</span>
        <span class="iconfont iconqianjin-01"></span>
      </div>
      <div class="index-list-item" @click="showPeopleSelectPopup('terminal', 'DC')">
        <img class="index-list-item_img" src="./../../assets/img/zd_dc.png" />
        <span class="index-list-item_name">终端督查</span>
        <span class="iconfont iconqianjin-01"></span>
      </div>
      <div
        class="index-list-item index-list-margin-item"
        @click="showPeopleSelectPopup('distributor', 'DC')"
      >
        <img class="index-list-item_img" src="./../../assets/img/jxs_dc.png" />
        <span class="index-list-item_name">经销商督查</span>
        <span class="iconfont iconqianjin-01"></span>
      </div>
    </div>
    <Popup v-model="showPopup" position="right" :style="{ height: '100%', width: '90%' }">
      <reportSelectTree :tree="organizationList" />
    </Popup>
  </div>
</template>

<script>
import { Http } from "@/api";
import reportSelectTree from "@/components/reportSelectTree";
export default {
  created() {
    this.$store.commit("changeHeaderNavTitle", {
      name: "分析报表"
    });
    // 获取权限等级
    this.getOrgInfo();
  },
  components: {
    reportSelectTree
  },
  data() {
    return {
      showPopup: false, // 是否弹出人员/部门选择框

      organizationList: []
    };
  },
  methods: {
    showPeopleSelectPopup(targetType, reoprtType) {
      this.$store.commit("changeTargetAndReportType", {
        targetType,
        reoprtType
      });
      this.showPopup = true;
    },

    // 先获取权限等级，再获取组织列表，再根据权限等级选取正确显示的组织列表
    async getOrgInfo() {
      this.$showLoading();
      // 登陆人权限等级 0-大区 1-业务部 2-工作站 3-普通员工
      let orgLevel = 3;

      let orgInfo = await Http.request("getOrgInfo", {
        appuser: "10045595"
      });
      if (orgInfo.et_sales_office.length > 1) {
        orgLevel = 0;
      } else if (orgInfo.et_sales_group.length > 0) {
        orgLevel = 1;
      } else if (orgInfo.et_sales_station.length > 1) {
        orgLevel = 2;
      }

      // 获取组织人员列表树
      let organizationList = await Http.request("getOrganizationList", {
        appuser: "10045595"
      });

      // 根据权限等级和返回的权限列表截取出正确的权限树
      this.splitRightOrganizationList(organizationList, orgLevel)

      this.$hideLoading();
    },

    // 根据权限等级和返回的权限列表截取出正确的权限树
    splitRightOrganizationList(organizationList, orgLevel) {
      if(orgLevel === 0) {
        this.organizationList = organizationList;
        console.log(this.organizationList)
      } else {
        this.splitRightOrganizationList(organizationList[0].children, orgLevel - 1)
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import url("./index.less");
</style>