import { createApp } from 'vue'
import { createPinia } from 'pinia';
import Tpl from './Tpl.vue'
import router from './router';
import './styles/main.less';
import 'view-ui-plus/dist/styles/viewuiplus.css';
import PerfectScrollbar from 'vue3-perfect-scrollbar'
import 'vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css'
// import ContextMenu from '@imengyu/vue3-context-menu';
// import '@imengyu/vue3-context-menu/lib/vue3-context-menu.css';

import contextmenu from 'vue3-contextmenu'
import 'vue3-contextmenu/dist/vue3-contextmenu.css'

const app = createApp(Tpl);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.use(PerfectScrollbar)
app.use(contextmenu);

app.mount("#app");
