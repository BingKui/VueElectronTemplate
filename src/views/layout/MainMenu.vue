<template>
    <Menu class="v-main-menu flex-row-center flex-item-one" :active-name="activeName" width="auto"
        :on-select="handleMenuChange">
        <MenuItem v-for="(menu, i) in menuList" :name="menu.router" :key="`menu_item_${i}`" :to="menu.router">
        <div class="flex-row">
            <div class="margin-top-sm margin-right-sm">
                <DashboardCar v-if="menu.icon == 'main'" theme="outline" size="18" :strokeWidth="4" />
                <AllApplication v-if="menu.icon == 'demo'" theme="outline" size="18" :strokeWidth="4" />
                <Setting v-if="menu.icon == 'setting'" theme="outline" size="18" :strokeWidth="4" />
                <Info v-if="menu.icon == 'about'" theme="outline" size="18" :strokeWidth="4" />
            </div>
            {{ menu.name }}
        </div>
        </MenuItem>
    </Menu>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Menu, MenuItem } from 'view-ui-plus';
import { menuList } from '@/router';
import { DashboardCar, AllApplication, Setting, Info } from '@icon-park/vue-next';

const activeName = ref<string>('dashboard');

onMounted(() => {
    activeName.value = location.hash.replaceAll('#/', '') || 'main';
});

const handleMenuChange = (name: string) => {
    activeName.value = name;
}
</script>

<style scoped lang="less">
.v-main-menu {
    &::after {
        display: none !important;
    }

    &.ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu):after {
        display: none;
    }

    .menu-icon {
        margin-top: @gap-sm;
    }
}
</style>