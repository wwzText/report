<template>
    <ul class="title-nav-container" :style="{'background': background}">
        <li v-for="(item, index) in titleList" @click="handleTitleItemClick(index)" :class="curTitleIndex == index ? 'cur-title-select' : ''" :key="index">
            <span>{{item}}</span>
        </li>
    </ul>
</template>

<script>
export default {
    props: {
        titleList: Array, // 标题列表
        background: { // 背景色
            type: String,
            default: 'white'
        },
        curTitleIndex: { // 父组件传递过来的选中下标
            type: [Number, String],
            default: 0
        }
    },
    methods: {

        // 当前导航选择下标改变了
        handleTitleItemClick(index) {
            // 如果选中的项和当前项一致则不执行后续操作
            if(this.curTitleIndex * 1 === index) return;

            // 选中下标改变时触发父组件中对应的方法
            this.$emit('navTitleIndexChange', {
                index
            });
        }
    },
}
</script>

<style lang="less" scoped>
@import url('./index.less');
</style>