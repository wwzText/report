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
import { Http } from '@/api';

export default {
    async created() {
        this.$store.commit('changeHeaderNavTitle', {
            name: '终端拜访首页'
        })
        let getWorkCircleDetail = await Http.request('getWorkCircleDetail', {
            id: 'F6CE81F47F8D49708EB10E7BD00305BB',
            appuser: '11223344',
        });
        console.log(getWorkCircleDetail)
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