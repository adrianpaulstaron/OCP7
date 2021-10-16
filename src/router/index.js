import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/inscription',
    name: 'Inscription',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Inscription.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Profile.vue')
  },
  {
    path: '/timeline',
    name: 'Timeline',
    component: () => import('../views/Timeline.vue')
  },
  {
    path: '/post',
    name: 'Post',
    component: () => import('../views/PostDetails.vue')
  },
  {
    path: '/newpost',
    name: 'NewPost',
    component: () => import('../views/NewPost.vue')
  },
  {
    path: '/postdetails/:id?',
    name: 'PostDetails',
    component: () => import('../views/PostDetails.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router