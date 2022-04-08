// 功能支持
import { app, ipcMain, Menu, autoUpdater, globalShortcut } from 'electron';
import { BASE_SETTING, UPDATE_URL, UPDATE_MESSAGE } from '@constants/common';
import { ACTION_KEY, UPDATE_MESSAGE_TYPE } from '@constants/channel';
import { mainEvent } from './utils';
import path from 'path';
import Datastore from 'nedb';
const Store = require('electron-store');
const systemSetting = new Store();
import { isMac } from './utils';

/**
 * 处理系统设置
 * @param {Object} setting 用户设置
 */
export const dealUserSetting = (setting) => {
    const { openAtLogin, dockShow, autoUpdate } = setting;
    // 判断是否要检查更新
    if (autoUpdate) {
        setTimeout(() => {
            autoUpdater.checkForUpdates();
        }, 2000);
    }
    app.setLoginItemSettings({
        openAtLogin,
        openAsHidden: true,
    });
    if (app.dock) {
        dockShow ? app.dock.show() : app.dock.hide();
    }
};

/**
 * 支持app设置
 */
export const AddAppSetting = () => {
    let userSetting = systemSetting.get('setting');
    if (!userSetting) {
        userSetting = {
            ...BASE_SETTING,
            openAtLogin: app.getLoginItemSettings().openAtLogin || false,
        };
        systemSetting.set('setting', userSetting);
    }
    dealUserSetting(userSetting);
    // 获取设置
    mainEvent(ACTION_KEY.getSetting, sender => {
        const setting = systemSetting.get('setting');
        sender(setting);
    });
    // 修改设置
    mainEvent(ACTION_KEY.setSetting, (sender, params = {}) => {
        const setting = systemSetting.get('setting');
        const _setting = {
            ...setting,
            ...params,
        };
        // 清除一下
        systemSetting.set('setting', _setting);
        dealUserSetting(_setting);
        sender(_setting);
    });
};

/**
 * 增加应用更新通知
 */
export const AddAppUpdate = () => {
    let sendUpdateMessage;
    // 检查更新
    ipcMain.on(ACTION_KEY.updateCheck, (event) => {
        autoUpdater.checkForUpdates();
        sendUpdateMessage = (info) => {
            event.sender.send(ACTION_KEY.updateMessage, info);
        };
    });
    // 设置更新地址
    autoUpdater.setFeedURL(UPDATE_URL);
    autoUpdater.autoDownload = false;
    autoUpdater.autoInstallOnAppQuit = true;
    // 出错
    autoUpdater.on('error', (err) => {
        sendUpdateMessage({
            type: UPDATE_MESSAGE_TYPE.msg,
            message: UPDATE_MESSAGE.error,
        });
    });
    // 检查
    autoUpdater.on('checking-for-update', () => {
        sendUpdateMessage({
            type: UPDATE_MESSAGE_TYPE.msg,
            message: UPDATE_MESSAGE.checking,
        });
    });
    // 有可用版本
    autoUpdater.on('update-available', (info) => {
        sendUpdateMessage({
            type: UPDATE_MESSAGE_TYPE.actionYes,
            message: UPDATE_MESSAGE.updateAva,
            info,
        });
        ipcMain.on(ACTION_KEY.updateDownload, (event) => {
            autoUpdater.downloadUpdate();
        });
    });
    // 没有可用的更新
    autoUpdater.on('update-not-available', (info) => {
        sendUpdateMessage({
            type: UPDATE_MESSAGE_TYPE.actionNo,
            message: UPDATE_MESSAGE.updateNotAva,
            info,
        });
    });
    // 更新下载事件
    autoUpdater.on('download-progress', (info) => {
        // 通信，更新下载进度
        sendUpdateMessage({
            type: UPDATE_MESSAGE_TYPE.progress,
            message: UPDATE_MESSAGE.progress,
            info,
        });
    });
    // 下载完成
    autoUpdater.on('update-downloaded', () => {
        sendUpdateMessage({
            type: UPDATE_MESSAGE_TYPE.actionComplate,
            message: UPDATE_MESSAGE.downloaded,
        });
        // 立即安装
        ipcMain.on(ACTION_KEY.updateNow, (event) => {
            autoUpdater.quitAndInstall();
        });
    });
};

/**
 * 添加本地数据库
 * @param {String} name 数据库名称
 */
export const AddDataBase = (name) => {
    const db = new Datastore({
        filename: path.join(app.getPath('userData'), `${name}.db`), // 数据文件
        autoload: true, // 自动加载
    });
    // 添加数据库的增删改查基本方法监听，监听方式 ‘name-type’
    mainEvent(ACTION_KEY.dbAddItem(name), (sender, item) => {
        db.insert(item, (err, newDoc) => {
            err ? sender(false) : sender(newDoc);
        });
    });
    mainEvent(ACTION_KEY.dbDeleteItem(name), (sender, id) => {
        db.remove({ _id: id }, {}, (err, numRemoved) => {
            err ? sender(false) : sender(numRemoved);
        });
    });
    mainEvent(ACTION_KEY.dbUpdateItem(name), (sender, id, value) => {
        db.update({ _id: id }, { $set: value }, (err, newDoc) => {
            err ? sender(false) : sender(newDoc);
        });
    });
    mainEvent(ACTION_KEY.dbFindItem(name), (sender, id) => {
        db.findOne({ _id: id }, (err, doc) => {
            err ? sender(false) : sender(doc);
        });
    });
    mainEvent(ACTION_KEY.dbFind(name), (sender, condition = {}) => {
        db.find({ ...condition }, (err, docs) => {
            err ? sender(false) : sender(docs);
        });
    });
    mainEvent(ACTION_KEY.dbCount(name), (sender, condition = {}) => {
        db.count({ ...condition }, (err, count) => {
            err ? sender(0) : sender(count);
        });
    });
    return db;
};


/**
 * 添加菜单
 * @param {Array} menuList 菜单数组对象
 */
export const AddMenuList = (menuList=[]) => {
    const template = [
        ...(isMac ? [{
            label: app.getName(),
            submenu: [
                { label: `关于 ${app.getName()}`, role: 'about' },
                { type: 'separator' },
                { label: '隐藏', role: 'hide' },
                { label: '隐藏其他', role: 'hideothers' },
                { label: '显示', role: 'unhide' },
                { type: 'separator' },
                { label: `关闭 ${app.getName()}`, role: 'close' },
                { label: `退出 ${app.getName()}`, role: 'quit' }
            ],
        }] : []),
        {
            label: '编辑',
            submenu: [
                { label: '撤销', role: 'undo' },
                { label: '重做', role: 'redo' },
                { type: 'separator' },
                { label: '剪切', role: 'cut' },
                { label: '复制', role: 'copy' },
                { label: '粘贴', role: 'paste' },
                { type: 'separator' },
                { label: '全选', role: 'selectAll' }
            ]
        },
    ];
    const _t = template.concat(menuList);
    const menu = Menu.buildFromTemplate(_t);
    Menu.setApplicationMenu(menu);
};

/**
 * 添加系统快捷键，建议使用 constants 中的枚举值
 * @param {String} key 快捷键组合
 * @param {Function} action 快捷键的操作函数
 */
export const AddShortcuts = (key, action) => {
    globalShortcut.register(key, action);
};
