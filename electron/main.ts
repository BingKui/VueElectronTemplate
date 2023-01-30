// 主进程 - 渲染容器

import { app, Tray } from "electron";
import { appIcon, isDev, mainURL, trayIcon } from "./constants";
import { AddAppSetting, AddAppUpdate, AddDataBase } from './support';
import { createMainWindow, createTrayMenu } from "./utils";

let mainWindow: Electron.BrowserWindow | null, tray: Electron.Tray | null;

const initAppWindow = () => {
    mainWindow = createMainWindow();
    mainWindow.loadURL(mainURL);
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
    mainWindow.on('ready-to-show', () => {
        mainWindow?.showInactive()
        // isDev ? mainWindow?.showInactive() : mainWindow?.show();
    });
    if (isDev) mainWindow.webContents.openDevTools();
};

app.on('ready', () => {
    // 初始化窗口
    initAppWindow();
    // 添加本地数据库支持
    AddDataBase('dbtest');
    // 添加设置支持
    AddAppSetting();
    // 添加自定义菜单
    // AddMenuList();
    // 添加系统托盘
    if (!tray) {
        // 添加托盘
        tray = new Tray(trayIcon);
        tray.setToolTip(app.getName());
        // 左键打开
        tray.on('click', (event, bounds, position) => {
            tray?.setContextMenu(null);
            mainWindow ? mainWindow.show() : initAppWindow();
        });
        // 右键点击打开菜单
        tray.on('right-click', (event, bounds) => {
            const contextMenu = createTrayMenu();
            tray?.setContextMenu(contextMenu);
        });
    }
    // 支持更新
    AddAppUpdate();
    // 开发环境修改dock图标
    if (isDev && app.dock) {
        app.dock.setIcon(appIcon);
    }
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        initAppWindow();
    } else {
        mainWindow.show();
    }
});