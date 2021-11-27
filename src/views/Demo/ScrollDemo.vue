<template>
    <div class="v-scroll-demo">
         <ScrollBar class="main-container" axis="y">
            <Divider content-position="left">滚动条-y</Divider>
            <ScrollBar class="v-container">
                <div class="font-size-sm padding-all background-white margin-all-sm">测试数据-1</div>
                <div class="font-size-sm padding-all background-white margin-all-sm">测试数据-2</div>
                <div class="font-size-sm padding-all background-white margin-all-sm">测试数据-3</div>
                <div class="font-size-sm padding-all background-white margin-all-sm">测试数据-4</div>
                <div class="font-size-sm padding-all background-white margin-all-sm">测试数据-5</div>
                <div class="font-size-sm padding-all background-white margin-all-sm">测试数据-6</div>
                <div class="font-size-sm padding-all background-white margin-all-sm">测试数据-7</div>
                <div class="font-size-sm padding-all background-white margin-all-sm">测试数据-8</div>
                <div class="font-size-sm padding-all background-white margin-all-sm">测试数据-9</div>
                <div class="font-size-sm padding-all background-white margin-all-sm">测试数据-10</div>
                <div class="font-size-sm padding-all background-white margin-all-sm">测试数据-11</div>
                <div class="font-size-sm padding-all background-white margin-all-sm">测试数据-12</div>
                <div class="font-size-sm padding-all background-white margin-all-sm">测试数据-13</div>
            </ScrollBar>
            <Divider content-position="left">滚动条-x</Divider>
            <ScrollBar class="v-container" axis="x">
                <div class="font-size-sm padding-all background-white long-width margin-top-sm">测试数据.....</div>
                <div class="font-size-sm padding-all background-white long-width margin-top-sm">测试数据.....</div>
                <div class="font-size-sm padding-all background-white long-width margin-top-sm">测试数据.....</div>
                <div class="font-size-sm padding-all background-white long-width margin-top-sm">测试数据.....</div>
            </ScrollBar>
        </ScrollBar>
    </div>
</template>

<script>
import { Divider } from 'view-design';
import ScrollBar from '@components/ScrollBar';
export default {
    name: 'ScrollDemo',
    components: {
        Divider,
        ScrollBar,
    },
};
</script>

<style lang="less" scoped>
.v-scroll-demo {
    font-size: 20px;
    padding: 0 @gap;
    .main-container {
        height: 100vh;
        width: 100%;
    }
    .v-container {
        margin: @gap-md;
        height: 200px;
        background-color: @gray-light;
        font-size: @font-size-sm;
        .long-width {
            width: 700px;
        }
    }
}
</style>
