import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    // 重定向
    path: '/',
    redirect: '/Login',
  },
  {
    path: '/Login',
    component: () => import('../page/Login.vue'),
  },
  {
    path: '/Home',
    component: () => import('../page/Home.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.path === '/Login') return next();
  const isLogin = sessionStorage.getItem('userToken');
  if (!isLogin) return next('/Login');
  return next();
});

export default router;
