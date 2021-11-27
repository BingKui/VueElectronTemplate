<template>
    <div class="v-notice-demo">
        <Divider Divider content-position="left">系统通知</Divider>
        <Button @click="openSys">系统通知</Button>
        <Button type="primary" @click="openSysLink">系统通知-连接</Button>
        <Divider Divider content-position="left">软件通知</Divider>
        <Button @click="openNormal">normal</Button>
        <Button type="primary" @click="openInfo">info</Button>
        <Button type="success" @click="openSuccess">success</Button>
        <Button type="danger" @click="openError">error</Button>
        <Button type="warning" @click="openWarn">warn</Button>
    </div>
</template>

<script>
import { Button, Divider } from 'element-ui';
import { NoticeLocal, NoticeSystem } from '@common/notice';
export default {
    name: 'NoticDemo', // 通知
    components: {
        Button,
        Divider,
    },
    methods: {
        openSys() {
            NoticeSystem('系统通知', '这是一条普通的系统通知！');
        },
        openSysLink() {
            NoticeSystem('链接通知', '这是一条链接的通知，点击跳转链接', 'https://www.uiseed.cn');
        },
        openNormal() {
            NoticeLocal.open('normal', '内容内容内容内容内容内容内容内容');
        },
        openInfo() {
            NoticeLocal.info('info', '内容内容内容内容内容内容内容内容');
        },
        openSuccess() {
            NoticeLocal.success('success', '内容内容内容内容内容内容内容内容');
        },
        openError() {
            NoticeLocal.error('error', '内容内容内容内容内容内容内容内容');
        },
        openWarn() {
            NoticeLocal.warn('warn', '内容内容内容内容内容内容内容内容');
        },
    },
};
</script>

<style lang="less" scoped>
.v-notice-demo {
    padding: 0 @gap;
}
</style>
