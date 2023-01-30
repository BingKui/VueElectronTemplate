// 渲染进程可用的 electron 能力方法合集
import { clipboard, ipcRenderer } from 'electron';
import { ACTION_RESULT } from '@constants/channel';

/**
 * 渲染进程通信事件封装
 * @param {String} channel 具体的通道
 * @param {Any} params 参数
 * @returns
 */
export const renderEvent = (channel: string, ...params: any): Promise<object> => {
    ipcRenderer.send(channel, ...params);
    return new Promise((resolve, reject) => {
        ipcRenderer.once(`${channel}${ACTION_RESULT}`, (event, info) => {
            resolve(info);
        });
    });
};

/**
 * 复制文本内容到粘贴板
 * @param {String} text 需要复制的内容
 */
export const copyText = (text: string) => {
    clipboard.writeText(text, 'clipboard');
};

/**
 * 粘贴文本
 */
export const pasteText = () => {
    return clipboard.readText('clipboard');
};
