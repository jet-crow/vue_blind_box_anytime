import { createRouter, createWebHashHistory } from 'vue-router'
import LoginAndRegistered from '../views/LoginAndRegistered.vue'
import Shopping from '../views/Shopping.vue'
import Home from '../views/Home.vue'
import TopUp from '../views/TopUp.vue'

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
    component: Shopping
  },
  ,
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/topup',
    name: 'topup',
    component: TopUp
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
