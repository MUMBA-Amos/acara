import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import HighlightEvent from '../views/HighlightEvent.vue'
import LoginPage from '../views/LoginPage.vue'

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage,
  },
  {
    path: '/event/:id',
    name: 'HighlightEvent',
    component: HighlightEvent,
    props: true
  },

  
  {
    path: '/loginPage',
    name: 'LoginPage',
    component: LoginPage,
  },
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
