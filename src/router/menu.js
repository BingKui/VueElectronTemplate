// main
import Home from '@views/Home';
import Demo from '@views/Demo';
import Setting from '@views/Setting';

// demo
import ScrollDemo from '@views/Demo/ScrollDemo';
import MouseRightDemo from '@views/Demo/MouseRightDemo';
import LocalDBDemo from '@views/Demo/LocalDBDemo';
import NoticeDemo from '@views/Demo/NoticeDemo';
import ClipboardDemo from '@views/Demo/ClipboardDemo';
import IconParkDemo from '@views/Demo/IconParkDemo';

export const MenuList = [{
    icon: 'home', // 图标
    name: '主页', // 菜单名称
    router: 'main-home', // 菜单路由
}, {
    icon: 'appstore', // 图标
    name: '功能演示', // 菜单名称
    router: 'demo', // 菜单路由
}, {
    icon: 'setting', // 图标
    name: '设置', // 菜单名称
    router: 'setting', // 菜单路由
}];

export const MenuRouter = [{
    path: '/',
    redirect: '/main-home',
}, {
    name: 'main-home',
    router: 'main-home',
    path: '/main-home',
    component: Home,
}, {
    name: 'demo-clipboard',
    router: 'demo-clipboard',
    path: '/demo-clipboard',
    component: ClipboardDemo,
}, {
    name: 'setting',
    router: 'setting',
    path: '/setting',
    component: Setting,
}, {
    name: 'demo',
    router: 'demo',
    path: '/demo',
    component: Demo,
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
