<template>
    <div class="v-local-db-demo">
        <Divider orientation="left">本地数据库</Divider>
        <div class="db-list">
            <Card class="db-item" v-for="(item, index) in dataList" :key="index">{{item.value}}</Card>
            <Button type="info" @click="getDataList">刷新</Button>
        </div>
        <div class="add-container">
            <Input placeholder="输入要添加的数据" v-model="itemValue" />
            <Button type="primary" @click="addDataItem">添加数据</Button>
        </div>
    </div>
</template>

<script>
import { Divider, Card, Button, Input} from 'view-design';
import { addItem, getAllItems, delItem } from '@common/db';
import { TipSuccess, TipError } from '@common/tip';
import DB_NAME from '@constants/db';
export default {
    name: 'LocalDBDemo', // 本地数据库
    components: {
        Divider,
        Card,
        Button,
        Input,
    },
    data() {
        return {
            dataList: [],
            itemValue: '',
        };
    },
    methods: {
        async addDataItem() {
            if (this.itemValue) {
                await addItem(DB_NAME.dbTest, {
                    value: this.itemValue
                });
                this.itemValue = '';
                TipSuccess('添加测试数据成功，你可以刷新数据查看');
            } else {
                TipError('添加内容不能为空');
            }
        },
        async getDataList() {
            this.dataList = await getAllItems(DB_NAME.dbTest);
            TipSuccess('数据刷新成功！');
        },
    },
};
</script>

<style lang="less" scoped>
.v-local-db-demo {
    .p-h(@gap);
    .ivu-btn {
        .m-v(@gap);
    }
    .db-list {
        .db-item {
            .m-b(@gap-sm);
            &:last-child {
                .m-b(0);
            }
        }
    }
}
</style>
