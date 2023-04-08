import { createRouter, createWebHashHistory } from 'vue-router'
import LoginAndRegistered from '../views/LoginAndRegistered.vue'

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
    path: '/test',
    name: 'test',
    component: () => import('../views/Test.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
