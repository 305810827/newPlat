import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/login.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/register.vue')
  },
  {
    path: '/mine',
    name: 'mine',
    component: () => import('../views/mine.vue')
  },
  {
    path: '/searchPage',
    name: 'searchPage',
    component: () => import('../views/searchPage.vue')
  },
  {
    path: '/myCollect',
    name: 'myCollect',
    component: () => import('../views/myCollect.vue')
  },
  {
    path: '/newContent/:newId',
    name: 'newContent',
    component: () => import('../views/newContent.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
