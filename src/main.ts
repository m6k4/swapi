import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import router from './router'; // Adjust the path as necessary
import '@/assets/styles/style.scss';
import dayjs from 'dayjs'
import interceptor from "@/config/interceptor";
import ToastService from 'primevue/toastservice';

const app = createApp(App);
app.config.globalProperties.$dayjs = dayjs

app.use(ToastService);
app.use(interceptor);
app.use(router);
app.use(PrimeVue, {
  theme: {
      preset: Aura
  }
},);

app.mount('#app')