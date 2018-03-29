import Vue from 'vue';
import Router from 'vue-router';
import Index from '@/views/Index';
import Other from '@/views/Other';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
    },
    {
      path: '/other',
      name: 'Other',
      component: Other,
    },
  ],
});
