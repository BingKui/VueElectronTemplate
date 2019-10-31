<template>
    <MainLayout>
        <router-view />
    </MainLayout>
</template>

<script>
import 'view-design/dist/styles/iview.css';
import MainLayout from '@views/layout/MainLayout';
import '@styles/main';
export default {
    name: 'index',
    components: {
        MainLayout,
    },
};
</script>
