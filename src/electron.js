// electron 相关的原生方法封装
import { app, Notification, globalShortcut, Menu } from 'electron';

// 主进程中的通知，只能在主进程中使用
const Notic = (title, body) => {
    const _n = new Notification({
        title, // 标题
        subtitle: '', // 副标题
        body, // 内容
        silent: true, // 是否发出提示音
        icon: '', // 提示图标
        hasReply: false, // 是否存在回复框
        replyPlaceholder: '', // 回复框中的提示信息
        closeButtonText: '关闭', // 关闭按钮文案
    });
    _n.show();
};

/**
 * 添加系统快捷键，建议使用 constants 中的枚举值
 * @param {String} key 快捷键组合
 * @param {Function} action 快捷键的操作函数
 */
const AddShortcuts = (key, action) => {
    globalShortcut.register(key, action);
};

/**
 * 添加菜单
 * @param {Array} menuList 菜单数组对象
 */
const AddMenuList = (menuList=[]) => {
    const template = [{
        label: app.getName(),
        submenu: [
            { label: `关于${app.getName()}`, role: 'about', accelerator: 'Command+I', },
            { label: '隐藏', role: 'hide' },
            { type: 'separator' },
            { label: '退出', role: 'quit', accelerator: 'Command+Q' }
        ]
    }];
    const _t = template.concat(menuList);
    const menu = Menu.buildFromTemplate(_t);
    Menu.setApplicationMenu(menu);
};

module.exports = {
    Notic,
    AddShortcuts,
    AddMenuList,
};
