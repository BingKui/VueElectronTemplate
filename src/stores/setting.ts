import { getUserSetting, setUserSetting } from './../feature/setting';
import { defineStore } from "pinia";
import { SettingState } from "../types";
import logger from '@/common/logger';

export const useSettingStore = defineStore('setting', {
    state: () => <SettingState>({
        autoStart: false,
        autoUpdate: false,
        dockShow: true,
    }),
    getters: {},
    actions: {
        async getSettingInfo() {
            const setting: object = await getUserSetting();
            logger.success('获取到的设置信息为 ->', setting);
            this.$state = {
                ...this.$state,
                ...setting,
            };
        },
        async setSettingInfo(info: object) {
            const setting = await setUserSetting(info);
            this.$state = {
                ...this.$state,
                ...setting,
            };
        },
    },
});