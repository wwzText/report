<template>
    <div class="header_container">
        <span class="iconfont iconhoutui-01" @click="navBackOrExit"></span>
        <span class="header-title">{{title}}</span>
        <slot />
    </div>
</template>

<script>
export default {
    props: {
        title: String
    },
    methods: {
        // 后推或关闭H5
        navBackOrExit() {
            console.log(1)
            this.$router.go(-1)
        }
    }
}
</script>

<style lang='less' scoped>
@import url('./index.less');
</style>