<template>
    <div class="v-main-layout">
        <Container>
            <Aside class="left-silder" width="200px">
                <MainMenu />
            </Aside>
        </Container>
        <Container :style="{marginLeft: '200px'}">
            <Main class="right-content">
                <ScrollBar class="main-content-scrollbar">
                    <slot></slot>
                </ScrollBar>
            </Main>
        </Container>
    </div>
</template>

<script>
import { Aside, Container, Main } from 'element-ui';
import ScrollBar from '@components/ScrollBar';
import MainMenu from './MainMenu';
export default {
    name: 'MainLayout',
    components: {
        MainMenu,
        ScrollBar,
        Aside, Container, Main,
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
        .p(0);
        .main-content-scrollbar {
            height: @content-height;
        }
    }
}
</style>
