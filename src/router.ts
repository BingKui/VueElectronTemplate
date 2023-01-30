import { createRouter, createWebHashHistory } from "vue-router";

import Main from './views/Main.vue';
import Demo from './views/Demo.vue';
import Setting from './views/Setting.vue';
import About from './views/About.vue';

// demo - 测试地址
import ScrollDemo from './views/Demo/ScrollDemo.vue';
import MouseRightDemo from './views/Demo/MouseRightDemo.vue';
import LocalDBDemo from './views/Demo/LocalDBDemo.vue';
import NoticeDemo from './views/Demo/NoticeDemo.vue';
import ClipboardDemo from './views/Demo/ClipboardDemo.vue';
import IconParkDemo from './views/Demo/IconParkDemo.vue';

export const DemoMenuRouter = [{
    name: 'demo-clipboard',
    router: 'demo-clipboard',
    path: '/demo-clipboard',
    component: ClipboardDemo,
}, {
    name: 'demo-scroll',
    router: 'demo-scroll',
    path: '/demo-scroll',
    component: ScrollDemo,
}, {
    name: 'demo-mouse-right',
    router: 'demo-mouse-right',
    path: '/demo-mouse-right',
    component: MouseRightDemo,
}, {
    name: 'demo-local-db',
    router: 'demo-local-db',
    path: '/demo-local-db',
    component: LocalDBDemo,
}, {
    name: 'demo-notice',
    router: 'demo-notice',
    path: '/demo-notice',
    component: NoticeDemo,
}, {
    name: 'demo-iconpark',
    router: 'demo-iconpark',
    path: '/demo-iconpark',
    component: IconParkDemo,
}];


export const menuList = [{
    icon: 'main', // 图标
    name: '首页', // 菜单名称
    router: 'main', // 菜单路由
}, {
    icon: 'demo', // 图标
    name: '功能示例', // 菜单名称
    router: 'demo', // 菜单路由
}, {
    icon: 'setting', // 图标
    name: '设置', // 菜单名称
    router: 'setting', // 菜单路由
}, {
    icon: 'about', // 图标
    name: '关于', // 菜单名称
    router: 'about', // 菜单路由
}];

const routes = [
    { path: '/', redirect: '/main', },
    { path: '/main', component: Main },
    { path: '/demo', component: Demo },
    { path: '/setting', component: Setting },
    { path: '/about', component: About },
    ...DemoMenuRouter,
];
const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;