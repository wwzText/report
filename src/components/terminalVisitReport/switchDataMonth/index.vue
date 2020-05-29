<template>
  <div>
    <div class="switch-conatiner">
      <div class="use-type-container" @click="changeSwitchType">
        <span>{{useDate ? '按日期' : '按月份'}}</span>
        <span></span>
      </div>
      <div class="select-container" @click="showSelectDateComponent">
        <span>{{showSelectDate}}</span>
      </div>
    </div>
    <calendar :showCalenar="showCalenar" @changeDate="changeDate" />
    <monthList :showMonth="showMonthSelect" @closePopup="closeMonthPopup"/>
  </div>
</template> 

<script>
import calendar from "./../calendar";
import monthList from "./../monthList";
export default {
  components: {
    calendar,
    monthList,
  },
  created() {
    this.showSelectDate = "2020-05-29";
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
      this.useDate = !this.useDate;
      this.$emit("switchChange", {
        useDate: this.useDate
      });
    },

    // 弹出选择日期组件，根据useDate判断选择日期还是月份
    showSelectDateComponent() {
      if (this.useDate) {
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

    closeMonthPopup(obj) {
        if(obj.timeStr !== '') {
            this.showSelectDate = obj.timeStr;
        }
        this.showMonthSelect = false;
    }
  },
  watch: {
    showSelectDate(val) {
      console.log("查询时间变更为" + val + "需要重新查询数据");
    }
  }
};
</script>

<style lang="less" scoped>
@import url("./index.less");
</style>