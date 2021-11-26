// 主程序相关方法
import { app, BrowserWindow, ipcMain, Menu, Tray, autoUpdater, globalShortcut } from 'electron';
const { port, host } = require('../electron/config');
import { BASE_SETTING, PLATFORM_VALUE, UPDATE_URL, UPDATE_MESSAGE } from '@constants/common';
import { ACTION_KEY, ACTION_RESULT, UPDATE_MESSAGE_TYPE } from '@constants/channel';
import path from 'path';
import Datastore from 'nedb';
const Store = require('electron-store');
const systemSetting = new Store();

// 是否是测试环境
export const isDev = process.env.ENV === 'dev';
// 是否是 Windows
export const isWin = process.platform === PLATFORM_VALUE.win;
// 是否是 Mac
export const isMac = process.platform === PLATFORM_VALUE.mac;
// 是否是 Linux
export const isLinux = process.platform === PLATFORM_VALUE.linux;
// 系统托盘图标
export const trayIcon = path.resolve(__dirname, './assets/tray.png');
// 主界面地址
export const mainURL = isDev ? `http://${host}:${port}` : `file://${__dirname}/index.html`;

/**
 * 创建主窗口
 * @returns BreoserWindow
 */
export const createMainWindow = () => {
    return new BrowserWindow({
        title: app.getName(),
        height: 700,
        width: 700,
        center: true,
        show: false, // 禁止显示
        // resizable: false, // 不可修改窗口大小
        // maximizable: false, // 不存在最大化
        // skipTaskbar: true, // 任务栏显示
        // useContentSize: false, // 不允许修改大小
        // transparent: true, // 透明
        // frame: false, // 不使用框架
        // fullscreenable: false,
        // titleBarStyle: 'hidden',
        // backgroundColor: 'none',
        // roundedCorners: false, // 是否显示圆角（macOS）
        webPreferences: {
            devTools: isDev,
            scrollBounce: false,
            nodeIntegration: true,
            contextIsolation: false,
            // webSecurity: false,
        },
    });
};

/**
 * 生成状态栏菜单
 */
export const createTrayMenu = () => {
    return Menu.buildFromTemplate([
        { label: '退出', click: () => {
            app.exit();
            // 强制结束进程
        } },
    ]);
};

/**
 * 处理系统设置
 * @param {Object} setting 用户设置
 * @param {Object} app app对象
 */
const dealUserSetting = (setting, app, win) => {
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
    if (!app.dock) return;
    if (dockShow) {
        app.dock.show();
    } else {
        app.dock.hide();
    }
};

/**
 * 支持app设置
 */
export const AddAppSetting = (app, win) => {
    let userSetting = systemSetting.get('setting');
    if (!userSetting) {
        userSetting = {
            ...BASE_SETTING,
            openAtLogin: app.getLoginItemSettings().openAtLogin || false,
        };
        systemSetting.set('setting', userSetting);
    }
    dealUserSetting(userSetting, app, win);
    // 获取设置
    ipcMain.on(ACTION_KEY.getSetting, (event) => {
        const setting = systemSetting.get('setting');
        event.sender.send(`${ACTION_KEY.getSetting}${ACTION_RESULT}`, setting);
    });
    // 修改设置
    ipcMain.on(ACTION_KEY.setSetting, (event, params = {}) => {
        const setting = systemSetting.get('setting');
        const _setting = {
            ...setting,
            ...params,
        };
        systemSetting.set('setting', _setting);
        dealUserSetting(_setting, app, win);
        event.sender.send(`${ACTION_KEY.setSetting}${ACTION_RESULT}`, _setting);
    });
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
 * 添加本地数据库
 * @param {String} name 数据库名称
 */
export const AddDataBase = (name) => {
    const db = new Datastore({
        filename: path.join(app.getPath('userData'), `${name}.db`), // 数据文件
        autoload: true, // 自动加载
    });
    // 添加数据库的增删改查基本方法监听，监听方式 ‘name-type’
    ipcMain.on(`${name}-add`, (event, item) => {
        db.insert(item, (err, newDoc) => {
            if (err) {
                event.sender.send(`${name}-add-result`, false);
            }
            event.sender.send(`${name}-add-result`, newDoc);
        });
    });
    ipcMain.on(`${name}-del`, (event, id) => {
        db.remove({ _id: id }, {}, (err, numRemoved) => {
            if (err) {
                event.sender.send(`${name}-del-result`, false);
            }
            event.sender.send(`${name}-del-result`, true);
        });
    });
    ipcMain.on(`${name}-update`, (event, condition, value) => {
        db.update(condition, { $set: value }, (err, newDoc) => {
            if (err) {
                event.sender.send(`${name}-update-result`, false);
            }
            event.sender.send(`${name}-update-result`, true);
        });
    });
    ipcMain.on(`${name}-find-all`, (event) => {
        db.find({}, (err, docs) => {
            if (err) {
                event.sender.send(`${name}-find-all-result`, false);
            }
            event.sender.send(`${name}-find-all-result`, docs);
        });
    });
    ipcMain.on(`${name}-find`, (event, condition) => {
        db.findOne(condition, (err, doc) => {
            if (err) {
                event.sender.send(`${name}-find-result`, false);
            }
            event.sender.send(`${name}-find-result`, doc);
        });
    });
    ipcMain.on(`${name}-find-by-condition`, (event, condition) => {
        db.find(condition, (err, docs) => {
            if (err) {
                event.sender.send(`${name}-find-by-condition-result`, false);
            }
            event.sender.send(`${name}-find-by-condition-result`, docs);
        });
    });
    ipcMain.on(`${name}-count`, (event, condition={}) => {
        db.count({ ...condition, }, (err, count) => {
            if (err) {
                event.sender.send(`${name}-count-result`, 0);
            }
            event.sender.send(`${name}-count-result`, count);
        });
    });
    return db;
};

/**
 * 增加应用更新通知
 * @param {Object} mainWindow 窗口对象
 */
export const AddAppUpdate = (mainWindow) => {
    const sendUpdateMessage = (info) => {
        mainWindow.webContents.send(ACTION_KEY.updateMessage, info);
    };
    // 设置更新地址
    autoUpdater.setFeedURL(UPDATE_URL);
    autoUpdater.autoDownload = false;
    autoUpdater.autoInstallOnAppQuit = true;
    // 添加时间监听
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

    // 检查更新
    ipcMain.on(ACTION_KEY.updateCheck, (event) => {
        autoUpdater.checkForUpdates();
    });

};

/**
 * 添加系统快捷键，建议使用 constants 中的枚举值
 * @param {String} key 快捷键组合
 * @param {Function} action 快捷键的操作函数
 */
export const AddShortcuts = (key, action) => {
    globalShortcut.register(key, action);
};
