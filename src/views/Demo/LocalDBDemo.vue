<template>
    <div class="v-local-db-demo">
        <Divider content-position="left">本地数据库</Divider>
        <div class="db-list">
            <Card class="db-item" v-for="(item, index) in dataList" :key="index">{{item.value}}
                <Button type="danger" size="mini" @click="() => deleteAction(item)">删除</Button>
            </Card>
            <Button @click="getDataList">刷新</Button>
        </div>
        <div class="add-container">
            <Input placeholder="输入要添加的数据" v-model="itemValue" />
            <Button type="primary" @click="addDataItem">添加数据</Button>
        </div>
    </div>
</template>

<script>
import { Divider, Card, Button, Input} from 'element-ui';
import { addItem, getAllItems, delItem } from '@common/db';
import { successTip, errorTip } from '@common/tip';
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
    async created() {
        await this.getDataList();
    },
    methods: {
        async addDataItem() {
            if (this.itemValue) {
                await addItem(DB_NAME.dbTest, {
                    value: this.itemValue
                });
                this.itemValue = '';
                successTip('添加测试数据成功!');
                await this.getDataList();
            } else {
                errorTip('添加内容不能为空');
            }
        },
        async deleteAction(item) {
            await delItem(DB_NAME.dbTest, item._id);
            successTip('删除数据成功!');
            await this.getDataList();
        },
        async getDataList() {
            this.dataList = await getAllItems(DB_NAME.dbTest);
            successTip('数据刷新成功！');
        },
    },
};
</script>

<style lang="less">
.v-local-db-demo {
    padding: 0 @gap;
    .el-button {
        margin: @gap 0 ;
    }
    .el-card__body {
        padding: @gap @gap-md;
    }
    .db-list {
        .db-item {
            margin-bottom: @gap-sm;
            &:last-child {
                margin-bottom: 0;
            }
        }
    }
}
</style>
