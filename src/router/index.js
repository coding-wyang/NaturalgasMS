import {createRouter, createWebHistory} from 'vue-router';
const routes = [
	{
		//重定向
		path: '/',
		redirect: '/Login',
	},
	{
		path: '/Login' ,
		component: () => import("../page/Login.vue"),
  },
	{
		path: '/Home' ,
		component: () => import("../page/Home.vue"),
  },
]

const router =createRouter({
	history: createWebHistory(),
	routes,
});

export default router;