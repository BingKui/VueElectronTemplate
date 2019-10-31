<template>
    <div class="v-mouse-right-demo">
        <Divider orientation="left">右键菜单</Divider>
        <MouseRight class="right-mouse-el" :mouseData="mouseData" :mouseKey="value">
            <Card>右键点击</Card>
        </MouseRight>
    </div>
</template>

<script>
import { Divider, Card } from 'view-design';
import MouseRight from '@components/MouseRight';
import { TipSuccess, TipError, TipWarning, TipLoading } from '@common/tip';
import logger from '@common/logger';
export default {
    name: 'MouseRightDemo', // 右键菜单
    components: {
        Divider,
        MouseRight,
        Card,
    },
    data() {
        return {
            mouseData: [{
                text: '成功',
                action: (val) => {
                    TipSuccess('你点击了成功菜单！');
                    logger.success(JSON.stringify(val));
                },
            }, {
                text: '错误',
                action: (val) => {
                    TipError('你点击了错误菜单！');
                    logger.error(JSON.stringify(val));
                },
            }, {
                text: '警告',
                action: (val) => {
                    TipWarning('你点击了警告菜单！');
                    logger.warn(JSON.stringify(val));
                },
            }, {
                text: 'loading',
                action: (val) => {
                    TipLoading('你点击了加载！');
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
    .p-h(@gap);
    .right-mouse-el {
        height: 200px;
        .m(@gap-md);
        .p(@gap);
        .flex-row-center();
        background-color: @gray;
    }
}
</style>
