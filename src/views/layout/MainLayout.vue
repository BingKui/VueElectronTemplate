<template>
    <div class="v-main-layout">
        <Layout>
            <Sider class="left-silder">
                <MainMenu />
            </Sider>
        </Layout>
        <Layout :style="{marginLeft: '200px'}">
            <Content class="right-content">
                <ScrollBar class="main-content-scrollbar">
                    <slot></slot>
                </ScrollBar>
            </Content>
        </Layout>
    </div>
</template>

<script>
import { Layout } from 'ant-design-vue';
import ScrollBar from '@components/ScrollBar';
import MainMenu from './MainMenu';
export default {
    name: 'MainLayout',
    components: {
        MainMenu,
        Layout,
        Sider: Layout.Sider,
        Header: Layout.Header,
        Content: Layout.Content,
        ScrollBar,
    },
};
</script>

<style lang="less">
@header-height: 40px;
@content-height: 100vh;
.v-main-layout {
    .v-main-header {
        height: @header-height;
        .border-line(@border-color, 0, 0);
    }
    .v-main-content {
        height: @content-height;
    }
    .left-silder {
        height: @content-height;
        position: fixed;
        left: 0;
        background-color: @white;
        user-select: none;
        .ivu-menu-item-group-title {
            -webkit-app-region: drag;
        }
    }
    .right-content {
        overflow: hidden;
        height: @content-height;
        padding: 0;
        .main-content-scrollbar {
            height: @content-height;
        }
    }
}
</style>
