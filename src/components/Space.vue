<template>
    <div class="v-space">
        <slot />
    </div>
</template>

<script>
export default {
    name: 'Space', // 间距组件
};
</script>

<style lang="less" scoped>
.v-space {
    display: flex;
    flex-wrap: wrap;
    column-gap: @gap;
    row-gap: @gap;
}
</style>
