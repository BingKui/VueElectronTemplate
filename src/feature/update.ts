//监听自动更新事件
import { ipcRenderer } from 'electron';
import { UPDATE_ACTION_KEY } from '@constants/channel';
import logger from '@common/logger';

// 检查更新
export const checkAppUpdate = () => {
    logger.info('发送检查更新');
    ipcRenderer.send(UPDATE_ACTION_KEY.check);
};

// 监听接收检查状态
export const onUpdateMessage = (callback?: Function) => {
    ipcRenderer.on(UPDATE_ACTION_KEY.message, (event, message) => {
        logger.info('接收到更新消息', message);
        callback && callback(message);
    });
};

// 开始下载
export const downloadUpdate = () => {
    ipcRenderer.send(UPDATE_ACTION_KEY.download);
};

// 立即安装
export const installAppAction = () => {
    ipcRenderer.send(UPDATE_ACTION_KEY.now);
};

// 移除所有监听的事件
export const removeListeners = () => {
    ipcRenderer.removeAllListeners(UPDATE_ACTION_KEY.message);
    ipcRenderer.removeAllListeners(UPDATE_ACTION_KEY.progress);
};
