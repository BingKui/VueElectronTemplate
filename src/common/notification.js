const success = (title, body, url='') => {
    const _content = Object.assign({
        title: 'VET Notification',
        body: '',
        icon: '../assets/icon/success.svg',
        href: '',
    }, {
        title,
        body,
        href: url,
    });
    new window.Notification(_content.title, _content);
};

export default {
    success,
};
