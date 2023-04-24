import { createRouter, createWebHashHistory } from 'vue-router'
import LoginAndRegistered from '../views/LoginAndRegistered.vue'
import { showFailToast } from 'vant'

/* 
  //路由配置
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue')
  }
*/
const routes = [
  {
    path: '/',
    name: 'loginandregistered',
    component: LoginAndRegistered
  },
  {
    path: '/index',
    name: 'index',
    component: () => import('../views/Index.vue')
  },
  {
    path: '/shopping',
    name: 'shopping',
    component: () => import('../views/Shopping.vue')
  },
  ,
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/topup',
    name: 'topup',
    component: () => import('../views/TopUp.vue')
  },
  {
    path: '/myBindBox',
    name: 'myBindBox',
    component: () => import('../views/MyBlindBox.vue')
  },
  {
    path: '/myAddress',
    name: 'myAddress',
    component: () => import('../views/MyAddress.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
//配置路由拦截，如果有token访问登录注册就返回上一级
router.beforeEach((to, from, next) => {
  let token = localStorage.getItem("token");
  //这些页面如果没有token直接跳转登录
  if ((to.path === '/home' || to.path === '/topup' || to.path === '/myBindBox' || to.path === '/myAddress'
    || to.path === '/shopping')
    && (token === null || token === '')) {
    showFailToast("您还未登录");
    next('/');
    return;
  }
  // 如果是登录页面，且token不为空就返回首页
  if (to.path === '/' && token) {
    next("/index");
    return;
  }
  next();
});
export default router
