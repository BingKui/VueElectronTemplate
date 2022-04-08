// 一些公共的枚举值
// 系统基础设置
export const BASE_SETTING = {
    openAtLogin: false, // 开机自启动
    dockShow: true, // dock 展示图标，macOS
    autoUpdate: false, // 是否自动检查更新
};

// 平台值
export const PLATFORM_VALUE = {
    mac: 'darwin',
    win: 'win32',
    linux: 'linux',
};

// 更新地址
export const UPDATE_URL = '';

// 更新消息
export const UPDATE_MESSAGE = {
    error: '检查更新出错！',
    checking: '正在检查更新...',
    updateAva: '检测到新版本，是否下载？',
    updateNotAva: '你使用的已是最新版！',
    progress: '下载中...',
    downloaded: '下载完成，是否安装？',
};
