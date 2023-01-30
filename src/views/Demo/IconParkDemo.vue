<template>
    <Page class="v-icon-park-demo" header="IconPark图标">
        <Divider orientation="left">单色</Divider>
        <Box theme="outline" size="24" fill="#333" :strokeWidth="2"/>
        <BroadcastRadio theme="outline" size="24" fill="#333" :strokeWidth="2"/>
        <Divider orientation="left">填充</Divider>
        <Box theme="filled" size="24" fill="#333" :strokeWidth="2"/>
        <BroadcastRadio theme="filled" size="24" fill="#333" :strokeWidth="2"/>
        <Divider orientation="left">双色</Divider>
        <Box theme="two-tone" size="24" :fill="['#333' ,'#2F88FF']" :strokeWidth="2"/>
        <BroadcastRadio theme="two-tone" size="24" :fill="['#333' ,'#2F88FF']" :strokeWidth="2"/>
        <Divider orientation="left">多色</Divider>
        <Box theme="multi-color" size="24" :fill="['#333' ,'#2F88FF' ,'#FFF' ,'#43CCF8']" :strokeWidth="2"/>
        <BroadcastRadio theme="multi-color" size="24" :fill="['#333' ,'#2F88FF' ,'#FFF' ,'#43CCF8']" :strokeWidth="2"/>
        <Divider orientation="left">官方地址</Divider>
        <div class="text-title">https://iconpark.oceanengine.com/official</div>
    </Page>
</template>

<script setup lang="ts">
import { Divider } from 'view-ui-plus';
import { Home, Box, BroadcastRadio } from '@icon-park/vue-next';
import Page from '@components/Page.vue';
</script>

<style scoped lang="less">

</style>