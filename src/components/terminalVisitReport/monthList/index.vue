<template>
  <Popup
    :close-on-click-overlay="false"
    v-model="showMonth"
    position="bottom"
    :style="{height: '420px'}"
  >
    <div class="operation-btn_container">
      <button class="close-btn" @click="closePopup">关闭</button>
      <button class="sure-btn" @click="closePopup">确认</button>
    </div>
    <ul class="month-list">
      <li
        :class="item.chooseTimeStr === chooseTimeStr ? 'choose-month' : ''"
        @click="chooseMonth(item.chooseTimeStr)"
        v-for="(item, index) in selectMonthList"
        :key="index"
      >{{item.showTimeStr}}</li>
    </ul>
  </Popup>
</template>

<script>
export default {
  props: {
    showMonth: Boolean
  },
  created() {
    this.generateMonthList();
  },
  data() {
    return {
      chooseTimeStr: ""
    };
  },
  methods: {
    // 确认选择月份
    sureMonth() {
      let timeStr = "2020-1";
      this.$emit("changeMonth", {
        timeStr
      });
    },

    // 生成最近的6个月的月份列表
    generateMonthList() {
      let date = new Date();
      let list = [];
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      for (let i = 0; i < 6; i++) {
        if (month > i) {
          list.push({
            showTimeStr: `${year}年${month - i}月`,
            chooseTimeStr: `${year}-${month - i}`
          });
        } else {
          list.push({
            showTimeStr: `${year - 1}年${12 + month - i}月`,
            chooseTimeStr: `${year}-${month - i}`
          });
        }
      }
      this.selectMonthList = list;
    },

    // 点击选中某个月份
    chooseMonth(e) {
      if (this.chooseTimeStr === e) {
        this.chooseTimeStr = "";
      } else {
        this.chooseTimeStr = e;
      }
    },

    closePopup() {
        this.$emit('closePopup', {
            timeStr: this.chooseTimeStr
        })
    }
  }
};
</script>

<style lang="less" scoped>
@import url("@/assets/less/theme.less");
@import url("./index.less");
</style>