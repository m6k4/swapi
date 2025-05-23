import { createRouter, createWebHistory } from 'vue-router';
import PlanetView from './views/PlanetView.vue';

const routes = [
  { 
    path: '/',
    component: PlanetView,
    children: [],
    params: {
      page: 1,
      filter: '',
      sort: null
    }
  },

  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
  
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;