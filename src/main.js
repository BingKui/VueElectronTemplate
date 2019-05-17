import { app, BrowserWindow } from 'electron' // eslint-disable-line
import { Notic, AddShortcuts, AddMenuList } from './electron.js';
import { FUNCTION_KEY, LETTER_KEY } from './constants/shortcuts';
const { port, host } = require('../electron/config');

if (process.env.NODE_ENV !== 'development') {
    global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\') // eslint-disable-line
}
let mainWindow;
const isDev = process.env.ENV === 'dev';
const winURL = isDev ? `http://${host}:${port}` : `file://${__dirname}/index.html`;

function createWindow() {
    /**
     * Initial window options
     */
    mainWindow = new BrowserWindow({
        title: 'VET',
        height: 700,
        width: 900,
        center: true, // 窗口默认居中
        // resizable: false, // 不可修改窗口大小
        // maximizable: false, // 不存在最大化
        // skipTaskbar: true, // 任务栏显示
        // useContentSize: false, // 不允许修改大小
        // transparent: true, // 透明
        // // frame: false, // 不使用框架
        // // show: false, // 禁止显示
        // fullscreenable: false,
        // titleBarStyle: 'hidden',
        // backgroundColor: 'none',
        webPreferences: {
            scrollBounce: false,
            nodeIntegration: true,
            // webSecurity: false,
        },
    });

    mainWindow.loadURL(winURL);

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
    Notic('主进程提示', '打开成功');
    // 添加快捷键
    AddShortcuts(`${FUNCTION_KEY[4]}+${FUNCTION_KEY[9]}+${LETTER_KEY[25]}`, () => {
        Notic('快捷键提示', '绑定快捷键成功');
    });
    AddMenuList();
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});
