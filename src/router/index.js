import { MenuRouter } from './menu';
import { createRouter, createWebHashHistory } from 'vue-router';

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        ...MenuRouter,
    ],
});

export default router;
