<template>
    <router-view />
</template>

<script>
import Vue from 'vue';
import N3Components from 'N3-components';
import 'N3-components/dist/index.min.css';
Vue.use(N3Components);

import '@styles/main';
export default {
    name: 'index',
};
</script>
