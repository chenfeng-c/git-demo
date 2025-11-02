import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Jobs from '../views/Jobs.vue'
import Events from '../views/Events.vue'
import Team from '../views/Team.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Profile from '../views/Profile.vue'
import AdminDashboard from '../views/AdminDashboard.vue'
import AccessDenied from '../views/AccessDenied.vue'
import { user as userState, initAuth } from '../store/auth'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/jobs',
    name: 'Jobs',
    component: Jobs
  },
  {
    path: '/events',
    name: 'Events',
    component: Events
  },
  {
    path: '/team',
    name: 'Team',
    component: Team
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { requiresGuest: true }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: { requiresGuest: true }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: { requiresAuth: true }
  },
  {
    path: '/admin',
    name: 'AdminDashboard',
    component: AdminDashboard,
    meta: { requiresAuth: true, roles: ['admin'] }
  },
  {
    path: '/unauthorized',
    name: 'AccessDenied',
    component: AccessDenied
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return {
      left: 0,
      top: 0,
      behavior: 'smooth'
    }
  }
})

let authChecked = false

// 路由守卫
router.beforeEach(async (to, from, next) => {
  if (!authChecked) {
    await initAuth()
    authChecked = true
  }

  const currentUser = userState.value || JSON.parse(localStorage.getItem('user') || 'null')

  if (to.meta.requiresGuest && currentUser) {
    return next('/')
  }

  if (to.meta.requiresAuth && !currentUser) {
    return next({ name: 'Login', query: { redirect: to.fullPath } })
  }

  if (to.meta.roles && to.meta.roles.length) {
    if (!currentUser || !to.meta.roles.includes(currentUser.role)) {
      return next({ name: 'AccessDenied' })
    }
  }

  next()
})

export default router

