<template>
    <div class="v-home">
         <ScrollBar class="main-container" axis="y">
            <div class="v-title">组件示例</div>
            <div>
                <Button type="primary">按钮</Button>
                <Icon type="loading" />
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
            <div class="font-size-md text-primary margin-v margin-left-md font-weight-bold">提供基础组件</div>
            <div class="v-container padding-all">
                <Button>Default</Button>
                <Button type="primary">Primary</Button>
                <Button type="info">Info</Button>
                <Button type="warn">Warn</Button>
                <Button type="success">Success</Button>
                <Button type="danger">Danger</Button>
                <Button type="danger" ghost>Danger</Button>
                <Button type="primary" :disabled="true">Disabled</Button>
                <Progress :percent="30"></Progress>
                <Progress :percent="100"></Progress>
                <Button type="primary" @click="checkUpdateAction">检查更新</Button>
            </div>
            <div class="font-size-md text-primary margin-v margin-left-md font-weight-bold">滚动条-y</div>
            <ScrollBar class="v-container scroll-container">
                <div class="text-content font-size margin-left margin-bottom">测试数据-1</div>
                <div class="text-content font-size margin-left margin-bottom">测试数据-2</div>
                <div class="text-content font-size margin-left margin-bottom">测试数据-3</div>
                <div class="text-content font-size margin-left margin-bottom">测试数据-4</div>
                <div class="text-content font-size margin-left margin-bottom">测试数据-5</div>
                <div class="text-content font-size margin-left margin-bottom">测试数据-6</div>
                <div class="text-content font-size margin-left margin-bottom">测试数据-7</div>
                <div class="text-content font-size margin-left margin-bottom">测试数据-8</div>
                <div class="text-content font-size margin-left margin-bottom">测试数据-9</div>
                <div class="text-content font-size margin-left margin-bottom">测试数据-10</div>
                <div class="text-content font-size margin-left margin-bottom">测试数据-11</div>
                <div class="text-content font-size margin-left margin-bottom">测试数据-12</div>
                <div class="text-content font-size margin-left margin-bottom">测试数据-13</div>
            </ScrollBar>
            <div class="font-size-md text-primary margin-v margin-left-md font-weight-bold">滚动条-x</div>
            <ScrollBar class="v-container scroll-container" axis="x">
                <div class="text-content font-size long-width">测试数据.....</div>
            </ScrollBar>
            <div class="font-size-md text-primary margin-v margin-left-md font-weight-bold">右键菜单</div>
            <div class="v-container">
                <MouseRight class="right-mouse-el" :mouseData="mouseData" :mouseKey="value">
                    <div class="mouse-right-value flex-column-center font-size text-disable">右键点击区域</div>
                </MouseRight>
            </div>
            <div class="font-size-md text-primary margin-v margin-left-md font-weight-bold">系统通知</div>
            <div class="v-container padding-all">
                <Button type="primary" @click="openNotic">普通通知</Button>
                <Button type="success" @click="openLinkNotic">添加链接的通知</Button>
            </div>
            <div class="font-size-md text-primary margin-v margin-left-md font-weight-bold">粘贴板操作</div>
            <div class="v-container padding-all">
                <div class="margin-bottom font-size" id="copy-text">点击下方复制按钮，即可复制这段文字。</div>
                <Button type="primary" @click="copyAction">复制</Button>
            </div>
            <div class="font-size-md text-primary margin-v margin-left-md font-weight-bold">本地数据操作</div>
            <div class="v-container padding-all">
                <Button type="success" @click="getDataList">获取本地数据</Button>
                <Button type="primary" @click="addDataItem">添加一条记录</Button>
                <div class="data-list-item margin-all font-size" v-for="item in dataList" :key="item._id">
                    <span>{{item.name}}: {{item.value}}</span>
                    <Button type="danger" size="small" @click="() => delDataItem(item._id)">删除</Button>
                </div>
            </div>
        </ScrollBar>
    </div>
</template>

<script>
import ScrollBar from '@components/ScrollBar';
import MouseRight from '@components/MouseRight';
import { Progress } from '@components/index';
import { copyText } from '@common/common';
import { sysNotice } from '@common/notice';

import { addItem, getAllItems, delItem } from '@common/db';
import { Button, Icon } from 'ant-design-vue';
import { checkAppUpdate } from '@/common/update';
export default {
    name: 'Home',
    components: {
        ScrollBar,
        MouseRight,
        Button,
        Icon,
        Progress,
    },
    data() {
        return {
            mouseData: [{
                text: '复制',
                action: (val) => {
                    alert('你点击了复制！');
                },
            }, {
                text: '粘贴',
                action: (val) => {
                    alert('你点击了粘贴！');
                },
            }],
            value: {
                id: 1,
                text: '1',
            },
            dataList: [],
        };
    },
    methods: {
        openNotic() {
            sysNotice('普通通知', '这是一个普通的通知!这是一个普通的通知!这是一个普通的通知!这是一个普通的通知!这是一个普通的通知!这是一个普通的通知!这是一个普通的通知!');
        },
        openLinkNotic() {
            sysNotice('链接通知', '这是一个带链接的通知', 'https://www.uiseed.cn');
        },
        copyAction() {
            copyText(document.querySelector('#copy-text').innerHTML);
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
        checkUpdateAction() {
            checkAppUpdate();
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
    .v-container {
        margin: 0 @gap-md;
        background-color: @white;
        border: @border;
        .line-text {
            text-indent: @gap;
        }
        .long-width {
            width: 1000px;
            background-color: @info;
            color: @white;
            padding: @gap;
        }
    }
    .scroll-container {
        height: 100px;
    }
    .right-mouse-el {
        height: 100%;
        .mouse-right-value {
            height: 100px;
            user-select: none;
            background-color: @gray-light;
            width: 100%;
        }
    }
}
</style>
