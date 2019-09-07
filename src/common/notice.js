import { Notification } from 'element-ui';
import { shell } from 'electron';

const baseConfig = {
    offset: 20,
    duration: 3000,
};
export const NoticeLocal = {
    open: (title, desc) => {
        Notification({
            ...baseConfig,
            title,
            message: desc,
        });
    },
    info: (title, desc) => {
        Notification.info({
            ...baseConfig,
            title,
            message: desc,
        });
    },
    success: (title, desc) => {
        Notification.success({
            ...baseConfig,
            title,
            message: desc,
        });

    },
    error: (title, desc) => {
        Notification.error({
            ...baseConfig,
            title,
            message: desc,
        });
    },
    warn: (title, desc) => {
        Notification.warning({
            ...baseConfig,
            title,
            message: desc,
        });
    },
};

/**
 * 渲染进程调用系统通知
 * @param {String} title 通知标题
 * @param {String} body 通知内容
 * @param {String} href 点击跳转的链接地址
 */
export const NoticeSystem = (title, body, href='') => {
    if (!body) {
        return;
    }
    const _content = Object.assign({
        title: 'VET System Notification',
        body: '',
        icon: '../assets/icon/success.svg',
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
