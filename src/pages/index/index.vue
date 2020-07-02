/**
 * 报表列表页面
 */
<template>
  <div class="index-page-container">
    <div class="index-banner-main">
      <img src="./../../assets/img/index_banner.png" class="index-banner-img" alt />
      <div class="index-page-header">
        <span class="iconfont iconhoutui-01" @click="closeWebView"></span>
        <span class="index-page-header-title">分享报表</span>
      </div>
    </div>
    <div class="report-entry-main">
      <div class="report-item" @click="showPeopleSelectPopup('ZD', 'BF')">
        <img src="./../../assets/img/ZD_BF.png" alt />
        <span>终端拜访</span>
      </div>
      <div class="report-item" @click="showPeopleSelectPopup('JXS', 'BF')">
        <img src="./../../assets/img/JXS_BF.png" alt />
        <span>经销商拜访</span>
      </div>

      <div class="report-item" @click="showPeopleSelectPopup('ZD', 'ZF')">
        <img src="./../../assets/img/ZD_ZF.png" alt />
        <span>终端走访</span>
      </div>
      <div class="report-item" @click="showPeopleSelectPopup('JXS', 'ZF')">
        <img src="./../../assets/img/JXS_ZF.png" alt />
        <span>经销商走访</span>
      </div>
      <div class="report-item" @click="showPeopleSelectPopup('ZD', 'DC')">
        <img src="./../../assets/img/ZD_DC.png" alt />
        <span>终端督查</span>
      </div>
      <div class="report-item" @click="showPeopleSelectPopup('JXS', 'DC')">
        <img src="./../../assets/img/JXS_DC.png" alt />
        <span>经销商督查</span>
      </div>
    </div>
    <Popup v-model="showPopup" position="right" :style="{ height: '100%', width: '90%' }">
      <div class="see-self-report" @click="seeUserSelfReport">
        <button>查看个人统计报表</button>
        <img src="./../../assets/img/report_icon.png" alt srcset />
      </div>
      <input type="text" placeholder="请输入查询业务员名字关键字" class="saerch-input" v-model="searchKeyword" />
      <reportSelectTree v-if="searchKeyword == ''" :tree="organizationList" />
      <template v-if="searchKeyword != ''">
        <div
          v-for="(item, index) in searchRuleList"
          :key="'people' + index"
          class="tree-people-main"
        >
          <span class="tree-people-name">{{item.usertxt}}</span>
          <img
            @click="navToVisitReport('RY', item)"
            class="pc-img"
            src="./../../assets/img/report_icon.png"
            alt
          />
        </div>
      </template>
    </Popup>
  </div>
</template>

<script>
import reportSelectTree from "@/components/reportSelectTree";
import { mapState } from "vuex";
export default {
  created() {
    this.NativeCanClose();
    this.clearReoprtAjaxData();
    this.removeSwiperIndex();

    this.$store.commit("changeHeaderNavTitle", {
      name: ""
    });
  },
  mounted() {
    // 获取权限等级
    this.getOrgInfo();
  },
  components: {
    reportSelectTree
  },
  data() {
    return {
      showPopup: false, // 是否弹出人员/部门选择框

      organizationList: [], // 组织树
      searchKeyword: "", // 业务员搜索
      timer: null,
      searchRuleList: [] // 通过关键词搜索出了的
    };
  },
  watch: {
    searchKeyword(val) {
      if (val == "") {
        this.searchRuleList = [];
        return;
      }

      this.$showLoading();
      this.keyWordThrottle();
    }
  },
  computed: {
    ...mapState({
      userInfo: state => state.userInfoStore.userInfo
    })
  },
  methods: {
    // 关闭H5
    closeWebView() {
      this.$bridge.callhandler({
        type: "closeWebView"
      });
    },
    // 调用原生方法，表示这个页面可以在手机上直接使用android手机的返回按钮退出webview
    NativeCanClose() {
      this.$bridge.callhandler({
        type: "isBack",
        data: {
          isBack: true
        }
      });
    },
    // 跳转到报表详情页面
    navToVisitReport(payload, item) {
      this.$store.commit("setTerminalUserOrOrganization", {
        type: payload === "RY" ? "RY" : "ZZ",
        reportAjaxData: item
      });
      this.$router.push("/report/terminalVisitReport");
    },
    // 关键字节流
    keyWordThrottle() {
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.searchSeleByKeywordFromLocal();
          this.time = null;
        }, 1000);
      } else {
        this.timer = setTimeout(() => {
          this.searchSeleByKeywordFromLocal();
          this.time = null;
        }, 1000);
      }
    },
    // 在本地组织数中搜索
    searchSeleByKeywordFromLocal(list = this.organizationList) {
      list.map(item => {
        if (item.children) {
          this.searchSeleByKeywordFromLocal(item.children);
        }
        if (item.usertxt) {
          if (item.usertxt.search(this.searchKeyword) != -1) {
            this.searchRuleList.push(item);
          }
        }
      });
      this.$hideLoading();
    },
    // 清空报表请求参数
    clearReoprtAjaxData() {
      this.$store.commit("clearReoprtAjaxData");
    },
    removeSwiperIndex() {
      this.$store.commit("removeSwiperIndex");
    },

    // 点击展开弹出框，弹出时修改目标类型及报表类型
    // 目标类型及报表类型用于报表主页24个接口判读是哪一个
    showPeopleSelectPopup(targetType, reportType) {
      this.$store.commit("changeTargetAndReportType", {
        targetType,
        reportType
      });
      this.showPopup = true;
    },

    // 获取组织列表
    async getOrgInfo() {
      this.$showLoading();
      await this.$store.dispatch("getUserInfo");

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
.saerch-input {
  width: 300px;
  height: 40px;
  margin: 10px 10px;
  padding-left: 10px;
  box-sizing: border-box;
}
@import url("./index.less");
</style>