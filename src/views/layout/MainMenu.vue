<template>
    <div class="v-main-menu-container">
        <ScrollBar class="main-scroll">
            <Menu class="v-main-menu" mode="vertical" active-text-color="#409EFF" @select="selectMenu" :default-active="menuIndex">
                <MenuItemGroup v-for="(item, index) in MenuData" :title="item.groupName" :key="`group_${index}`">
                    <MenuItem :class="`menu-item ${activeClass(menu.name)}`" v-for="(menu, i) in item.menuList" :name="menu.router" :key="`menu_item_${i}`" :index="`${index}-${i}`">
                        <Icon :class="menu.icon" />
                        {{menu.name}}
                    </MenuItem>
                </MenuItemGroup>
            </Menu>
        </ScrollBar>
    </div>
</template>

<script>
import { MenuItemGroup, MenuItem, Menu, Icon } from 'element-ui';
import ScrollBar from '@components/ScrollBar';
import { MenuList, MenuRouter } from '@router/menu';
import { dealMenuBySearchValue } from '@common/utils';
export default {
    name: 'MainMenu',
    components: {
        Menu,
        Icon,
        MenuItemGroup,
        MenuItem,
        ScrollBar,
    },
    computed: {
        activeClass() {
            return (routeName) => {
                const { name } = this.$route;
                return routeName === name ? 'selected' : '';
            };
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
        selectMenu(index, indexPath) {
            const arr = `${index}`.split('-');
            const router = MenuList[arr[0]].menuList[arr[1]].router;
            this.$router.push(`/${router}`);
        },
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
    .main-scroll {
        .p-t(20px);
        height: calc(100vh - 20px);
        position: relative;
        &::after {
            content: '';
            display: block;
            width: 1px;
            height: 100vh;
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
        .menu-item {
            .flex();
            align-items: center;
            &.is-active {
                background-color: #ecf5ff;
            }
        }
    }
}
</style>
