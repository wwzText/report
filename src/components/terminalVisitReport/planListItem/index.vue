<template>
    <div class="plan-item-container">
        <p class="plan-item-name">{{item.planName}}</p>
        <div class="plan-item-message-container">
            <span class="plan-item-time">{{item.planTime}}</span>
            <p class="plan-item-number">已拜访 <span class="plan-item-height-number">{{item.actualNum}}</span> / <span class="plan-item-height-number">{{item.planNum}}</span> 总数</p>
        </div>
    </div>
</template>

<script>

export default {
    props: {
        item: Object
    }    
}
</script>

<style lang="less" scoped>
@import url('./index.less');
</style>