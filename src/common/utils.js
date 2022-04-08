import { ipcRenderer } from 'electron';
import { ACTION_RESULT } from '@constants/channel';

/**
 * 渲染进程通信事件封装
 * @param {String} channel 具体的通道
 * @param {Any} params 参数
 * @returns
 */
export const renderEvent = (channel, ...params) => {
    ipcRenderer.send(channel, ...params);
    return new Promise((resolve, reject) => {
        ipcRenderer.once(`${channel}${ACTION_RESULT}`, (event, info) => {
            resolve(info);
        });
    });
};
