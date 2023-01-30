<template>
    <div class="v-about-page flex-column-center">
        <img :src="appicon" width="160" alt="">
        <div class="font-size-32 margin-v-lg">{{ name }}</div>
        <div class="font-size">Version. v{{ version }}</div>
        <div class="font-size-sm margin-top-sm">Copyright © 2018-{{ nowYear }} {{ author }}. All rights reserved.</div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import dayjs from 'dayjs';
import PKG from '../../package.json';
import appicon from '@/assets/app.png';
const name = ref(PKG.name);
const version = ref(PKG.version);
const author = ref(PKG.author);
const nowYear = dayjs().format('YYYY');

</script>

<style lang="less" scoped>
.v-about-page {
    height: 100vh;
}
</style>