import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '../views/Login.vue'

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
    name: 'login',
    component: Login
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
