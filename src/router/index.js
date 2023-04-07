import { createRouter, createWebHashHistory } from 'vue-router'
import LoginAndRegistered from '../views/LoginAndRegistered.vue'
import Shopping from '../views/Shopping.vue'

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
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
