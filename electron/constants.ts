import path from 'path';
import { app } from 'electron';
import { host, port } from '../config';

// 更新地址 - 服务器更新地址
export const UPDATE_URL = 'https://www.baidu.com';

// 系统基础设置
export const BASE_SETTING = {
    openAtLogin: false, // 开机自启动
    dockShow: true, // dock 展示图标，macOS
    autoUpdate: false, // 是否自动检查更新
};

// 平台值
export const PLATFORM_VALUE = {
    mac: 'darwin',
    win: 'win32',
    linux: 'linux',
};

// 是否是测试环境
export const isDev = app.isPackaged === false;
// 是否是 Windows
export const isWin = process.platform === PLATFORM_VALUE.win;
// 是否是 Mac
export const isMac = process.platform === PLATFORM_VALUE.mac;
// 是否是 Linux
export const isLinux = process.platform === PLATFORM_VALUE.linux;

// 应用图标
export const appIcon = path.resolve(__dirname, '../src/assets/app.png');
// 系统托盘图标
const trayName = `tray${isMac ? 'Template' : ''}.png`;
export const trayIcon = isDev ? path.resolve(__dirname, `../public/${trayName}`) : path.join(__dirname, `../dist/${trayName}`);

// 主界面地址
export const mainURL = isDev ? `http://${host}:${port}` : `file://${__dirname}/../dist/index.html`;
