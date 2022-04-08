<template>
    <div class="v-demo-page padding-h-md">
        <Divider orientation="left">功能演示</Divider>
        <Space>
            <Button v-for="item in demoList" :key="item.router" :icon="item.icon" @click="() => gotoDemoPage(item)">{{ item.name }}</Button>
        </Space>
    </div>
</template>

<script>
import { Button, Divider } from 'ant-design-vue';
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
                icon: 'appstore', // 图标
                name: '滚动组件', // 菜单名称
                router: 'demo-scroll', // 菜单路由
            }, {
                icon: 'menu', // 图标
                name: '右键菜单', // 菜单名称
                router: 'demo-mouse-right', // 菜单路由
            }, {
                icon: 'database', // 图标
                name: '本地数据库', // 菜单名称
                router: 'demo-local-db', // 菜单路由
            }, {
                icon: 'sound', // 图标
                name: '通知&提示', // 菜单名称
                router: 'demo-notice', // 菜单路由
            }, {
                icon: 'copy', // 图标
                name: '粘贴板', // 菜单名称
                router: 'demo-clipboard', // 菜单路由
            }, {
                icon: 'unordered-list', // 图标
                name: 'IconPark图标', // 菜单名称
                router: 'demo-iconpark', // 菜单路由
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
