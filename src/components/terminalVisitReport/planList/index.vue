<template>
    <div class="plan-list-container">
        <planListitem v-for="(item, index) in planList" :key="index" :item="item" />
    </div>
</template>

<script>
import planListitem from './../planListItem'; // 拜访计划子项

export default {
    components: {
        planListitem
    },
    props: {
        planList: Array
    }
}
</script>

<style lang="less" scoped>
@import url('./index.less');
</style>