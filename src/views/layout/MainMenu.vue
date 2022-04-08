<template>
    <div class="v-main-menu-container">
        <Logo />
        <Menu class="v-main-menu" theme="light" :default-active="menuIndex" :router="true">
            <MenuItem v-for="(menu, i) in MenuData" :index="`${i}`" :key="`menu_item_${i}`" :route="menu.router">
                <div class="flex-row">
                    <Icon :class="menu.icon" />
                    {{menu.name}}
                </div>
            </MenuItem>
        </Menu>
    </div>
</template>

<script>
import { Menu, MenuItem, Icon } from 'element-ui';
import Logo from './Logo.vue';
import { MenuList } from '@router/menu';
export default {
    name: 'MainMenu',
    components: {
        Menu,
        MenuItem,
        Icon,
        Logo,
    },
    computed: {
        activeIndex() {
            return this.getDefaultIndex();
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
    .v-main-menu {
        width: 100% !important;
        border-right: none;
        .menu-item {
            align-items: center;
            &.is-active {
                background-color: #ecf5ff;
            }
        }
    }
}
</style>
