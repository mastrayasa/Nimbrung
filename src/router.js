import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Auth from './Auth.js'
import VueSweetalert2 from 'vue-sweetalert2'
import firebase from "firebase";

const moment = require('moment')
require('moment/locale/id')
Vue.use(require('vue-moment'), {moment})

Vue.use(Auth)
Vue.use(Router)
Vue.use(VueSweetalert2)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/daftar',
      name: 'daftar',
      component: () => import('./views/Daftar.vue')
    },{
      path: '/profile',
      name: 'profile',
      component: () => import('./views/Profile.vue'),
      meta: {
        requireAuth: true
      }
    }, 
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})

router.beforeEach((to, form, next) => {
  const currentUser = firebase.auth().currentUser
  const requireAuth = to.matched.some(record => record.meta.requireAuth)

  if (requireAuth && !currentUser) next('login')
  //else if(!requireAuth && currentUser) next('profile');
  else next()
})

export default router
