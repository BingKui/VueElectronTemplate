<template>
    <div class="v-main-menu-container">
        <Logo />
        <Menu class="v-main-menu" theme="light" :active-name="activeName">
            <MenuItem v-for="(menu, i) in MenuData" :name="menu.router" :key="`menu_item_${i}`" :to="menu.router">
                <Icon :type="menu.icon" />
                {{menu.name}}
            </MenuItem>
        </Menu>
    </div>
</template>

<script>
import { Menu, MenuItem, Icon } from 'view-design';
import Logo from './Logo.vue';
import { MenuList, MenuRouter } from '@router/menu';
export default {
    name: 'MainMenu',
    components: {
        Menu,
        MenuItem,
        Icon,
        Logo,
    },
    computed: {
        activeName() {
            const { name } = this.$route;
            const val = MenuRouter.filter(item => item.name === name || item.name == name.split('-')[0]);
            return val.length > 0 ? val[0].router : '';
        },
    },
    mounted() {
        this.menuIndex = this.getDefaultIndex();
    },
    data() {
        return {
            MenuData: MenuList,
            menuIndex: '0',
        };
    },
    methods: {
        getDefaultIndex() {
            const { name } = this.$route;
            let g_index = 0;
            for (let i = 0; i < MenuList.length; i++) {
                const item = MenuList[i];
                if (name === item.router) {
                    g_index = i;
                    break;
                }
            }
            return `${g_index}`;
        },
    },
};
</script>

<style lang="less">
.v-main-menu-container {
    height: 100vh;
    -webkit-app-region: drag;
    overflow: hidden;
    border-right: @border-mini;
    .ivu-menu-vertical.ivu-menu-light:after {
        display: none;
    }
    .ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu):after {
        display: none;
    }
    .v-main-menu {
        width: 100% !important;
        .menu-item {
            align-items: center;
            &.is-active {
                background-color: #ecf5ff;
            }
        }
    }
}
</style>
