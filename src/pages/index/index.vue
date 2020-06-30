/**
 * 报表列表页面
 */
<template>
  <div>
    <div class="index-list-container">
      <div
        v-if="userInfo && userInfo.appxs == 'X'"
        class="index-list-item"
        @click="showPeopleSelectPopup('ZD', 'BF')"
      >
        <img class="index-list-item_img" src="./../../assets/img/zd_bf.png" />
        <span class="index-list-item_name">终端拜访</span>
        <span class="iconfont iconqianjin-01"></span>
      </div>
      <div
        v-if="userInfo && userInfo.appxs == 'X'"
        class="index-list-item index-list-margin-item"
        @click="showPeopleSelectPopup('JXS', 'BF')"
      >
        <img class="index-list-item_img" src="./../../assets/img/jxs_bf.png" />
        <span class="index-list-item_name">经销商拜访</span>
        <span class="iconfont iconqianjin-01"></span>
      </div>
      <div
        v-if="userInfo && userInfo.appgl == 'X'"
        class="index-list-item"
        @click="showPeopleSelectPopup('ZD', 'ZF')"
      >
        <img class="index-list-item_img" src="./../../assets/img/zd_zf.png" />
        <span class="index-list-item_name">终端走访</span>
        <span class="iconfont iconqianjin-01"></span>
      </div>
      <div
        v-if="userInfo && userInfo.appgl == 'X'"
        class="index-list-item index-list-margin-item"
        @click="showPeopleSelectPopup('JXS', 'ZF')"
      >
        <img class="index-list-item_img" src="./../../assets/img/jxs_zf.png" />
        <span class="index-list-item_name">经销商走访</span>
        <span class="iconfont iconqianjin-01"></span>
      </div>
      <div
        v-if="userInfo && userInfo.appdc == 'X'"
        class="index-list-item"
        @click="showPeopleSelectPopup('ZD', 'DC')"
      >
        <img class="index-list-item_img" src="./../../assets/img/zd_dc.png" />
        <span class="index-list-item_name">终端督查</span>
        <span class="iconfont iconqianjin-01"></span>
      </div>
      <div
        v-if="userInfo && userInfo.appdc == 'X'"
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
    this.$store.commit("changeHeaderNavTitle", {
      name: "分析报表"
    });
    // 获取权限等级
    this.getOrgInfo();

    this.clearReoprtAjaxData();
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

      this.$showLoading()
      this.keyWordThrottle();
    }
  },
  computed: {
    ...mapState({
      userInfo: state => state.userInfoStore.userInfo
    })
  },
  methods: {
    // 跳转到报表详情页面
    navToVisitReport(payload, item) {
      this.$store.commit("setTerminalUserOrOrganization", {
        type: payload === "RY" ? "RY" : "ZZ",
        reportAjaxData: item
      });

      console.log(item);
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
      this.$hideLoading()
    },
    // 清空报表请求参数
    clearReoprtAjaxData() {
      this.$store.commit("clearReoprtAjaxData");
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