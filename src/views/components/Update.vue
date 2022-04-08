<template>
    <div :class="`v-update ${show ? 'show' : ''}`">
        <div :class="`update-message font-size text-center ${updateInfo.type}`">{{ updateInfo.message }}</div>
        <div class="download-action flex-row-end margin-top" v-if="updateInfo.type === types.actionYes">
            <Button @click="handleCancel" size="small">取消</Button>
            <Button @click="handleDownload" class="margin-left" type="primary" size="small">下载</Button>
        </div>
        <div class="download-action flex-row-end margin-top" v-if="updateInfo.type === types.actionComplate">
            <Button @click="handleCancel" size="small">下次安装</Button>
            <Button @click="handleInstall" class="margin-left" type="primary" size="small">立即安装</Button>
        </div>
        <div class="download-progress margin-top" v-if="updateInfo.type === types.progress">
            <Progress :percent="downloadProgress" />
        </div>
    </div>
</template>

<script>
import { Button } from 'view-design';
import { Progress } from '@components/index';
import { downloadUpdate, installAppAction, onUpdateMessage, removeListeners } from '@common/update';
import { UPDATE_MESSAGE_TYPE } from '@constants/channel';
export default {
    name: 'Update', // 更新内容
    components: {
        Button,
        Progress,
    },
    data() {
        return {
            show: false,
            updateInfo: {},
            showTimer: null,
            types: UPDATE_MESSAGE_TYPE,
            downloadProgress: 0,
        };
    },
    created() {
        onUpdateMessage((content) => {
            this.show = true;
            this.updateInfo = content;
            this.dealMessageInfo(content);
        });
    },
    unmounted() {
        removeListeners();
    },
    methods: {
        dealMessageInfo(updateInfo) {
            const { type, info } = updateInfo;
            switch(type) {
            case UPDATE_MESSAGE_TYPE.actionNo:
            case UPDATE_MESSAGE_TYPE.message:
                this.timeClear();
                break;
            case UPDATE_MESSAGE_TYPE.actionYes:
                // 存在新版本，提示是否下载
                this.clearTimeAction();
                break;
            case UPDATE_MESSAGE_TYPE.progress:
                this.clearTimeAction();
                // 更新下载进度
                this.downloadProgress = info.percent;
                break;
            case UPDATE_MESSAGE_TYPE.actionComplate:
                this.clearTimeAction();
                break;
            default:
                this.timeClear();
            }

        },
        clearTimeAction() {
            if (this.showTimer) clearTimeout(this.showTimer);
        },
        timeClear() {
            this.clearTimeAction();
            this.showTimer = setTimeout(() => {
                this.show = false;
            }, 2000);

        },
        handleCancel() {
            this.show = false;
        },
        handleDownload() {
            downloadUpdate();
            this.handleCancel();
        },
        handleInstall() {
            installAppAction();
            this.handleCancel();
        },
    },
};
</script>

<style lang="less">
.v-update {
    position: fixed;
    top: @gap-lg;
    left: 50%;
    background-color: @white;
    z-index: 3000;
    display: flex;
    width: 330px;
    margin-left: -165px;
    padding: @gap-md;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    box-shadow: 0 0 5px 0 rgba(0,0,0,.2);
    display: none;
    &.show {
        display: block;
    }
    .download-progress {
        width: 100%;
    }
}
</style>
