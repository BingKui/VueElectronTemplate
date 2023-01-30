// 功能方法封装合集

import { screen, app, nativeTheme, net, powerMonitor, shell, dialog } from 'electron';
/**
 * 设置是否登录启动
 * @param {Boolean} flag 是否登录启动
 */
export const setLoginStatus = (flag) => {
    app.setLoginItemSettings({
        openAtLogin: flag,
    });
};

/**
 * 获取是否登录启动
 */
export const getLoginStatus = () => {
    const setting = app.getLoginItemSettings();
    return setting.openAtLogin;
};

/**
 * 设置图标
 * @param {String} icon 图标地址
 */
export const setDockIcon = (icon) => {
    if (app.dock) app.dock.setIcon(icon);
};

/**
 * 设置徽标数字
 * @param {Number} num 数量
 */
export const setBadge = (num) => {
    app.setBadgeCount(num);
};

/**
 * 获取徽标数量
 */
export const getBadge = () => {
    return app.getBadgeCount();
};

/**
 * 设置 dock 右键菜单
 * @param {Array} menuList 菜单列表
 */
export const setDockMenu = (menuList) => {
    if (app.dock) app.dock.setMenu(menuList);
};

/**
 * 获取系统主题
 */
export const getTheme = () => {
    return nativeTheme.themeSource;
};

/**
 * 获取网络状态
 */
export const getNetOnline = () => {
    return net.isOnline();
};

/**
 * 获取是否电池供电
 */
export const getIsBattery = () => {
    return powerMonitor.isOnBatteryPower();
};

/**
 * 获取鼠标坐标
 */
export const getCursorPoint = () => {
    return screen.getCursorScreenPoint();
};

/**
 * 获取主屏幕
 */
export const getDisplay = () => {
    const info = screen.getPrimaryDisplay();
    return {
        id: info.id,
        bounds: info.bounds,
        workArea: info.workArea,
        workAreaSize: info.workAreaSize,
        fps: `${info.displayFrequency}Hz`,
        rotation: info.rotation,
    };
};

/**
 * 获取所有屏幕
 */
export const getDisplays = () => {
    const list = screen.getAllDisplays();
    return list.map(item => {
        return {
            id: item.id,
            bounds: item.bounds,
            workArea: item.workArea,
            workAreaSize: item.workAreaSize,
            fps: `${item.displayFrequency}Hz`,
            rotation: item.rotation,
        };
    });
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
 * 打开url
 * @param {String} url url地址
 */
export const openUrl = async (url) => {
    return await shell.openExternal(url);
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
