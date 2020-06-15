/**
 * 终端拜访首页
 */
<template>
  <div>
    <switchDataMonth />
    <staffMessage :headerMessage="headerMessage" />
    <visitSwap v-if="userOfOrganization !== 'user'" />
    <visitMessage v-if="userOfOrganization === 'user'" :headerMessage="headerMessage" />
  </div>
</template>

<script>
import switchDataMonth from "@/components/terminalVisitReport/switchDataMonth";
import staffMessage from "@/components/terminalVisitReport/staffMessage";
import visitSwap from "@/components/terminalVisitReport/visitSwap";
// 人员状态下
import visitMessage from "@/components/terminalVisitReport/visitMessage";

import "@/utils/Native/WebViewJavascriptBridge";
import { mapState } from "vuex";

export default {
  components: {
    switchDataMonth,
    staffMessage,
    visitSwap,
    visitMessage
  },
  created() {
    this.$store.commit("changeHeaderNavTitle", {
      name: "拜访首页"
    });

    // 根据 terminalVisitReportStore 仓库中的参数确定访问URL及访问参数
    // this.determineUrlByStoreParam();

    // this.getUserReportOfDay();

    // NATIVE.getCurrentUserInfo(res => {
    //     console.log('res', res)
    // });
    // let userInfo = NATIVE.sendMessageToAndroid();
    // console.log(userInfo)
  },

  data() {
    return {
      headerMessage: {}
    };
  },

  methods: {
    // 根据 terminalVisitReportStore 仓库中的参数确定访问URL及访问参数
    determineUrlByStoreParam() {
      let url = `${this.targetType == 'terminal' ? 'ZD' : 'JXS'}_${this.reoprtType}_${this.dateOrMonth == 'date' ? 'DR' : 'DY'}_${this.userOrOrganization == 'user' ? 'RY' : 'ZZ'}`;
      console.log(url)
    },
    async getUserReportOfDay() {
      this.$showLoading();
      let userReportOfDay = await this.$store.dispatch("getUserReportOfDay", {
        visit_date: "2020-05-12",
        org_code: "50030414",
        appuser: "11223344",
        user_bp: "0011223344"
      });
      console.log(userReportOfDay);
      this.headerMessage = userReportOfDay.es_summary;
      this.$hideLoading();

      // console.log(userReportOfDay)
    }
  },

  watch: {
    // 监听切换日期搜索范围，切换后重新获取数据
    // dateOrMonth() {
    //   this.determineUrlByStoreParam()
    // },
    // 监听切换日期
    terminalVisitQueryTime() {
      this.determineUrlByStoreParam()
    }
  },

  computed: {
    ...mapState({
      userOfOrganization: state => state.terminalVisitReportStore.userOrOrganization,
      dateOrMonth: state => state.terminalVisitReportStore.dateOrMonth,
      targetType: state => state.terminalVisitReportStore.targetType,
      reoprtType: state => state.terminalVisitReportStore.reoprtType,
      terminalVisitQueryTime: state => state.terminalVisitReportStore.terminalVisitQueryTime,
    })
  }
};
</script>

<style scoped>
@import url("./index.css");
</style>