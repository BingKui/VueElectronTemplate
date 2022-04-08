// 功能合集基础
import { screen, app, nativeTheme, net, powerMonitor } from 'electron';
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
