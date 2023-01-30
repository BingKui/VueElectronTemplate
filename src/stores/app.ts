import { defineStore } from "pinia";
import { AppState } from "../types";

export const useAppStore = defineStore('app', {
    state: () => <AppState>({
        list: [],
    }),
    getters: {},
    actions: {
        async getInfo() {},
        async setInfo() {},
    },
});