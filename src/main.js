import { createApp } from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';
import 'virtual:svg-icons-register' ;
import SvgIcon from '@/components/SvgIcon.vue' ;
import './styles/global.scss';

createApp(App).use(store).use(router).component('svg-icon', SvgIcon).mount('#app');
