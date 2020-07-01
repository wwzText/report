<template>
  <Calendar
    row-height="48"
    :show-title="false"
    :show-subtitle="false"
    :style="{ height: '420px' }"
    v-model="showCalenar"
    @confirm="confirmDate"
    :min-date="minDate"
    :max-date="maxDate"
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
  created() {
    console.log(1)
  },

  computed: {
    maxDate() {
      let time = new Date();
      return new Date(time.getFullYear(), time.getMonth(), time.getDate());
    },
    minDate() {
      let time = new Date();
      let year = time.getFullYear();
      let month = time.getMonth();
      let date = time.getDate();
      if (month <= 5) {
        year -= 1;
        month = 12 - 6 + month;
      } else {
        month = month - 6
      }
      return new Date(year, month, date)
    }
  },
  methods: {
    confirmDate(e) {
      let timeStr = `${e.getFullYear()}-${this.zero(
        e.getMonth() + 1
      )}-${this.zero(e.getDate())}`;
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
.van-calendar__selected-day {
  background-color: transparent;
  color: #074fb3;
  animation: fontBig linear 100ms;
  animation-fill-mode: forwards;
}
@keyframes fontBig {
  from {
  }
  to {
    font-size: 28px;
  }
}
.van-button--danger {
  background-color: #074fb3;
  color: white;
  border: none;
}
</style>