<template>
    <div class="v-page-framework">
        <Header v-if="header" :title="header" />
        <ScrollBar :class="`framework-container ${header ? 'has-header' : ''}`" padding>
            <slot></slot>
        </ScrollBar>
    </div>
</template>

<script>
import Header from './Header.vue';
import ScrollBar from './ScrollBar.vue';
export default {
    name: 'Page', // 页面框架
    components: {
        Header,
        ScrollBar,
    },
    props: {
        header: {
            type: String,
            default: '',
        },
    },
};
</script>

<style lang="less" scoped>
.v-page-framework {
    height: 100vh;
    width: 100%;
    .framework-container {
        height: 100vh;
        width: 100%;
        &.has-header {
            height: calc(100vh - @header-height);
        }
    }
}
</style>
