'use strict';

const { ipcRenderer } = window.require('electron');
// const ipcRenderer = {};
let robot = null;

window.itools = Object.freeze({
    __event__: {},
    // 隐藏主窗口
    hideMainWindow: () => {
        return require('electron').ipcRenderer.sendSync('api.base', 'hideMainWindow');
    },
    // 显示主窗口
    showMainWindow: () => {
        return ipcRenderer.sendSync('api.base', 'showMainWindow');
    },
    // 设置插件高度
    setExpendHeight: (height) => {
        return ipcRenderer.sendSync('api.base', 'setExpendHeight', height);
    },
    // 设置子输入框
    setSubInput: (onChange, placeholder = '', isFocus = true) => {
        if (typeof onChange !== 'function') return false;
        window.utools.__event__.onSubInputChange = onChange;
        return ipcRenderer.sendSync('api.base', 'setSubInput', {
            placeholder,
            isFocus
        });
    },
    // 移除子输入框
    removeSubInput: () => {
        delete window.utools.__event__.onSubInputChange;
        return ipcRenderer.sendSync('api.base', 'removeSubInput');
    },
    // 设置子输入框的值
    setSubInputValue: (value) => {
        return ipcRenderer.sendSync('api.base', 'setSubInputValue', value.toString());
    },
    // 子输入框获得焦点
    subInputFocus: () => {
        return ipcRenderer.sendSync('api.base', 'subInputFocus');
    },
    // 子输入框获得焦点并选中
    subInputSelect: () => {
        return ipcRenderer.sendSync('api.base', 'subInputSelect');
    },
    // 子输入框失去焦点
    subInputBlur: () => {
        return ipcRenderer.sendSync('api.base', 'subInputBlur');
    },
    // 隐藏插件
    outPlugin: () => {
        ipcRenderer.send('api.base', 'outPlugin');
    },
    // 设置动态特性
    setFeature: (featureConf) => {
        return ipcRenderer.sendSync('api.app', 'setFeature', featureConf);
    },
    // 移除动态特性
    removeFeature: (featureCode) => {
        return ipcRenderer.sendSync('api.app', 'removeFeature', featureCode.toString());
    },
    // 获取所有动态特性
    getFeatures: () => {
        return ipcRenderer.sendSync('api.app', 'getFeatures');
    },
    // mac是否拥有辅助权限
    isHadPrivilege: () => {
        return ipcRenderer.sendSync('api.app', 'isHadPrivilege');
    },
    // mac 请求辅助权限
    requestPrivilege: () => {
        return ipcRenderer.sendSync('api.app', 'requestPrivilege');
    },
    // 获取路径 与 app.getPath(name) 一致
    getPath: (name) => {
        return ipcRenderer.sendSync('api.app', 'getPath', name);
    },
    // 显示系统通知 body:正文内容 clickFeatureCode:点击进入插件的功能码 silent:是否发出系统提示音
    showNotification: (body, clickFeatureCode = null, silent = true) => {
        ipcRenderer.send('api.app', 'showNotification', {
            body,
            clickFeatureCode,
            silent
        });
    },
    // 跳转
    redirect: (cmdText, payloadCmd) => {
        const err = ipcRenderer.sendSync('api.app', 'redirect', {
            cmdText,
            payloadCmd
        });
        if (err) throw new Error(err);
    },
    // 复制文件到剪贴板
    copyFile: (filepaths) => {
        return ipcRenderer.sendSync('api.app', 'copyFile', filepaths);
    },
    // 复制图片到剪贴板
    copyImage: (buffer) => {
        return ipcRenderer.sendSync('api.app', 'copyImage', buffer);
    },
    // 屏幕取色
    screenColorPick: (callback) => {
        if (typeof callback === 'function') {
            window.utools.__event__.screenColorPickCallback = callback;
        }
        ipcRenderer.send('api.app', 'screenColorPick');
    },
    // 获取当前浏览器URL
    getCurrentBrowserUrl: () => {
        return ipcRenderer.sendSync('api.app', 'getCurrentBrowserUrl');
    },
    // 获取本地ID
    getLocalId: () => {
        return ipcRenderer.sendSync('api.app', 'getLocalId');
    },
    db: Object.freeze({
        // 创建/更新文档
        put: (doc) => {
            return ipcRenderer.sendSync('api.db', 'put', doc);
        },
        // 获取文档
        get: (id) => {
            return ipcRenderer.sendSync('api.db', 'get', id.toString());
        },
        // 删除文档 参数可以是 文档对象或id
        remove: (doc) => {
            return ipcRenderer.sendSync('api.db', 'remove', doc);
        },
        // 批量操作文档(新增、修改、删除)
        bulkDocs: (docs) => {
            return ipcRenderer.sendSync('api.db', 'bulkDocs', docs);
        },
        // 获取所有文档 可根据ID前缀查找
        allDocs: (prevKey) => {
            return ipcRenderer.sendSync('api.db', 'allDocs', prevKey);
        }
    }),
    // 插件第一次初始化事件
    onPluginReady: (callback) => {
        if (typeof callback !== 'function') return;
        window.utools.__event__.onPluginReady = callback;
    },
    // 插件进入时触发
    onPluginEnter: (callback) => {
        if (typeof callback !== 'function') return;
        window.utools.__event__.onPluginEnter = callback;
    },
    // 插件隐藏时触发
    onPluginOut: (callback) => {
        if (typeof callback !== 'function') return;
        window.utools.__event__.onPluginOut = callback;
    },
    // 插件分离时触发
    onPluginDetach: (callback) => {
        if (typeof callback !== 'function') return;
        window.utools.__event__.onPluginDetach = callback;
    },
    // 数据库从云端同步修改时。插件显示时或分离时才会触发
    onDbPull: (callback) => {
        if (typeof callback !== 'function') return;
        window.utools.__event__.onDbPull = callback;
    }
});
