<template>
    <ul class="question-main">
        <li v-for="(item, index) in list" :key="index" class="question-item">
            <span class="question-name">{{item.quest_desc}}</span>
            <span>{{item.percent}}</span>
            <span class="question-num">{{item.quest_num}}家</span>
            <span class="iconfont iconqianjin-01"></span>
        </li>
    </ul>
</template>

<script>
export default {
    props: {
        list: Array
    }
}
</script>

<style lang="less" scoped>
@import url('./index.less');
</style>