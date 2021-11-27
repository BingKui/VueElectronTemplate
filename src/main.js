import { app, Tray } from 'electron' // eslint-disable-line
import { isDev, mainURL, createMainWindow, createTrayMenu, trayIcon,
    AddDataBase, AddAppUpdate, AddAppSetting, AddTray, AddMenuList } from './utils';

let mainWindow, tray;
const initAppWindow = () => {
    console.log('执行到这里');
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
    AddDataBase('test');
    // 添加设置支持
    AddAppSetting(app, mainWindow);
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
    AddAppUpdate(mainWindow);
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
