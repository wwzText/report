<template>
    <div class="question-container">
        <div class="question-main">
            <div class="address-container">
                <img class="address-img" src="./../../../assets/img/address.png" alt="">
                <span>{{shareData.terminal_name}}</span>
            </div>
        </div>
        <visitQuestionCard :check_info="shareData.check_info" />
    </div>
</template>

<script>
import {mapState} from 'vuex';

import visitQuestionCard from './../visitQuestionCard';
export default {
    components: {
        visitQuestionCard
    },
    props: {
        shareData: Object
    },
    computed: {
        ...mapState({
            
        })
    }
}
</script>

<style lang="less" scoped>
@import url('./index.less');
</style>