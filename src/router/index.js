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
    path: '/PaySucess',
    name: 'PaySucess',
    component: () => import('../page/PaySucess.vue'),
  },
  {
    path: '/PayPhone',
    name: 'PayPhone',
    component: () => import('../page/PayPhone.vue'),
  },
  {
    path: '/Home',
    name: 'Home',
    component: () => import('../page/Home.vue'),
    meta: {
      roles: ['0', '1', '2'],
      keepAlive: true,
    },
    children: [
      {
        path: '',
        name: 'First',
        meta: {
          title: '监测信息',
          keepAlive: true,
        },
        component: () => import('../page/mainPage/MonitorInfo.vue'),
      },
      {
        path: 'UserInfo',
        name: 'UserInfo',
        meta: {
          title: '个人信息',
          keepAlive: true,
        },
        component: () => import('../page/mainPage/UserInfo.vue'),
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
          title: '气表管理',
          keepAlive: true,
        },
        component: () => import('../page/mainPage/GasManager.vue'),
      },
      {
        path: 'AddMeter',
        name: 'AddMeter',
        meta: {
          title: '添加气表',
          keepAlive: true,
        },
        component: () => import('../page/mainPage/AddMeter.vue'),
      },
      {
        path: 'Pay',
        name: 'Pay',
        meta: {
          title: '缴费管理',
          keepAlive: true,
        },
        component: () => import('../page/mainPage/PayManager.vue'),
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
      {
        path: 'ReadRecord',
        name: 'ReadRecord',
        meta: {
          title: '抄表记录',
          keepAlive: true,
        },
        component: () => import('../page/mainPage/ReadRecord.vue'),
      },
      {
        path: 'ReadEchart',
        name: 'ReadEchart',
        meta: {
          title: '抄表展示',
          keepAlive: true,
        },
        component: () => import('../page/mainPage/ReadEchart.vue'),
      },
      {
        path: 'CardMessage',
        name: 'CardMessage',
        meta: {
          title: '气卡信息',
          keepAlive: true,
        },
        component: () => import('../page/mainPage/CardMessage.vue'),
      },
      {
        path: 'GasPrice',
        name: 'GasPrice',
        meta: {
          title: '燃气管理',
          keepAlive: true,
        },
        component: () => import('../page/mainPage/GasPrice.vue'),
      },
      {
        path: 'AddGas',
        name: 'AddGas',
        meta: {
          title: '添加燃气',
          keepAlive: true,
        },
        component: () => import('../page/mainPage/AddGas.vue'),
      },
      {
        path: 'PayIndex',
        name: 'PayIndex',
        meta: {
          title: '支付页面',
          keepAlive: true,
        },
        component: () => import('../page/mainPage/PayIndex.vue'),
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
  const isLogin = sessionStorage.getItem('userToken');
  const role = sessionStorage.getItem('userType');
  if (to.name === 'First' && role === '2') {
    return next({ name: 'UserInfo' });
  }
  if (to.path === '/PaySucess') return next();
  if (to.path === '/PayPhone') return next();
  if (to.path === '/Login') return next();
  if (!isLogin) return next('/Login');
  if (to.meta.roles.includes(role)) {
    return next();
  }
  return next({ path: '/404' });
});
export default router;
