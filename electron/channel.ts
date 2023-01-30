
// 操作结果后缀
export const ACTION_RESULT = '-result';
// 系统操作
export const ACTION_KEY = {
    // app 相关
    getSetting: 'get-user-setting',
    setSetting: 'set-user-setting',
};

// 更新相关的操作
export const UPDATE_ACTION_KEY = {
    check: 'app-update-check', // 检查更新
    message: 'app-update-message', // 更新信息
    download: 'app-update-download', // 下载更新
    progress: 'app-update-progress', // 更新进度
    now: 'app-update-now', // 立即更新
};

// 更新消息类型
export const UPDATE_MESSAGE_TYPE = {
    message: 'update-message',
    yes: 'update-action-yes',
    no: 'update-action-no',
    complate: 'update-action-complate',
    progress: 'update-progress',
};

// 更新消息
export const UPDATE_MESSAGE = {
    error: '检查更新出错！',
    checking: '正在检查更新...',
    updateAva: '检测到新版本，是否下载？',
    updateNotAva: '你使用的已是最新版！',
    progress: '下载中...',
    downloaded: '下载完成，是否安装？',
};


// 数据库操作
export const DB_ACTION_KEY = {
    // 数据库相关
    dbAddItem: (name: string) => `${name}-db-add-item`, // 添加
    dbDeleteItem: (name: string) => `${name}-db-delete-item`,
    dbUpdateItem: (name: string) => `${name}-db-update-item`,
    dbFindItem: (name: string) => `${name}-db-find-item`,
    dbFind: (name: string) => `${name}-db-find`,
    dbCount: (name: string) => `${name}-db-count`,
};
