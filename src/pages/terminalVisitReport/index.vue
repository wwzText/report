/**
 * 终端拜访首页
 */
<template>
    <div>
        <switchDataMonth />
        <staffMessage />
        <visitSwap />
    </div>
</template>

<script>
import switchDataMonth from '@/components/terminalVisitReport/switchDataMonth';
import staffMessage from '@/components/terminalVisitReport/staffMessage';
import visitSwap from '@/components/terminalVisitReport/visitSwap';
export default {
    created() {
        this.$store.commit('changeHeaderNavTitle', {
            name: '终端拜访首页'
        })
    },
    components: {
        switchDataMonth,
        staffMessage,
        visitSwap,
    }
}
</script>

<style scoped>
@import url('./index.css');
</style>