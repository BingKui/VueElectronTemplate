import { renderEvent } from "@/common/render";
import { ACTION_KEY } from "@/constants/channel";

/**
 * 获取用户设置
 */
export const getUserSetting = (): Promise<object> => {
    return renderEvent(ACTION_KEY.getSetting);
};

/**
 * 修改用户设置
 * @param {Object} setting 用户设置
 */
export const setUserSetting = (setting: any): Promise<object> => {
    return renderEvent(ACTION_KEY.setSetting, setting);
};
