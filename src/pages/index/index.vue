/**
 * 报表列表页面
 */
<template>
  <div>
    <div class="index-list-container">
      <div class="index-list-item" @click="showPeopleSelectPopup('ZD', 'BF')">
        <img class="index-list-item_img" src="./../../assets/img/zd_bf.png" />
        <span class="index-list-item_name">终端拜访</span>
        <span class="iconfont iconqianjin-01"></span>
      </div>
      <div
        class="index-list-item index-list-margin-item"
        @click="showPeopleSelectPopup('JXS', 'BF')"
      >
        <img class="index-list-item_img" src="./../../assets/img/jxs_bf.png" />
        <span class="index-list-item_name">经销商拜访</span>
        <span class="iconfont iconqianjin-01"></span>
      </div>
      <div class="index-list-item" @click="showPeopleSelectPopup('ZD', 'ZF')">
        <img class="index-list-item_img" src="./../../assets/img/zd_zf.png" />
        <span class="index-list-item_name">终端走访</span>
        <span class="iconfont iconqianjin-01"></span>
      </div>
      <div
        class="index-list-item index-list-margin-item"
        @click="showPeopleSelectPopup('JXS', 'ZF')"
      >
        <img class="index-list-item_img" src="./../../assets/img/jxs_zf.png" />
        <span class="index-list-item_name">经销商走访</span>
        <span class="iconfont iconqianjin-01"></span>
      </div>
      <div class="index-list-item" @click="showPeopleSelectPopup('ZD', 'DC')">
        <img class="index-list-item_img" src="./../../assets/img/zd_dc.png" />
        <span class="index-list-item_name">终端督查</span>
        <span class="iconfont iconqianjin-01"></span>
      </div>
      <div
        class="index-list-item index-list-margin-item"
        @click="showPeopleSelectPopup('JXS', 'DC')"
      >
        <img class="index-list-item_img" src="./../../assets/img/jxs_dc.png" />
        <span class="index-list-item_name">经销商督查</span>
        <span class="iconfont iconqianjin-01"></span>
      </div>
    </div>
    <Popup v-model="showPopup" position="right" :style="{ height: '100%', width: '90%' }">
      <div class="see-self-report" @click="seeUserSelfReport">
        <button>查看个人统计报表</button>
        <img src="./../../assets/img/report_icon.png" alt srcset />
      </div>
      <reportSelectTree :tree="organizationList" />
    </Popup>
  </div>
</template>

<script>
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

      organizationList: [] // 组织树
    };
  },
  methods: {
    // 点击展开弹出框，弹出时修改目标类型及报表类型
    // 目标类型及报表类型用于报表主页24个接口判读是哪一个
    showPeopleSelectPopup(targetType, reportType) {
      console.log(targetType, reportType)
      this.$store.commit("changeTargetAndReportType", {
        targetType,
        reportType
      });
      this.showPopup = true;
    },

    // 获取组织列表
    async getOrgInfo() {
      this.$showLoading();
      this.organizationList = await this.$store.dispatch(
        "getLocalOrganizationTree"
      );
      this.$hideLoading();
    },

    // 查看当前登陆用于自己的报表
    seeUserSelfReport() {
      this.$store.commit("setTerminalUserOrOrganization", {
        type: "RY"
      });
      this.$router.push("/report/terminalVisitReport");
    }
  }
};
</script>

<style lang="less" scoped>
@import url("./index.less");
</style>