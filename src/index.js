import Vue from 'vue';
import Tpl from './index.vue';
import store from '@store/index';
import router from '@router/index';
import vuetify from './vuetify';
new Vue({
    router,
    store,
    vuetify,
    render: h => h(Tpl),
}).$mount('#app');
