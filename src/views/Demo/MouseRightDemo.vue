<template>
    <Page class="v-mouse-right-demo" header="右键菜单">
        <Divider orientation="left">右键菜单</Divider>
        <MouseRight class="right-mouse-el flex-row-center" name="test" :mouseData="mouseData" :mouseKey="value">
            <Card>右键点击</Card>
        </MouseRight>
    </Page>
</template>

<script setup lang="ts">
import { Card, Divider } from 'view-ui-plus';
import Page from '@/components/Page.vue';
import MouseRight from '@/components/MouseRight.vue';
import { errorTip, infoTip, successTip, warnTip } from '@/common/tip';
import logger from '@/common/logger';
import { MouseDataItem } from '@/types';
const mouseData: MouseDataItem[] = [{
    text: '成功',
    action: (val: any) => {
        successTip('你点击了成功菜单！');
        logger.success(JSON.stringify(val));
    },
    sperator: true,
    group: [{
        text: '成功-222',
        disabled: true,
        action: (val: any) => {
            successTip('你点击了成功-222菜单！');
            logger.success(JSON.stringify(val));
        },
    }],
}, {
    text: '错误',
    action: (val: any) => {
        errorTip('你点击了错误菜单！');
        logger.error(JSON.stringify(val));
    },
}, {
    text: '警告',
    action: (val: any) => {
        warnTip('你点击了警告菜单！');
        logger.warn(JSON.stringify(val));
    },
    disabled: true,
    sperator: true,
}, {
    text: 'info',
    action: (val: any) => {
        infoTip('你点击了info！');
        logger.info(JSON.stringify(val));
    },
}];
const value = {
    id: 1,
    text: '1',
};
</script>

<style scoped lang="less">

</style>