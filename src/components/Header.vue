<template>
    <div class="v-header flex-row">
        <div class="back-action flex-row-center" @click="handleBack">
            <Icon class="el-icon-arrow-left" />
        </div>
        <div class="flex-item-one font-size-md font-weight-bold text-title">{{ title }}</div>
    </div>
</template>

<script>
import { Icon } from 'element-ui';
export default {
    name: 'Header', // 二级页面顶部
    components: {
        Icon,
    },
    props: {
        isHaveBack: {
            type: Boolean,
            default: true,
        },
        title: {
            type: String,
            default: '',
        },
    },
    methods: {
        handleBack() {
            this.$router.back();
        },
    },
};
</script>

<style lang="less" scoped>
.v-header {
    height: @header-height;
    background-color: @white;
    border-bottom: @border-mini;
    user-select: none;
    -webkit-app-region: drag;
    .back-action {
        height: @header-height;
        width: @header-height;
        cursor: pointer;
        &:hover {
            background-color: rgba(0, 0, 0, 0.05);
        }
    }
}
</style>
