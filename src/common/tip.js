import { Message } from 'element-ui';
console.log(Message);
// 在调用 Vue.use 前，给 Message 添加 install 方法
// Message.install = function (Vue, options) {
//     Vue.prototype.$message = Message;
// };
const baseConfig = {
    top: 25,
    duration: 3000,
};
export const TipInfo = (text='提示') => {
    Message.info({
        message: text,
        ...baseConfig,
    });
};
export const TipSuccess = (text='成功') => {
    Message.success({
        message: text,
        ...baseConfig,
    });
};

export const TipError = (text='错误') => {
    Message.error({
        message: text,
        ...baseConfig,
    });
};

export const TipWarning = (text='警告') => {
    Message.warning({
        message: text,
        ...baseConfig,
    });
};
