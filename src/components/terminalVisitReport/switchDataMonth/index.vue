<template>
  <div>
    <div class="switch-conatiner">
      <div class="use-type-container" @click="changeSwitchType">
        <span>{{dateOrMonth === 'date' ? '按日期' : '按月份'}}</span>
        <span class="iconfont iconriqiqiehuan-01"></span>
      </div>
      <div class="select-container" @click="showSelectDateComponent">
        <span>{{showSelectDate}}</span>
        <span class="iconfont iconmenu-down"></span>
      </div>
    </div>
    <calendar :showCalenar="showCalenar" @changeDate="changeDate" />
    <monthList :showMonth="showMonthSelect" @closePopup="closeMonthPopup" />
  </div>
</template> 

<script>
import { mapState } from "vuex";
import {Http} from '@/api';
import {timeStampToTime} from '@/utils'
import calendar from "./../calendar";
import monthList from "./../monthList";
export default {
  components: {
    calendar,
    monthList
  },
  created() {
    this.getCurrentWebTime();
  },
  data() {
    return {
      useDate: true, // 是否按日期查看对应数据
      showCalenar: false, // 是否展示日历选择组件
      showMonthSelect: false, // 是否展示月份选择组件
      showSelectDate: "" // 用于查询数据的日期或月份
    };
  },
  methods: {
    // 改变日期或月份，并触发父组件重新根据新的值获取数据
    changeSwitchType() {
      // this.$store.commit('changeUserOrOrganization')
      this.$store.commit("changeDateOrMonth");
    },

    // 弹出选择日期组件，根据useDate判断选择日期还是月份
    showSelectDateComponent() {
      if (this.dateOrMonth === "date") {
        this.showCalenar = true;
      } else {
        this.showMonthSelect = true;
      }
    },

    // 日历确认回调
    changeDate(obj) {
      this.showCalenar = false;
      this.showSelectDate = obj.timeStr;
    },

    // 关闭月份选择弹窗，判断是否携带参数
    closeMonthPopup(obj) {
      if (obj.timeStr !== "") {
        this.showSelectDate = obj.timeStr;
      }
      this.showMonthSelect = false;
    },

    // 获取对应显示的初始化时间
    async getCurrentWebTime() {
      let webBackTimeObj = await Http.getWebTime();
      this.showSelectDate = timeStampToTime(webBackTimeObj.appserver_time, `${this.dateOrMonth == 'date' ? 'YYYY-MM-DD' : 'YYYY-MM'}`);
      this.$store.commit('changeTerminalVisitQueryTime', {
        showSelectDate: this.showSelectDate
      })
    }
  },
  watch: {
    showSelectDate(val) {
      this.$store.commit('changeTerminalVisitQueryTime', {
        showSelectDate: val
      })
    },

    // 监听日/月切换，重新为显示赋予初始值
    dateOrMonth() {
      this.getCurrentWebTime();
    }
  },
  computed: {
    ...mapState({
      dateOrMonth: state => state.terminalVisitReportStore.dateOrMonth
    })
  }
};
</script>

<style lang="less" scoped>
@import url("./index.less");
</style>