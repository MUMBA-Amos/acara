import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage,
  },
  // Add more routes here as you create new pages
  // {
  //   path: '/about',
  //   name: 'About',
  //   component: () => import('../views/About.vue')
  // },
  // {
  //   path: '/events',
  //   name: 'Events',
  //   component: () => import('../views/Events.vue')
  // }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
