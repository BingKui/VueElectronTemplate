<template>
    <div class="v-progress">
        <div class="progress-background">
            <div class="progress-target" :style="targetStyle"></div>
        </div>
        <span class="progress-value text-content text-right">{{ percent }}%</span>
    </div>
</template>

<script>
export default {
    name: 'Progress', // 进度条
    props: {
        percent: { // 百分比
            type: Number,
            default: 0,
        },
    },
    computed: {
        targetStyle() {
            return `width: ${this.$props.percent}%;`;
        },
    },
};
</script>

<style lang="less" scoped>
.v-progress {
    display: flex;
    width: 100%;
    align-items: center;
    height: 24px;
    .progress-background {
        background-color: @gray-light;
        height: 8px;
        border-radius: 4px;
        flex: 1;
        .progress-target {
            height: 8px;
            border-radius: 4px;
            background-color: @primary;
        }
    }
    .progress-value {
        width: 40px;
        font-size: @font-size;
        color: @content-color;
    }

}
</style>
