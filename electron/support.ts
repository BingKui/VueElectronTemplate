import { UPDATE_ACTION_KEY } from './../src/constants/channel';
import path from 'path';
import { app, globalShortcut, ipcMain, Menu } from 'electron';
import { autoUpdater } from 'electron-updater';
const Datastore = require('nedb')
const Store = require('electron-store');
import { ACTION_KEY, DB_ACTION_KEY, UPDATE_MESSAGE, UPDATE_MESSAGE_TYPE } from './channel';
import { mainEvent } from './utils';
import { isMac, isDev, BASE_SETTING, UPDATE_URL } from './constants';
const systemSetting = new Store();

// 设置更新地址
autoUpdater.setFeedURL({ url: UPDATE_URL, provider: 'generic' });
autoUpdater.autoDownload = false;
autoUpdater.autoInstallOnAppQuit = true;

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
    ipcMain.on(UPDATE_ACTION_KEY.check, (event) => {
        autoUpdater.checkForUpdates();
        sendUpdateMessage = (info) => {
            event.sender.send(UPDATE_ACTION_KEY.message, info);
        };
    });
    // 出错
    autoUpdater.on('error', (err) => {
        sendUpdateMessage({
            type: UPDATE_MESSAGE_TYPE.message,
            message: UPDATE_MESSAGE.error,
        });
    });
    // 检查
    autoUpdater.on('checking-for-update', () => {
        sendUpdateMessage({
            type: UPDATE_MESSAGE_TYPE.message,
            message: UPDATE_MESSAGE.checking,
        });
    });
    // 有可用版本
    autoUpdater.on('update-available', (info) => {
        sendUpdateMessage({
            type: UPDATE_MESSAGE_TYPE.yes,
            message: UPDATE_MESSAGE.updateAva,
            info,
        });
        ipcMain.on(UPDATE_ACTION_KEY.download, (event) => {
            autoUpdater.downloadUpdate();
        });
    });
    // 没有可用的更新
    autoUpdater.on('update-not-available', (info) => {
        sendUpdateMessage({
            type: UPDATE_MESSAGE_TYPE.no,
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
            type: UPDATE_MESSAGE_TYPE.complate,
            message: UPDATE_MESSAGE.downloaded,
        });
        // 立即安装
        ipcMain.on(UPDATE_ACTION_KEY.now, (event) => {
            autoUpdater.quitAndInstall();
        });
    });
};

/**
 * 添加本地数据库
 * @param {String} name 数据库名称
 */
export const AddDataBase = (name: string) => {
    const db = new Datastore({
        filename: path.join(app.getPath(isDev ? 'downloads' : 'userData'), `${name}.db`), // 数据文件
        autoload: true, // 自动加载
    });
    // 添加数据库的增删改查基本方法监听，监听方式 ‘name-type’
    mainEvent(DB_ACTION_KEY.dbAddItem(name), (sender, item) => {
        db.insert(item, (err, newDoc) => {
            err ? sender(false) : sender(newDoc);
        });
    });
    mainEvent(DB_ACTION_KEY.dbDeleteItem(name), (sender, id) => {
        db.remove({ _id: id }, {}, (err, numRemoved) => {
            err ? sender(false) : sender(numRemoved);
        });
    });
    mainEvent(DB_ACTION_KEY.dbUpdateItem(name), (sender, id, value) => {
        db.update({ _id: id }, { $set: value }, (err, newDoc) => {
            err ? sender(false) : sender(newDoc);
        });
    });
    mainEvent(DB_ACTION_KEY.dbFindItem(name), (sender, id) => {
        db.findOne({ _id: id }, (err, doc) => {
            err ? sender(false) : sender(doc);
        });
    });
    mainEvent(DB_ACTION_KEY.dbFind(name), (sender, condition = {}) => {
        db.find({ ...condition }, (err, docs) => {
            err ? sender(false) : sender(docs);
        });
    });
    mainEvent(DB_ACTION_KEY.dbCount(name), (sender, condition = {}) => {
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
export const AddMenuList = (menuList = []) => {
    const template: any = [
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
