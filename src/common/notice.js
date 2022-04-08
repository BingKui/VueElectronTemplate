import { Notification } from 'element-ui';
import { shell } from 'electron';

const baseConfig = {
    top: 20,
    duration: 3,
};

/**
 * 通知信息
 * @param {String} desc 提示信息
 * @param {String} title 提示标题
 */
export const notice = (desc, title='提示') => {
    Notification.open({
        title,
        desc,
        ...baseConfig,
    });
};

/**
 * 通知一般信息
 * @param {String} desc 提示信息
 * @param {String} title 提示标题
 */
export const infoNotice = (desc, title='提示') => {
    Notification.info({
        title,
        desc,
        ...baseConfig,
    });
};

/**
 * 通知成功信息
 * @param {String} desc 提示信息
 * @param {String} title 提示标题
 */
export const successNotice = (desc, title='成功') => {
    Notification.success({
        title,
        desc,
        ...baseConfig,
    });
};

/**
 * 通知错误信息
 * @param {String} desc 提示信息
 * @param {String} title 提示标题
 */
export const errorNotice = (desc, title='错误') => {
    Notification.error({
        title,
        desc,
        ...baseConfig,
    });
};

/**
 * 通知警告信息
 * @param {String} desc 提示信息
 * @param {String} title 提示标题
 */
export const warnNotice = (desc, title='警告') => {
    Notification.warning({
        title,
        desc,
        ...baseConfig,
    });
};

/**
 * 渲染进程调用系统通知
 * @param {String} title 通知标题
 * @param {String} body 通知内容
 * @param {String} href 点击跳转的链接地址
 */
export const sysNotice = (title, body, href='') => {
    if (!title && !body) {
        return;
    }
    const _content = Object.assign({
        title: 'Vet系统通知!',
        body: '',
        href: '',
    }, {
        title,
        body: body.length > 50 ? `${body.substring(0, 50)}......` : body,
        href,
    });
    const _n = new window.Notification(_content.title, _content);
    _n.onclick= function(){
        _content.href && shell.openExternal(_content.href);
    };
};
