// nodejs 相关操作的方法
import fsExtra from 'fs-extra';
import shelljs from 'shelljs';
const spawn = require('cross-spawn');
import { PLATFORM_VALUE } from './constants';

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
    return fsExtra.existsSync(path);
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
            fsExtra.writeFile(filePath, data, { encoding: 'utf-8' }, err => {
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
 * 打开文件夹
 * @param {String} folderPath 文件夹地址
 */
export const openFolder = async (folderPath) => {
    const env: any = {
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
 * 运行命令行命令
 * @param {String} command 命令
 * @param {Array} args 参数列表
 * @param {Object} options 配置信息
 */
export const execCommand = (command, args: any[] = [], options = {}) => {
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
    const shellPath: string = process.env.SHELL || '';
    const splitPaths = shellPath.split('/');
    return splitPaths[splitPaths.length - 1];
};
