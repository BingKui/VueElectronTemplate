import { app, BrowserWindow, ipcMain, IpcMainEvent, Menu } from "electron";
import { ACTION_RESULT } from "./channel";
import { isDev } from "./constants";

/**
 * 主进程通信事件封装
 * @param {String} channel 具体的通道
 * @param {Function} callback 回调函数，参数：通讯函数sender，具体的通信参数
 * @returns
 */
export const mainEvent = (channel: string, callback: Function) => {
    ipcMain.on(channel, (event: IpcMainEvent, ...params: any[]) => {
        const sender = (info: any) => event.sender.send(`${channel}${ACTION_RESULT}`, info);
        callback(sender, ...params);
    });
};


/**
 * 创建主窗口
 * @returns BreoserWindow
 */
export const createMainWindow = () => {
    return new BrowserWindow({
        title: app.getName(),
        height: 700,
        width: 860,
        center: true,
        show: false, // 禁止显示
        // resizable: false, // 不可修改窗口大小
        // maximizable: false, // 不存在最大化
        // skipTaskbar: true, // 任务栏显示
        // useContentSize: false, // 不允许修改大小
        // transparent: true, // 透明
        frame: true, // 不使用框架
        // fullscreenable: false,
        titleBarStyle: 'hidden',
        // backgroundColor: 'none',
        roundedCorners: true, // 是否显示圆角（macOS）
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
        {
            label: '退出', click: () => {
                app.exit();
                // 强制结束进程
            }
        },
    ]);
};
