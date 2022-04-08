<template>
    <Page class="v-local-db-demo" header="本地数据库">
        <Divider orientation="left">本地数据库</Divider>
        <div class="db-list margin-bottom">
            <Card class="db-item" v-for="(item, index) in dataList" :key="index">{{item.value}}
                <Button type="error" size="small" @click="() => deleteAction(item)">删除</Button>
            </Card>
            <Button @click="getDataList">刷新</Button>
        </div>
        <Space class="add-container">
            <Input placeholder="输入要添加的数据" v-model="itemValue" />
            <Button type="primary" @click="addDataItem">添加数据</Button>
        </Space>
    </Page>
</template>

<script>
import { Divider, Card, Button, Input} from 'view-design';
import { addItem, getList, delItem } from '@common/db';
import { successTip, errorTip } from '@common/tip';
import { Space, Page } from '@components';
import DB_NAME from '@constants/db';
export default {
    name: 'LocalDBDemo', // 本地数据库
    components: {
        Divider,
        Card,
        Button,
        Input,
        Space,
        Page,
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
            this.dataList = await getList(DB_NAME.dbTest);
            successTip('数据刷新成功！');
        },
    },
};
</script>

<style lang="less">
.v-local-db-demo {
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
