<template>
    <div class="v-demo-page padding-h-md">
        <Divider orientation="left">功能演示</Divider>
        <Space>
            <Button v-for="item in demoList" :key="item.router" @click="() => gotoDemoPage(item)">{{
                item.name
            }}</Button>
        </Space>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { Button, Divider, Space } from 'view-ui-plus';

const demoList = [{
    name: '滚动组件', // 菜单名称
    router: 'demo-scroll', // 菜单路由
}, {
    name: '右键菜单', // 菜单名称
    router: 'demo-mouse-right', // 菜单路由
}, {
    name: '本地数据库', // 菜单名称
    router: 'demo-local-db', // 菜单路由
}, {
    name: '通知&提示', // 菜单名称
    router: 'demo-notice', // 菜单路由
}, {
    name: '粘贴板', // 菜单名称
    router: 'demo-clipboard', // 菜单路由
}, {
    name: 'IconPark图标', // 菜单名称
    router: 'demo-iconpark', // 菜单路由
}];

const router = useRouter();
const gotoDemoPage = (item: any) => {
    router.push(item.router);
}
</script>

<style scoped lang="less">

</style>