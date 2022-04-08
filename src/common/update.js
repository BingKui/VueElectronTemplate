//监听自动更新事件
import { ipcRenderer } from 'electron';
import { ACTION_KEY } from '@constants/channel';
import logger from './logger';

// 检查更新
export const checkAppUpdate = () => {
    logger.info('发送检查更新');
    ipcRenderer.send(ACTION_KEY.updateCheck);
};

// 监听接收检查状态
export const onUpdateMessage = (callback) => {
    ipcRenderer.on(ACTION_KEY.updateMessage, (event, message) => {
        logger.info('接收到更新消息', message);
        callback && callback(message);
    });
};

// 开始下载
export const downloadUpdate = () => {
    ipcRenderer.send(ACTION_KEY.updateDownload);
};

// 立即安装
export const installAppAction = () => {
    ipcRenderer.send(ACTION_KEY.updateNow);
};

// 移除所有监听的时间
export const removeListeners = () => {
    ipcRenderer.removeAll([
        ACTION_KEY.updateMessage,
        ACTION_KEY.updateProgress,
    ]);
};
