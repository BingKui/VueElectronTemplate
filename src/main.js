import {
    app,
    BrowserWindow
} from 'electron' // eslint-disable-line

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
// if (process.env.NODE_ENV !== 'development') {
//     global.__static = require('path').join(__dirname, '/static').replace(/\\/g,
//         '\\\\') // eslint-disable-line
// }

let mainWindow;
const winURL = process.env.NODE_ENV === 'development' ?
    'http://localhost:2333' :
    `file://${__dirname}/index.html`;

function createWindow() {
    /**
     * Initial window options
     */
    mainWindow = new BrowserWindow({
        title: 'iTools',
        height: 700,
        width: 900,
        center: true, // 窗口默认居中
        resizable: false, // 不可修改窗口大小
        maximizable: false, // 不存在最大化
        skipTaskbar: true, // 任务栏显示
        useContentSize: false, // 不允许修改大小
        transparent: true, // 透明
        frame: false, // 不使用框架
        // show: false, // 禁止显示
        fullscreenable: false,
        titleBarStyle: 'hidden',
        backgroundColor: 'none',
        webPreferences: {
            scrollBounce: false,
        },
    });

    mainWindow.loadURL(winURL);

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
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

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
