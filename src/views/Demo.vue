<template>
    <div class="v-demo-page padding-h-md">
        <Divider content-position="left">功能演示</Divider>
        <Space>
            <Button v-for="item in demoList" :key="item.router" :icon="item.icon" @click="() => gotoDemoPage(item)">{{ item.name }}</Button>
        </Space>
    </div>
</template>

<script>
import { Button, Divider } from 'element-ui';
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
                icon: 'el-icon-receiving', // 图标
                name: '滚动组件', // 菜单名称
                router: 'demo-scroll', // 菜单路由
            }, {
                icon: 'el-icon-mouse', // 图标
                name: '右键菜单', // 菜单名称
                router: 'demo-mouse-right', // 菜单路由
            }, {
                icon: 'el-icon-coin', // 图标
                name: '本地数据库', // 菜单名称
                router: 'demo-local-db', // 菜单路由
            }, {
                icon: 'el-icon-chat-round', // 图标
                name: '通知&提示', // 菜单名称
                router: 'demo-notice', // 菜单路由
            }, {
                icon: 'el-icon-document', // 图标
                name: '粘贴板', // 菜单名称
                router: 'demo-clipboard', // 菜单路由
            }, {
                icon: 'el-icon-tickets', // 图标
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
