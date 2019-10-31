<template>
    <div class="v-main-menu-container">
        <ScrollBar class="main-scroll">
            <Menu class="v-main-menu" theme="light" :active-name="activeName">
                <MenuGroup v-for="(item, index) in MenuData" :title="item.groupName" :key="`group_${index}`">
                    <MenuItem v-for="(menu, i) in item.menuList" :name="menu.router" :key="`menu_item_${i}`" :to="menu.router">
                        <Icon :type="menu.icon" />
                        {{menu.name}}
                    </MenuItem>
                </MenuGroup>
            </Menu>
        </ScrollBar>
    </div>
</template>

<script>
import { Menu, MenuGroup, MenuItem, Icon, Input } from 'view-design';
import ScrollBar from '@components/ScrollBar';
import { MenuList, MenuRouter } from '@router/menu';
import { dealMenuBySearchValue } from '@common/utils';
export default {
    name: 'MainMenu',
    components: {
        Menu,
        MenuItem,
        MenuGroup,
        Icon,
        Input,
        ScrollBar,
    },
    computed: {
        activeName() {
            const { name } = this.$route;
            const val = MenuRouter.filter(item => item.name === name);
            return val.length > 0 ? val[0].router : '';
        },
    },
    data() {
        return {
            MenuData: MenuList,
        };
    },
};
</script>

<style lang="less">
.v-main-menu-container {
    height: 100vh;
    -webkit-app-region: drag;
    .main-scroll {
        .p-t(20px);
        height: 100vh;
        position: relative;
        &::after {
            content: '';
            display: block;
            width: 1px;
            height: 100%;
            position: absolute;
            background-color: #dedee2;
            top: 0;
            right: 0;
            bottom: 0;
            z-index: 1;
        }
    }
    .v-main-menu {
        width: 100% !important;
    }
}
</style>
