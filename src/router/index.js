import Vue from 'vue';
import Router from 'vue-router';
import { MenuRouter } from './menu';

Vue.use(Router);

const router = new Router({
    // mode: 'history',
    routes: [
        ...MenuRouter,
    ],
});

export default router;
