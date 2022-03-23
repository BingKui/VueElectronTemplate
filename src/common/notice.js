import { shell } from 'electron';

/**
 * 系统通知
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
