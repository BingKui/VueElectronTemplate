<template>
    <div :class="`v-update ${show ? 'show' : ''}`">
        <div :class="`update-message font-size text-center ${updateInfo.type || ''}`">{{ updateInfo.message }}</div>
        <div class="download-action flex-row-end margin-top" v-if="updateInfo.type === UPDATE_MESSAGE_TYPE.yes">
            <Button @click="handleCancel" size="small">取消</Button>
            <Button @click="handleDownload" class="margin-left" type="primary" size="small">下载</Button>
        </div>
        <div class="download-action flex-row-end margin-top" v-if="updateInfo.type === UPDATE_MESSAGE_TYPE.complate">
            <Button @click="handleCancel" size="small">下次安装</Button>
            <Button @click="handleInstall" class="margin-left" type="primary" size="small">立即安装</Button>
        </div>
        <div class="download-progress margin-top" v-if="updateInfo.type === UPDATE_MESSAGE_TYPE.progress">
            <Progress :percent="downloadProgress" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Button, Progress } from 'view-ui-plus';
import { UPDATE_MESSAGE_TYPE } from '@/constants/channel';
import { useSettingStore } from '@stores/setting';
import { storeToRefs } from 'pinia';
import { checkAppUpdate, downloadUpdate, installAppAction, onUpdateMessage } from '@/feature/update';

const settingStore = useSettingStore();
const { autoUpdate } = storeToRefs(settingStore);

const show = ref<boolean>(false);
const updateInfo = ref<any>({});
const showTimer = ref<any>(null);
const downloadProgress = ref<number>(0);

onMounted(async () => {
    if (autoUpdate.value) {
        await checkAppUpdate();
    }
    // 绑定事件监听
    onUpdateMessage((content: any) => {
        show.value = true;
        updateInfo.value = content;
        dealMessageInfo(content);
    });
});

const dealMessageInfo = (updateInfo: any) => {
    const { type, info } = updateInfo;
    switch (type) {
        case UPDATE_MESSAGE_TYPE.no:
        case UPDATE_MESSAGE_TYPE.message:
            timeClear();
            break;
        case UPDATE_MESSAGE_TYPE.yes:
            // 存在新版本，提示是否下载
            clearTimeAction();
            break;
        case UPDATE_MESSAGE_TYPE.progress:
            clearTimeAction();
            // 更新下载进度
            downloadProgress.value = info.percent;
            break;
        case UPDATE_MESSAGE_TYPE.complate:
            clearTimeAction();
            break;
        default:
            timeClear();
    }
}

const clearTimeAction = () => {
    if (showTimer?.value) clearTimeout(showTimer.value);
};

const timeClear = () => {
    clearTimeAction();
    showTimer.value = setTimeout(() => {
        show.value = false;
    }, 2000);

};

const handleCancel = () => {
    show.value = false;
};

const handleDownload = () => {
    downloadUpdate();
    handleCancel();
};

const handleInstall = () => {
    installAppAction();
    handleCancel();
};

</script>

<style scoped lang="less">
.v-update {
    position: fixed;
    top: @gap-lg;
    left: 50%;
    background-color: @white;
    border-radius: @border-radius;
    z-index: 3000;
    display: flex;
    width: 330px;
    margin-left: -165px;
    padding: @gap-md;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, .2);
    display: none;

    &.show {
        display: block;
    }

    .download-progress {
        width: 100%;
    }
}
</style>