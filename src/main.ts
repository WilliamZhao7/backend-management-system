import { createApp } from 'vue';
import App from './App.vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import '@/styles/index.scss';
import pinia from './store';
import globalComponents from '@/components';
import router from './router';
import './permission';
//@ts-ignore忽略当前文件ts类型的检测否则有红色提示(打包会失败)



const app = createApp(App);
app.use(ElementPlus);
app.use(pinia);
app.use(globalComponents);
app.use(router);
app.mount('#app');