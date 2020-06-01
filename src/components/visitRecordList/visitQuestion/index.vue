<template>
    <div class="question-container">
        <div class="question-main">
            <div class="address-container">
                <img class="address-img" src="./../../../assets/img/address.png" alt="">
                <span>XXX酒吧(大源店)</span>
            </div>
        </div>
        <visitQuestionCard />
    </div>
</template>

<script>
import visitQuestionCard from './../visitQuestionCard';
export default {
    components: {
        visitQuestionCard
    }
}
</script>

<style lang="less" scoped>
@import url('./index.less');
</style>