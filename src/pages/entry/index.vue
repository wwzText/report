<template>
  <div class="page-container">
    <HeaderNav :title="headerNavTitle"></HeaderNav>
    <router-view class="view-main"></router-view>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      headerNavTitle: state => { return state.headerNavStore.headerNavTitle}
    })
  }
};
</script>