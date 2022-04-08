<template>
    <div class="v-setting-page setting-container padding-all-md">
        <div class="margin-bottom-md flex-row-between">
            <div class="font-size">跟随系统启动</div>
            <div class="setting-content">
                <iSwitch :width="30" :value="autoStart" @on-change="flag => handleAction(flag, 'autoStart')" @click.stop.native />
            </div>
        </div>
        <div class="margin-bottom-md flex-row-between">
            <div class="font-size">Dock显示(Mac)</div>
            <div class="setting-content">
                <iSwitch :width="30" :value="dockShow" @on-change="flag => handleAction(flag, 'dockShow')" @click.stop.native />
            </div>
        </div>
        <div class="margin-bottom-md flex-row-between">
            <div class="font-size">自动检查更新</div>
            <div class="setting-content">
                <iSwitch :width="30" :value="autoUpdate" @on-change="flag => handleAction(flag, 'autoUpdate')" @click.stop.native />
            </div>
        </div>
        <div class="margin-bottom-md flex-row-between">
            <div class="font-size">软件更新</div>
            <div class="setting-content">
                <Button size="small" type="primary" @click="checkUpdate">检查更新</Button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { Switch, Button } from 'element-ui';
import { checkAppUpdate } from '@common/update';
import logger from '@/common/logger';
export default {
    name: 'Setting', // 设置弹窗
    components: {
        iSwitch: Switch,
        Button,
    },
    data() {
        return {
            drawer: false,
        };
    },
    computed: {
        ...mapState({
            setting: state => state.app.setting,
            autoStart: state => state.app.setting.autoStart,
            dockShow: state => state.app.setting.dockShow,
            autoUpdate: state => state.app.setting.autoUpdate,
        }),
    },
    async mounted() {
        await this.getSystemSetting();
        logger.info('设置信息为 => ', this.setting);
    },
    methods: {
        ...mapActions([
            'getSystemSetting',
            'setSystemSetting',
        ]),
        open() {
            this.drawer = true;
        },
        close() {
            this.drawer = false;
        },
        checkUpdate() {
            this.close();
            checkAppUpdate();
        },
        async handleAction(flag, settingKey) {
            const info = {
                [settingKey]: flag,
            };
            await this.setSystemSetting(info);
        },
    },
};
</script>

<style lang="less">
.v-setting {
    width: 350px;
    .setting-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 50px;
    }
    .setting-tip {
        font-size: @font-size-sm;
        color: @gray;
    }
}
// @media (prefers-color-scheme: dark) {
//     .v-setting {
//         color: @dark-title-color;
//         .setting-tip {
//             color: @dark-switch-color;
//         }
//     }
// }
</style>
