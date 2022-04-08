<template>
    <Page class="v-mouse-right-demo" header="右键菜单">
        <Divider orientation="left">右键菜单</Divider>
        <MouseRight class="right-mouse-el flex-row-center" :mouseData="mouseData" :mouseKey="value">
            <Card>右键点击</Card>
        </MouseRight>
    </Page>
</template>

<script>
import { Divider, Card } from 'ant-design-vue';
import { MouseRight, Page } from '@components';
import { successTip, errorTip, warnTip, infoTip } from '@common/tip';
import logger from '@common/logger';
export default {
    name: 'MouseRightDemo', // 右键菜单
    components: {
        Divider,
        Page,
        MouseRight,
        Card,
    },
    data() {
        return {
            mouseData: [{
                text: '成功',
                action: (val) => {
                    successTip('你点击了成功菜单！');
                    logger.success(JSON.stringify(val));
                },
            }, {
                text: '错误',
                action: (val) => {
                    errorTip('你点击了错误菜单！');
                    logger.error(JSON.stringify(val));
                },
            }, {
                text: '警告',
                action: (val) => {
                    warnTip('你点击了警告菜单！');
                    logger.warn(JSON.stringify(val));
                },
            }, {
                text: 'info',
                action: (val) => {
                    infoTip('你点击了info！');
                    logger.info(JSON.stringify(val));
                },
            }],
            value: {
                id: 1,
                text: '1',
            },
        };
    },
};
</script>

<style lang="less" scoped>
.v-mouse-right-demo {
    .right-mouse-el {
        height: 200px;
        margin: @gap-md;
        padding: @gap;
        background-color: @gray-light;
    }
}
</style>
