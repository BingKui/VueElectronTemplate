import { getUserSetting, setUserSetting } from '@common/common';

const app = {
    state: {
        setting: {
            autoSave: true,
            autoStart: false,
            dockShow: false,
            autoUpdate: false,
            autoRestartWifi: false,
        },
        isDarkMode: false,
    },
    mutations: {
        USER_SETTING: (state, setting) => {
            Object.assign(state, { setting: { ...setting } });
        },
        CHANGE_MODE: (state, isDarkMode) => {
            Object.assign(state, { isDarkMode });
        },
    },
    actions: {
        // 获取系统设置
        getSystemSetting: async ({ commit }) => {
            const setting = await getUserSetting();
            commit('USER_SETTING', setting);
        },
        // 修改系统设置
        setSystemSetting: async ({ commit }, userSetting) => {
            const setting = await setUserSetting(userSetting);
            commit('USER_SETTING', setting);
        },
        changeSystemMode: ({ commit }, isDarkMode) => {
            commit('CHANGE_MODE', isDarkMode);
        },
    },
};

export default app;
