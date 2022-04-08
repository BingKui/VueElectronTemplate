<template>
    <div class="v-demo-page padding-h-md">
        <Divider orientation="left">功能演示</Divider>
        <Space>
            <Button v-for="item in demoList" :key="item.router" :icon="item.icon" @click="() => gotoDemoPage(item)">{{ item.name }}</Button>
        </Space>
    </div>
</template>

<script>
import { Button, Divider } from 'view-design';
import { Space } from '@components';
export default {
    name: 'Demo', // 演示
    components: {
        Button,
        Divider,
        Space,
    },
    data() {
        return {
            demoList: [{
                icon: 'ios-albums-outline', // 图标
                name: '滚动组件', // 菜单名称
                router: 'demo-scroll', // 菜单路由
            }, {
                icon: 'ios-menu', // 图标
                name: '右键菜单', // 菜单名称
                router: 'demo-mouse-right', // 菜单路由
            }, {
                icon: 'ios-cube-outline', // 图标
                name: '本地数据库', // 菜单名称
                router: 'demo-local-db', // 菜单路由
            }, {
                icon: 'ios-notifications-outline', // 图标
                name: '通知&提示', // 菜单名称
                router: 'demo-notice', // 菜单路由
            }, {
                icon: 'ios-copy-outline', // 图标
                name: '粘贴板', // 菜单名称
                router: 'demo-clipboard', // 菜单路由
            }],
        };
    },
    methods: {
        gotoDemoPage(item) {
            this.$router.push(item.router);
        },
    },
};
</script>

<style lang="less" scoped>

</style>
