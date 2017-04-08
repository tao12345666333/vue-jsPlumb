import Vue from 'vue';
import Router from 'vue-router';
import Main from '@/views/Main';
import Index from '@/views/Index';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main,
      children: [
        {
          path: '/',
          name: 'Index',
          component: Index,
        },
      ],
    },
  ],
});
