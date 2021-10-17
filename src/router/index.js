import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
// import router from "../router";
import store from '../store'

// Vue.use(Router);

// on déclare un garde qui va servir à rediriger vers la page de login lorsque l'on n'est pas authentifié
function routeGuard(to, from, next) {
  console.log("route guard", store.state.isLoggedin)
  // si on n'est pas loggé
  if (store.state.isLoggedin === false) {
    next({
    // on redirige vers l'accueil
      path: '/',
      query: {
        redirectFrom: to.fullPath
      }
    })
  }else{
    next()
  }
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/inscription',
    name: 'Inscription',
    component: () => import(/* webpackChunkName: "about" */ '../views/Inscription.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    beforeEnter : routeGuard,
    component: () => import(/* webpackChunkName: "about" */ '../views/Profile.vue')
  },
  {
    path: '/timeline',
    name: 'Timeline',
    beforeEnter : routeGuard,
    component: () => import('../views/Timeline.vue')
  },
  {
    path: '/newpost',
    name: 'NewPost',
    beforeEnter : routeGuard,
    component: () => import('../views/NewPost.vue')
  },
  {
    path: '/postdetails/:id?',
    name: 'PostDetails',
    beforeEnter : routeGuard,
    component: () => import('../views/PostDetails.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router