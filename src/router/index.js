import Vue from 'vue'
import VueRouter from 'vue-router'
import {auth} from "@/plugins/firebase"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    alias: ['/home'],
    name: 'Home',
    component: function () {
      return import('../views/Home.vue')
    },
    meta: {requiresAuth: true}
  },
  {
    path: '*',
    component: ()=>{return import('../views/error404')}
  },
  {
    path: '/login',
    name: 'Login',
    component: function () {
      return import('../views/Login.vue')
    }
  },
  {
    path: '/about',
    name: 'About',
    component: function () {
      return import('../views/About.vue')
    },
    meta: {requiresAuth: true}
  },
  {
    path: '/profile',
    name: 'Profile',
    component: function () {
      return import('../views/Profile.vue')
    },
    meta: {requiresAuth: true}
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next)=>{
  const user = auth.currentUser
  if (to.matched.some(record => record.meta.requiresAuth)){
    if(user){
      next()
    } else {
      next({name: 'Login'})
    }
  } else {
    next()
  }
})

export default router
