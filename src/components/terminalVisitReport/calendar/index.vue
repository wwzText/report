<template>
  <Calendar
    row-height="48"
    :show-title="false"
    :show-subtitle="false"
    :style="{ height: '420px' }"
    v-model="showCalenar"
    @confirm="confirmDate"
    :min-date="new Date(2020, 1, 29)"
    :max-date="maxDate"
    :close-on-click-overlay="false"
  />
</template>

<script>
export default {
  props: {
    showCalenar: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      maxDate: new Date(2020, 4, 29)
    };
  },
  methods: {
    confirmDate(e) {
        let timeStr = `${e.getFullYear()}-${this.zero(e.getMonth() + 1)}-${this.zero(e.getDate())}`;
      this.$emit("changeDate", {
        timeStr
      });
    },
    zero(num) {
      if (num < 10) {
        return `0${num}`;
      }
      return num;
    }
  }
};
</script>

<style lang="less">
.van-calendar__selected-day{
    background-color: transparent;
    color: #074FB3;
    animation: fontBig linear 100ms;
    animation-fill-mode: forwards;
}
@keyframes fontBig {
    from{

    } to {
        font-size: 28px;
    }
}
.van-button--danger{
    background-color: #074FB3;
    color: white;
    border: none;
}
</style>