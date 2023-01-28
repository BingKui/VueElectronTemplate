import { createApp } from 'vue';
import Tpl from './Tpl.vue';
import router from '@router/index';
import './styles/main.less';
import 'view-ui-plus/dist/styles/viewuiplus.css';

const app = createApp(Tpl);
app.use(router);

app.mount('#app');
