<template>
    <Page class="v-local-db-demo" header="本地数据库">
        <Divider orientation="left">本地数据库</Divider>
        <div class="db-list margin-bottom">
            <Card class="db-item" v-for="(item, index) in dataList" :key="index">{{ item.value }}
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

<script setup lang="ts">
import { ref } from 'vue';
import { Divider, Space, Button, Input, Card } from 'view-ui-plus';
import Page from '@/components/Page.vue';
import { addItem, delItem, getList } from '@/feature/db';
import { errorTip, successTip } from '@/common/tip';
const dataList = ref<any>([]);
const itemValue = ref<string>('');

const dbName = 'dbtest';

const addDataItem = async () => {
    if (itemValue.value && itemValue.value.trim()) {
        await addItem(dbName, {
            value: itemValue.value,
        });
        itemValue.value = '';
        successTip('添加数据成功！');
        await getDataList();
    } else {
        errorTip('添加内容不能为空');
    }
};
const getDataList = async () => {
    dataList.value = (await getList(dbName)) || [];
};
const deleteAction = async (item: any) => {
    await delItem(dbName, item._id);
    successTip('删除数据成功!');
    await getDataList();
};
</script>

<style scoped lang="less">

</style>