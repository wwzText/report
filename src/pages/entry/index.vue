<template>
  <div class="page-container">
    <HeaderNav :title="headerNavTitle"></HeaderNav>
    <router-view></router-view>
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