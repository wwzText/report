/**
 * 终端拜访首页
 */
<template>
    <div>
        <switchDataMonth />
    </div>
</template>

<script>
import switchDataMonth from '@/components/terminalVisitReport/switchDataMonth';
export default {
    created() {
        this.$store.commit('changeHeaderNavTitle', {
            name: '终端拜访首页'
        })
    },
    components: {
        switchDataMonth
    }
}
</script>

<style scoped>
@import url('./index.css');
</style>