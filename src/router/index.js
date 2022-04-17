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
    name: 'Home',
    component: () => import('../page/Home.vue'),
    meta: {
      roles: ['0', '1'],
      keepAlive: true,
    },
    children: [
      {
        path: '',
        meta: {
          title: '监测信息',
          keepAlive: true,
        },
        component: () => import('../page/mainPage/MonitorInfo.vue'),
      },
      {
        path: 'Monitor',
        name: 'Monitor',
        meta: {
          title: '监测信息',
          keepAlive: true,
        },
        component: () => import('../page/mainPage/MonitorInfo.vue'),
      },
      {
        path: 'User',
        name: 'User',
        meta: {
          title: '用户管理',
          keepAlive: true,
        },
        component: () => import('../page/mainPage/UserManager.vue'),
      },
      {
        path: 'AddUser',
        name: 'AddUser',
        meta: {
          title: '添加用户',
          keepAlive: true,
        },
        component: () => import('../page/mainPage/AddUser.vue'),
      },
      {
        path: 'Gas',
        name: 'Gas',
        meta: {
          title: '燃气管理',
          keepAlive: true,
        },
        component: () => import('../page/mainPage/GasManager.vue'),
      },
      {
        path: 'Pay',
        name: 'Pay',
        meta: {
          title: '缴费管理',
          keepAlive: true,
        },
        component: () => import('../page/mainPage/MonitorInfo.vue'),
      },
      {
        path: 'Card',
        name: 'Card',
        meta: {
          title: '气卡管理',
          keepAlive: true,
        },
        component: () => import('../page/mainPage/CardManager.vue'),
      },
      {
        path: 'QueryCard',
        name: 'QueryCard',
        meta: {
          title: '查询气卡',
          keepAlive: true,
        },
        component: () => import('../page/mainPage/QueryCard.vue'),
      },
      {
        path: 'AddCard',
        name: 'AddCard',
        meta: {
          title: '添加气卡',
          keepAlive: true,
        },
        component: () => import('../page/mainPage/AddGascard.vue'),
      },
      {
        path: 'MeterRead',
        name: 'MeterRead',
        meta: {
          title: '抄表',
          keepAlive: true,
        },
        component: () => import('../page/mainPage/MeterReading.vue'),
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
  const role = sessionStorage.getItem('userType');
  if (!isLogin) return next('/Login');
  if (to.meta.roles.includes(role)) {
    return next();
  }
  return next({ path: '/404' });
});
export default router;
