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
    children: [
      {
        path: '',
        component: () => import('../page/mainPage/MonitorInfo.vue'),
      },
      {
        path: 'Monitor',
        component: () => import('../page/mainPage/MonitorInfo.vue'),
      },
      {
        path: 'User',
        component: () => import('../page/mainPage/UserManager.vue'),
      },
      {
        path: 'AddUser',
        component: () => import('../page/mainPage/AddUser.vue'),
      },
      {
        path: 'Gas',
        component: () => import('../page/mainPage/GasManager.vue'),
      },
      {
        path: 'Pay',
        component: () => import('../page/mainPage/MonitorInfo.vue'),
      },
      {
        path: 'Card',
        component: () => import('../page/mainPage/CardManager.vue'),
      },
      {
        path: 'QueryCard',
        component: () => import('../page/mainPage/QueryCard.vue'),
      },
      {
        path: 'AddCard',
        component: () => import('../page/mainPage/AddGascard.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export const dynamicRouter = [
  { path: '/Home', name: 'Home', component: () => import('../page/Home.vue') },
];

router.beforeEach((to, from, next) => {
  if (to.path === '/Login') return next();
  const isLogin = sessionStorage.getItem('userToken');
  if (!isLogin) return next('/Login');
  return next();
});

export default router;
