<template>
    <MainLayout>
        <router-view />
        <Update />
    </MainLayout>
</template>

<script>
import 'view-design/dist/styles/iview.css';
import MainLayout from '@views/layout/MainLayout';
import '@styles/main';
import Update from './views/components/Update.vue';
export default {
    name: 'index',
    components: {
        MainLayout,
        Update,
    },
};
</script>
