import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import HighlightEvent from '../views/HighlightEvent.vue'
import LoginPage from '../views/LoginPage.vue'
import Admin from '../views/admin/Admin.vue'

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
    props: true,
  },
  {
    path: '/loginPage',
    name: 'LoginPage',
    component: LoginPage,
  },
  // Admin routes
  {
    path: '/admin/:pathMatch(.*)*',
    name: 'Admin',
    component: Admin,
    meta: { requiresAuth: true },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Navigation guard for authentication
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('isAdminAuthenticated')

  // If route requires auth and user is not authenticated
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/loginPage')
  }
  // If user is authenticated and trying to access login page, redirect to admin
  else if (to.path === '/loginPage' && isAuthenticated) {
    next('/admin')
  } else {
    next()
  }
})

export default router
