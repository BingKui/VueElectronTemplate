<template>
    <div class="v-main-menu-container">
        <Logo />
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
import Logo from './Logo.vue';
import { MenuList, MenuRouter } from '@router/menu';
export default {
    name: 'MainMenu',
    components: {
        Menu,
        MenuItem,
        MenuGroup,
        Icon,
        Input,
        ScrollBar,
        Logo,
    },
    computed: {
        activeName() {
            const { name } = this.$route;
            const val = MenuRouter.filter(item => item.name === name);
            return val.length > 0 ? val[0].router : '';
        },
    },
    mounted() {
        this.menuIndex = this.getDefaultIndex();
    },
    data() {
        return {
            MenuData: MenuList,
            menuIndex: '0-0',
        };
    },
    methods: {
        getDefaultIndex() {
            const { name } = this.$route;
            let g_index = 0;
            let i_index = 0;
            for (let i = 0; i < MenuList.length; i++) {
                const arr = MenuList[i].menuList;
                for (let j = 0; j < arr.length; j++) {
                    const item = arr[j];
                    if (name === item.router) {
                        g_index = i;
                        i_index = j;
                        break;
                    }
                }
            }
            return `${g_index}-${i_index}`;
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
    .main-scroll {
        padding-top: 20px;
        height: calc(100vh - 20px);
        position: relative;
    }
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
