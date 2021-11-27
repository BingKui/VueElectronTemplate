// 菜单role枚举
// 菜单角色
export const MENU_ROLE = {
    undo: 'undo', // 撤销
    redo: 'redo', // 重做
    cut: 'cut', // 剪切
    copy: 'copy', // 复制
    paste: 'paste', // 粘贴
    pasteAndMatchStyle: 'pasteAndMatchStyle', // 带格式粘贴
    selectAll: 'selectAll', // 全选
    delete: 'delete', // 删除
    minimize: 'minimize', // 最小化当前窗口
    close: 'close', // 关闭当前窗口
    quit: 'quit', // 退出程序
    reload: 'reload', // 重新加载当前窗口
    forcereload: 'forcereload', // 忽略缓存，重新加载当前窗口
    toggledevtools: 'toggledevtools', // 在当前窗口中隐藏/显示开发者工具
    toggleFullScreen: 'toggleFullScreen', // 切换全屏
    resetzoom: 'resetzoom', // 将主页的缩放级别重置为初始大小
    zoomin: 'zoomin', // 主页面放大 10%
    zoomout: 'zoomout', // 主页面缩小 10%
    editMenu: 'editMenu', // 默认的 "编辑" 菜单 (包括撤消、复制等)
    windowMenu: 'windowMenu', // 默认 "窗口" 菜单 (包括最小化、关闭等)
};

// 菜单角色-仅 MacOS
export const MENU_ROLE_MACOS = {
    about: 'about', // 映射到 orderFrontStandardAboutPanel 操作
    hide: 'hide', // 映射到 hide 操作
    hideOthers: 'hideOthers', // 映射到 hideOtherApplications 操作
    unhide: 'unhide', // 映射到 unhideAllApplications 操作
    startSpeaking: 'startSpeaking', // 映射到 startSpeaking 操作
    stopSpeaking: 'stopSpeaking', // 映射到 stopSpeaking 操作
    front: 'front', // 映射到 arrangeInFront 操作
    zoom: 'zoom', // 映射到 performZoom 操作
    toggleTabBar: 'toggleTabBar', // 映射到 toggleTabBar 操作
    selectNextTab: 'selectNextTab', // 映射到 selectNextTab 操作
    selectPreviousTab: 'selectPreviousTab', // 映射到 selectPreviousTab 操作
    mergeAllWindows: 'mergeAllWindows', // 映射到 mergeAllWindows 操作
    moveTabToNewWindow: 'moveTabToNewWindow', // 映射到 moveTabToNewWindow 操作
    window: 'window', // 这个子菜单是"Window" 菜单
    help: 'help', // 这个子菜单是 "Help" 菜单
    services: 'services', // 这个子菜单是 "Services" 菜单
    recentDocuments: 'recentDocuments', // 这个子菜单是 "Open Recent" 菜单
    clearRecentDocuments: 'clearRecentDocuments', // 映射到 clearRecentDocuments 操作
};
