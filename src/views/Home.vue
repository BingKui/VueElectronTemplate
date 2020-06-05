<template>
    <div class="v-home">
         <ScrollBar class="main-container" axis="y">
            <div class="v-title">组件库示例</div>
            <div>
                <Button type="primary">按钮</Button>
            </div>
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
            <div class="v-title">系统通知</div>
            <div class="v-container">
                <button @click="openNotic">普通通知</button>
                <button @click="openLinkNotic">添加链接的通知</button>
            </div>
            <div class="v-title">粘贴板操作</div>
            <div class="v-container">
                <div id="copy-text">点击下方复制按钮，即可复制这段文字。</div>
                <button @click="copyText">复制</button>
            </div>
            <div class="v-title">粘贴板操作</div>
            <div class="v-container">
                <button @click="getDataList">获取本地数据</button>
                <div class="data-list-item" v-for="item in dataList" :key="item._id">
                    <span>{{item.name}}: {{item.value}}</span>
                    <button @click="() => delDataItem(item._id)">删除</button>
                </div>
                <button @click="addDataItem">添加一条记录</button>
            </div>
        </ScrollBar>
    </div>
</template>

<script>
import ScrollBar from '@components/ScrollBar';
import MouseRight from '@components/MouseRight';
import { loadMarkdownFile } from '@common/utils';
import { Notic, Copy } from '@common/common';
import { addItem, getAllItems, delItem } from '@common/db';
import { Button, Tag, Radio, Checkbox, Input, Badge, Switch } from 'at-ui';
export default {
    name: 'Home',
    components: {
        ScrollBar,
        MouseRight,
        Button,
        Tag,
        Radio,
        Checkbox,
        Input,
        Badge,
        Switch,
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
            dataList: [],
        };
    },
    methods: {
        openNotic() {
            Notic('普通通知', '这是一个普通的通知!这是一个普通的通知!这是一个普通的通知!这是一个普通的通知!这是一个普通的通知!这是一个普通的通知!这是一个普通的通知!');
        },
        openLinkNotic() {
            Notic('链接通知', '这是一个带链接的通知', 'https://www.uiseed.cn');
        },
        copyText() {
            Copy(document.querySelector('#copy-text').innerHTML);
        },
        async getDataList() {
            this.dataList = await getAllItems('test');
        },
        async addDataItem() {
            await addItem('test', {
                name: '111',
                value: 100,
            });
            await this.getDataList();
        },
        async delDataItem(id) {
            await delItem('test', id);
            await this.getDataList();
        },
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
