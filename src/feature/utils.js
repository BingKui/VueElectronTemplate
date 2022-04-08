// 工具方法
const fs = require('fs');
import fsExtra from 'fs-extra';
import path from 'path';
import shelljs from 'shelljs';
const spawn = require('cross-spawn');
import { shell, dialog } from 'electron';
import { PLATFORM_VALUE } from '@constants/common';

/**
 * 检查命令是否安装
 * @param {String} command 命令
 */
export const checkIsInstalled = (command) => {
    return !!shelljs.which(command);
};

/**
 * 判断是否存在文件或者文件夹
 * @param {String} path 文件或文件夹地址
 */
export const isHaveFileOrFolder = (path) => {
    return fs.existsSync(path);
};

/**
 * 保存文件
 * @param {String} filePath 文件地址
 * @param {String} data 保存内容
 * @param {Boolean} isCover 是否覆盖，默认：覆盖
 * @returns Boolean 是否成功
 */
export const saveFile = (filePath, data, isCover = true) => {
    return new Promise((resolve, reject) => {
        const _isHaveFile = isHaveFileOrFolder(filePath);
        if (!isCover && _isHaveFile) {
            resolve(false);
        } else {
            fs.writeFile(filePath, data, { encoding: 'utf-8' }, (err, res) => {
                resolve(err ? false : true);
            });
        }
    });
};

/**
 * 创建文件夹
 * @param {String} folder 文件夹地址
 */
export const mkdirFolder = (folder) => {
    return fsExtra.ensureDirSync(folder);
};

/**
 * 删除文件或者文件夹
 * @param {String} pathValue 文件或者文件夹地址
 */
export const removeFileOrFolder = (pathValue) => {
    return fsExtra.removeSync(pathValue);
};

/**
 * 删除文件或文件夹到垃圾桶
 * @param {String} pathValue 删除内容地址
 */
export const trashFileOrFolder = async (pathValue) => {
    return await shell.trashItem(pathValue);
};

/**
 * 文件管理器中打开
 * @param {String} pathValue 地址
 */
export const showInManage = (pathValue) => {
    return shell.showItemInFolder(pathValue);
};

/**
 * 系统默认方式打开文件
 * @param {String} filePath 文件地址
 */
export const openFile = async (filePath) => {
    return await shell.openPath(filePath);
};

/**
 * 打开文件夹
 * @param {String} folderPath 文件夹地址
 */
export const openFolder = async (folderPath) => {
    const env = {
        ...process.env
    };
    const platform = process.platform;
    if (platform === PLATFORM_VALUE.mac) {
        await execCommand('open', [folderPath, ...env]);
        return true;
    } else if (platform === PLATFORM_VALUE.win) {
        await execCommand('explorer', [folderPath]);
        return true;
    } else if (platform === PLATFORM_VALUE.linux) {
        await execCommand('nautilus', [folderPath]);
        return true;
    }
};

/**
 * 打开url
 * @param {String} url url地址
 */
export const openUrl = async (url) => {
    return await shell.openExternal(url);
};

/**
 * 运行命令行命令
 * @param {String} command 命令
 * @param {Array} args 参数列表
 * @param {Object} options 配置信息
 */
export const execCommand = (command, args = [], options = {}) => {
    if (!command) return;
    return new Promise((resolve, reject) => {
        const spawnChildProcess = spawn(command, args, options);
        let stdout = '';
        let stderr = '';
        spawnChildProcess.stdout.on('data', (data) => {
            stdout += data.toString();
        });
        spawnChildProcess.stderr.on('data', (data) => {
            stderr += data.toString();
        });
        spawnChildProcess.on('exit', () => {
            resolve(stdout ? stdout : '');
        });
        spawnChildProcess.on('error', () => {
            reject(stderr);
        });
    });
};

/**
 * 获取当前shell的名称。如：zsh/sh/bash
 */
export const getShellName = () => {
    const shellPath = process.env.SHELL;
    const splitPaths = shellPath.split('/');
    return splitPaths[splitPaths.length - 1];
};

/**
 * 选择文件夹
 */
export const selectFolder = () => {
    return new Promise((resolve, reject) => {
        dialog.showOpenDialog({
            title: '选择目录',
            buttonLabel: '确认',
            properties: ['openDirectory'],
        }).then(result => {
            if (result.canceled) {
                resolve(false);
            } else {
                resolve(result.filePaths ? result.filePaths[0] : '');
            }
        }).catch(error => {
            resolve(false);
        });
    });
};

/**
 * 选择文件
 * @param {Object} extFilter { name: '', extensions: [] }
 */
export const selectFile = (extFilter) => {
    return new Promise((resolve, reject) => {
        dialog.showOpenDialog({
            title: '选择文件',
            buttonLabel: '确认',
            filters: [extFilter],
            properties: ['openFile'],
        }).then(result => {
            if (result.canceled) {
                resolve(false);
            } else {
                resolve(result.filePaths ? result.filePaths[0] : '');
            }
        }).catch(error => {
            resolve(false);
        });
    });
};

/**
 * 弹窗消息
 * @param {String} title 标题
 * @param {String} message 消息内容
 * @param {String} type 消息类型，取值："none", "info", "error", "question", "warning"
 */
export const showMessage = (title, message, type = 'info') => {
    dialog.showMessageBox({
        type,
        title,
        message,
    });
};
