import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const routes = [
  {
    name: 'home',
    path: '/mock/wx/ui',
    component: () =>
      import('../pages/home/home.vue')
  }, {
    name: 'add',
    path: '/mock/wx/ui/add',
    component: () =>
      import('../pages/add/add.vue')
  }, {
    name: 'apps',
    path: '/mock/wx/ui/apps',
    component: () =>
      import('../pages/apps/apps.vue')
  }, {
    name: 'conversation',
    path: '/mock/wx/ui/conversation',
    component: () =>
      import('../pages/conversation/conversation.vue')
  }, {
    name: 'error',
    path: '/mock/wx/ui/error',
    component: () =>
      import('../pages/error/error.vue')
  }, {
    name: 'notfound',
    path: '/mock/wx/ui/notfound',
    component: () =>
      import('../pages/notfound/notfound.vue')
  }, {
    name: 'default',
    path: '*',
    component: () =>
      import('../pages/notfound/notfound.vue')
  }
];

export default new Router({
  mode: 'history',
  routes: routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      if (to.hash) {
        return {
          selector: to.hash
        };
      } else {
        return {
          x: 0,
          y: 0
        };
      }
    }
  }
});
