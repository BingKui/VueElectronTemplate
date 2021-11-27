<template>
    <MainLayout>
        <router-view />
    </MainLayout>
</template>

<script>
import Vue from 'vue';
import MainLayout from '@views/layout/MainLayout';
import '@styles/main';
import { Message } from 'element-ui';
// Vue.use(Message);
export default {
    name: 'index',
    components: {
        MainLayout,
    },
};
</script>
