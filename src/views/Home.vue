<template>
    <div class="v-home">
         <ScrollBar class="main-container" axis="y">
            <div class="v-title">滚动条-y</div>
            <ScrollBar class="v-container">
                <div class="line-text">测试数据-1</div>
                <div class="line-text">测试数据-2</div>
                <div class="line-text">测试数据-3</div>
                <div class="line-text">测试数据-4</div>
                <div class="line-text">测试数据-5</div>
                <div class="line-text">测试数据-6</div>
                <div class="line-text">测试数据-7</div>
                <div class="line-text">测试数据-8</div>
                <div class="line-text">测试数据-9</div>
                <div class="line-text">测试数据-10</div>
                <div class="line-text">测试数据-11</div>
                <div class="line-text">测试数据-12</div>
                <div class="line-text">测试数据-13</div>
            </ScrollBar>
            <div class="v-title">滚动条-x</div>
            <ScrollBar class="v-container" axis="x">
                <div class="line-text long-width">测试数据.....</div>
            </ScrollBar>
            <div class="v-title">右键菜单</div>
            <MouseRight class="right-mouse-el" :mouseData="mouseData" :mouseKey="value">
                <div class="mouse-right-value">右键点击</div>
            </MouseRight>
            <div class="v-title">加载文件内容</div>
            <div class="v-container">{{fileText}}</div>
        </ScrollBar>
    </div>
</template>

<script>
import ScrollBar from '@components/ScrollBar';
import MouseRight from '@components/MouseRight';
import { loadMarkdownFile } from '@common/utils';
export default {
    name: 'Home',
    components: {
        ScrollBar,
        MouseRight,
    },
    data() {
        return {
            mouseData: [{
                text: 'alert',
                action: (val) => {
                    alert(JSON.stringify(val));
                },
            }, {
                text: 'alert',
                action: (val) => {
                    alert(JSON.stringify(val));
                },
            }],
            value: {
                id: 1,
                text: '1',
            },
            fileText: loadMarkdownFile('test'),
        };
    },
};
</script>

<style lang="less" scoped>
.v-home {
    font-size: 20px;
    .main-container {
        height: 100vh;
        width: 100%;
    }
    .v-title {
        .font-size-lg();
        color: @primary;
        .m(@gap-md);
    }
    .v-container {
        .m(@gap-md);
        height: 200px;
        background-color: @gray;
        .font-size-sm();
        .line-text {
            .font-size();
            text-indent: @gap;
            .m-v(@gap-sm);
        }
        .long-width {
            width: 1000px;
            background-color: @warn;
        }
    }
    .right-mouse-el {
        .m(@gap-md);
        width: 100%;
        .p(@gap);
        .flex-row-center();
        background-color: @gray;
        .mouse-right-value {
            background-color: @danger;
            color: @white;
            width: 100px;
            .t-c();
        }
    }
}
</style>
