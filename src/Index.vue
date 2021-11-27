<template>
    <MainLayout>
        <router-view />
    </MainLayout>
</template>

<script>
import MainLayout from '@views/layout/MainLayout';
import '@styles/main';
export default {
    name: 'index',
    components: {
        MainLayout,
    },
};
</script>
