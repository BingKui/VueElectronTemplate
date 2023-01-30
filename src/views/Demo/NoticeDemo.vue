<template>
    <Page class="v-notice-demo" header="通知&提示">
        <Divider orientation="left">系统通知</Divider>
        <Space>
            <Button @click="openSys">系统通知</Button>
            <Button type="primary" @click="openSysLink">系统通知-连接</Button>
        </Space>
        <Divider orientation="left">软件通知</Divider>
        <Space>
            <Button @click="openNormal">normal</Button>
            <Button type="primary" @click="openInfo">info</Button>
            <Button type="success" @click="openSuccess">success</Button>
            <Button type="error" @click="openError">error</Button>
            <Button type="warning" @click="openWarn">warn</Button>
        </Space>
        <Divider orientation="left">消息提醒</Divider>
        <Space>
            <Button type="info" @click="openInfoTip">info</Button>
            <Button type="success" @click="openSuccessTip">success</Button>
            <Button type="error" @click="openErrorTip">error</Button>
            <Button type="warning" @click="openWarnTip">warn</Button>
        </Space>
    </Page>
</template>

<script setup lang="ts">
import { Button, Divider, Space } from 'view-ui-plus';
import Page from '@/components/Page.vue';
import { errorNotice, infoNotice, notice, successNotice, sysNotice, warnNotice } from '@/common/notice';
import { errorTip, infoTip, successTip, warnTip } from '@/common/tip';
const openSys = () => {
    sysNotice('系统通知', '这是一条普通的系统通知！');
}
const openSysLink = () => {
    sysNotice('链接通知', '这是一条链接的通知，点击跳转链接', 'https://www.uiseed.cn');
}
const openNormal = () => {
    notice('normal', '内容内容内容内容内容内容内容内容');
}
const openInfo = () => {
    infoNotice('info', '内容内容内容内容内容内容内容内容');
}
const openSuccess = () => {
    successNotice('success', '内容内容内容内容内容内容内容内容');
}
const openError = () => {
    errorNotice('error', '内容内容内容内容内容内容内容内容');
}
const openWarn = () => {
    warnNotice('warn', '内容内容内容内容内容内容内容内容');
}
const openInfoTip = () => {
    infoTip('内容内容内容内容内容内容内容内容');
}
const openSuccessTip = () => {
    successTip('内容内容内容内容内容内容内容内容');
}
const openErrorTip = () => {
    errorTip('内容内容内容内容内容内容内容内容');
}
const openWarnTip = () => {
    warnTip('内容内容内容内容内容内容内容内容');
}
</script>

<style scoped lang="less">
.v-notice-demo {}
</style>