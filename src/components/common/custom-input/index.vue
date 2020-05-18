<template>
  <input @input="handleInputChange" v-model="inputValue" />
</template>

<script>
export default {
  model: {
    prop: "value",
    event: "change"
  },
  props: {
    value: [String, Number]
  },
  data() {
    return {
      inputValue: this.value
    };
  },
  methods: {
    handleInputChange() {
      this.$emit("change", this.inputValue);
    }
  }
};
</script>

<style lang="less" scoped>
@import url("./index.less");
</style>