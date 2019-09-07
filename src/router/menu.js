// main
import Home from '@views/Home';

// demo
import ScrollDemo from '@views/Demo/ScrollDemo';
import MouseRightDemo from '@views/Demo/MouseRightDemo';
import LocalDBDemo from '@views/Demo/LocalDBDemo';
import NoticeDemo from '@views/Demo/NoticeDemo';
import ClipboardDemo from '@views/Demo/ClipboardDemo';
import LoadMarkdownFile from '@views/Demo/LoadMarkdownFile';

export const MenuList = [{
    groupName: 'Main', // 分组名称
    menuList: [{
        icon: 'ios-home-outline', // 图标
        name: 'Home', // 菜单名称
        router: 'main-home', // 菜单路由
    }],
}, {
    groupName: 'Demo', // 分组名称
    menuList: [{
        icon: 'ios-albums-outline', // 图标
        name: 'ScrollDemo', // 菜单名称
        router: 'demo-scroll', // 菜单路由
    }, {
        icon: 'ios-albums-outline', // 图标
        name: 'MouseRightDemo', // 菜单名称
        router: 'demo-mouse-right', // 菜单路由
    }, {
        icon: 'ios-albums-outline', // 图标
        name: 'LocalDBDemo', // 菜单名称
        router: 'demo-local-db', // 菜单路由
    }, {
        icon: 'ios-albums-outline', // 图标
        name: 'NoticeDemo', // 菜单名称
        router: 'demo-notice', // 菜单路由
    }, {
        icon: 'ios-albums-outline', // 图标
        name: 'ClipboardDemo', // 菜单名称
        router: 'demo-clipboard', // 菜单路由
    }, {
        icon: 'ios-albums-outline', // 图标
        name: 'LoadMarkdownFile', // 菜单名称
        router: 'demo-load-markdown-file', // 菜单路由
    }],
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
    name: 'demo-clipboard',
    router: 'demo-clipboard',
    path: '/demo-clipboard',
    component: ClipboardDemo,
}, {
    name: 'demo-load-markdown-file',
    router: 'demo-load-markdown-file',
    path: '/demo-load-markdown-file',
    component: LoadMarkdownFile,
}];
