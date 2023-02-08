<template>
    <div class="v-setting-page setting-container padding-all-md">
        <div class="margin-bottom-md flex-row-between">
            <div class="font-size">跟随系统启动</div>
            <div class="setting-content">
                <Switch :width="30" :model-value="autoStart" @on-change="flag => handleAction(flag, 'autoStart')"
                    @click.stop />
            </div>
        </div>
        <div class="margin-bottom-md flex-row-between">
            <div class="font-size">Dock显示(Mac)</div>
            <div class="setting-content">
                <Switch :width="30" :model-value="dockShow" @on-change="flag => handleAction(flag, 'dockShow')" @click.stop />
            </div>
        </div>
        <div class="margin-bottom-md flex-row-between">
            <div class="font-size">自动检查更新</div>
            <div class="setting-content">
                <Switch :width="30" :model-value="autoUpdate" @on-change="flag => handleAction(flag, 'autoUpdate')"
                    @click.stop />
            </div>
        </div>
        <div class="margin-bottom-md flex-row-between">
            <div class="font-size">软件更新</div>
            <div class="setting-content">
                <Button size="small" type="primary" @click="checkAppUpdate">检查更新</Button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Switch, Button } from 'view-ui-plus';
import { storeToRefs } from 'pinia';
import { checkAppUpdate } from '@/feature/update';
import { useSettingStore } from '@/stores/setting';
import { onMounted } from 'vue';

const settingStore = useSettingStore();
const { autoStart, autoUpdate, dockShow } = storeToRefs(settingStore);

onMounted(async () => {
    await settingStore.getSettingInfo();
});

const handleAction = async (flag: boolean, settingKey: string) => {
    const info = {
        [settingKey]: flag,
    };
    await settingStore.setSettingInfo(info);
}

</script>

<style scoped lang="less">
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
</style>
