import { Message } from 'view-ui-plus';

const Msg = Message;

const baseConfig = {
    top: 25,
    duration: 3
};

/**
 * 提示信息
 * @param {String} text 提示内容
 */
export const infoTip = (text='提示') => {
    Msg.info({
        content: text,
        ...baseConfig,
    });
};

/**
 * 提示成功信息
 * @param {String} text 提示内容
 */
export const successTip = (text='成功') => {
    Msg.success({
        content: text,
        ...baseConfig,
    });
};

/**
 * 提示错误信息
 * @param {String} text 提示内容
 */
export const errorTip = (text='错误') => {
    Msg.error({
        content: text,
        ...baseConfig,
    });
};

/**
 * 提示警告信息
 * @param {String} text 提示内容
 */
export const warnTip = (text='警告') => {
    Msg.warning({
        content: text,
        ...baseConfig,
    });
};
