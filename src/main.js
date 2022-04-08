// 主入口文件
import { app, Tray } from 'electron';
import { isDev, mainURL, createMainWindow, createTrayMenu, trayIcon, appIcon } from '@/utils';
import { AddAppSetting, AddAppUpdate, AddDataBase, AddMenuList } from '@/support';
import DB_NAME from '@constants/db';

let mainWindow, tray;

// 初始化窗口
const initAppWindow = () => {
    mainWindow = createMainWindow();
    mainWindow.loadURL(mainURL);
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
    mainWindow.on('ready-to-show', () => {
        mainWindow.show();
    });
    if (isDev) mainWindow.openDevTools();
};

app.on('ready', () => {
    // 初始化窗口
    initAppWindow();
    // 添加测试数据库
    for (let key in DB_NAME) {
        AddDataBase(DB_NAME[key]);
    }
    // 添加设置支持
    AddAppSetting();
    // 添加自定义菜单
    AddMenuList();
    // 添加系统托盘图标
    if (!tray) {
        // 添加托盘
        tray = new Tray(trayIcon);
        tray.setToolTip(app.getName());
        // 左键打开
        tray.on('click', (event, bounds, position) => {
            tray.setContextMenu(null);
            mainWindow ? mainWindow.show() : initAppWindow();
        });
        // 右键点击打开菜单
        tray.on('right-click', (event, bounds) => {
            const contextMenu = createTrayMenu();
            tray.setContextMenu(contextMenu);
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
