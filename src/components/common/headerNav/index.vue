<template>
    <div class="header_container">
        <span class="iconfont report-houtui"></span>
        <span class="header-title">{{title || '报表'}}</span>
        <slot />
    </div>
</template>

<script>
export default {
    props: {
        title: String
    },
    created() {
        
    }
}
</script>

<style lang='less' scoped>
@import url('./index.less');
</style>