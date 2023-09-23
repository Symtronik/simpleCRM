import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'
import HomeView from '../views/HomeView.vue'

import SignUpView from '../views/SignUpView.vue'
import LogInView from '../views/LogInView.vue'
import DashboardView from '../views/dashboard/DashboardView.vue'
import MyAccountView from '../views/dashboard/MyAccountView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/sign-up',
    name: 'SignUpView',
    component: SignUpView
  },
  {
    path: '/log-in',
    name: 'LogInView',
    component: LogInView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/dashboard',
    name: 'DashboardView',
    component: DashboardView,
    meta: {
      requireLogin:true
    }
  },
  {
    path: '/dashboard/my-account',
    name: 'MyAccountView',
    component: MyAccountView,
    meta: {
      requireLogin:true
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to,from, next) =>{
  if (to.matched.some(record => record.meta.requireLogin) && !store.state.isAuthenticated){
    next('/log-in')
  }else{
    next()
  }
})

export default router
