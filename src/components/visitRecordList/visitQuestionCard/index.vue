<template>
    <!-- 拜访问题标签 -->
    <ul class="question-card-container">
        <li v-for="(item, index) in questionList" :key="index">
            <span :class="judgeClass(item.type)">{{item.name}}</span>
        </li>
    </ul>
</template>

<script>
export default {
    data() {
        return {
            questionList: [
                {
                    name: '有问题',
                    type: 2
                }, {
                    name: '没问题',
                    type: 1
                }, {
                    name: '未检查项',
                    type: 3
                }
            ]
        }
    },

    methods: {
        // 根据问题的类型返回不同的class，改变颜色
        judgeClass(type) {
            let className = ''
            switch (type) {
                case 1:
                    className = 'not-question'
                    break;
                case 2:
                    className = 'have-question'
                    break
                default:
                    className = 'not-judge'
                    break;
            }
            return className;
        }
    }
}
</script>

<style lang="less" scoped>
@import url('./index.less');
</style>