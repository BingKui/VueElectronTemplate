<template>
    <Page class="v-notice-demo" header="通知&提示">
        <Divider orientation="left">系统通知</Divider>
        <Button @click="openSys">系统通知</Button>
        <Button type="primary" @click="openSysLink">系统通知-连接</Button>
        <Divider orientation="left">软件通知</Divider>
        <Button @click="openNormal">normal</Button>
        <Button type="primary" @click="openInfo">info</Button>
        <Button type="success" @click="openSuccess">success</Button>
        <Button type="error" @click="openError">error</Button>
        <Button type="warning" @click="openWarn">warn</Button>
        <Divider orientation="left">消息提醒</Divider>
        <Button type="info" @click="openInfoTip">info</Button>
        <Button type="success" @click="openSuccessTip">success</Button>
        <Button type="error" @click="openErrorTip">error</Button>
        <Button type="warning" @click="openWarnTip">warn</Button>
    </Page>
</template>

<script>
import { Button, Divider } from 'ant-design-vue';
import { notice, infoNotice, successNotice, errorNotice, warnNotice, sysNotice } from '@common/notice';
import { successTip, errorTip, warnTip, infoTip } from '@common/tip';
import { Page } from '@components';
export default {
    name: 'NoticDemo', // 通知
    components: {
        Button,
        Divider,
        Page,
    },
    methods: {
        openSys() {
            sysNotice('系统通知', '这是一条普通的系统通知！');
        },
        openSysLink() {
            sysNotice('链接通知', '这是一条链接的通知，点击跳转链接', 'https://www.uiseed.cn');
        },
        openNormal() {
            notice('normal', '内容内容内容内容内容内容内容内容');
        },
        openInfo() {
            infoNotice('info', '内容内容内容内容内容内容内容内容');
        },
        openSuccess() {
            successNotice('success', '内容内容内容内容内容内容内容内容');
        },
        openError() {
            errorNotice('error', '内容内容内容内容内容内容内容内容');
        },
        openWarn() {
            warnNotice('warn', '内容内容内容内容内容内容内容内容');
        },
        openInfoTip() {
            infoTip('内容内容内容内容内容内容内容内容');
        },
        openSuccessTip() {
            successTip('内容内容内容内容内容内容内容内容');
        },
        openErrorTip() {
            errorTip('内容内容内容内容内容内容内容内容');
        },
        openWarnTip() {
            warnTip('内容内容内容内容内容内容内容内容');
        },
    },
};
</script>

<style lang="less" scoped>
.v-notice-demo {}
</style>
