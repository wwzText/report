<template>
    <!-- 业务员离店备注及时间 -->
    <div class="leave-notes-container">
        <p class='leave-notes-message' v-if="shareData.leaving_note">离店备注：{{shareData.leaving_note}}</p>
        <div class="leave-time-container">
            <span class="iconfont iconqiandao-01"></span>
            <span class="leave-time-detail">{{shareData.visit_in_time}} -- </span>
            <span class="iconfont iconqiantui-01"></span>
            <span class="leave-time-detail">{{shareData.visit_out_time}}</span>
            <span class="iconfont iconshijian-01"></span>
            <span class="leave-time-detail">{{shareData.visit_long_time}}分</span>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        shareData: Object
    }
}
</script>

<style lang="less" scoped>
@import url('./index.less');
</style>