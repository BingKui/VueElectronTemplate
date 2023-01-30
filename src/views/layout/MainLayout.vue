<template>
    <Layout class="v-main-layout">
        <Sider class="layout-sider">
            <Logo />
            <MainMenu />
            <update />
        </Sider>
        <Content>
            <slot></slot>
        </Content>
    </Layout>
</template>

<script setup lang="ts">
import { Layout, Content, Sider } from 'view-ui-plus';
import Logo from './Logo.vue';
import MainMenu from './MainMenu.vue';
import Update from '@/components/Update.vue';
</script>

<style scoped lang="less">
@header-height: 40px;
@content-height: 100vh;
.v-main-layout {
    height: 100vh;
    .layout-sider {
        height: @content-height;
        background-color: @white;
        border-right: @border-mini;
        user-select: none;
    }
}
</style>