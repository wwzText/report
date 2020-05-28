<template>
  <div id="app">
    <HeaderNav :title="headerNavTitle"></HeaderNav>
    <router-view />
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["headerNavTitle"])
  }
};
</script>