<template>
    <div class="header_container">
        <span class="iconfont reporthoutui"></span>
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
        console.log(this.$route)
        console.log(window.history)
    },
    watch: {
        $route(to, from) {
            console.log(to, from, this.$route)
        }
    }
}
</script>

<style lang='less' scoped>
@import url('./index.less');
</style>