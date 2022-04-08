<template>
    <div class="v-main-menu-container">
        <Logo />
        <Menu class="v-main-menu" theme="light" :selectedKeys="[activeKey]" @click="handleMenuItemClick">
            <MenuItem v-for="menu in MenuData" :name="menu.router" :key="menu.router">
                <Icon :type="menu.icon" />
                {{menu.name}}
            </MenuItem>
        </Menu>
    </div>
</template>

<script>
import { Menu, Icon } from 'ant-design-vue';
import Logo from './Logo.vue';
import { MenuList, MenuRouter } from '@router/menu';
export default {
    name: 'MainMenu',
    components: {
        Menu,
        MenuItem: Menu.Item,
        Icon,
        Logo,
    },
    mounted() {
        this.activeKey = this.getDefaultKey();
    },
    data() {
        return {
            MenuData: MenuList,
            activeKey: MenuList[0].router,
        };
    },
    methods: {
        getDefaultKey() {
            const { name } = this.$route;
            let _key = 0;
            for (let i = 0; i < MenuList.length; i++) {
                const item = MenuList[i];
                if (name === item.router) {
                    _key = name;
                    break;
                }
            }
            return `${_key}`;
        },
        handleMenuItemClick({ key }) {
            if (this.activeKey == key) return;
            this.activeKey = key;
            this.$router.push(key);
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
