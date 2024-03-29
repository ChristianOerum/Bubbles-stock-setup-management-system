import {createRouter, createWebHistory } from 'vue-router'

import Home from '../page/Home_page.vue'

import Lager from '../page/Lager_page.vue'
import Login from '../page/Login_screen.vue'
import Systemer from '../page/Systemer_page.vue'

import TilføjProdukt from '../page/TilføjProdukt_page.vue'
import TilføjStock from '../page/TilføjStock_page.vue'
import TilføjSystem from '../page/TilføjSystem_page.vue'

import UpdateProdukt from '../page/UpdateProdukt_page.vue'
import UpdateStock from '../page/UpdateStock_page.vue'
import UpdateSystem from '../page/UpdateSystem_page.vue'

import ManageCombos from '../page/Combo_page.vue'
import TilføjCombos from '../page/TilføjCombo_page.vue'

import InUdOversigt from '../page/In_udOversigt_page.vue'

const routes = [
    {
      path: '/',
      redirect: '/dashboard',
      meta: {
        requiresAuth: true
      }
    },
    {
        path: '/dashboard',
        component: Home,
        meta: {
            requiresAuth: true
          }
    },
    {
        path: '/lager',
        component: Lager,
        meta: {
            requiresAuth: true
          }
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/systemer',
        component: Systemer,
        meta: {
            requiresAuth: true
          }
    },


    {
        path: '/tilfoej_produkt',
        component: TilføjProdukt,
        meta: {
            requiresAuth: true
          }
    },
    {
        path: '/tilfoej_stock', 
        component: TilføjStock,
        meta: {
            requiresAuth: true
          }
    },
    {
        path: '/tilfoej_system',
        component: TilføjSystem,
        meta: {
            requiresAuth: true
          }
    },


    {
        path: '/update_produkt',
        component: UpdateProdukt,
        meta: {
            requiresAuth: true
          }
    },
    {
        path: '/update_stock',
        component: UpdateStock,
        meta: {
            requiresAuth: true
          }
    },
    {
        path: '/update_system',
        component: UpdateSystem,
        meta: {
            requiresAuth: true
          }
    },
    {
      path: '/manage_combos',
      component: ManageCombos,
      meta: {
          requiresAuth: true
        }
    },
    {
      path: '/tilfoej_combo',
      component: TilføjCombos,
      meta: {
          requiresAuth: true
        }
    },
    {
      path: '/in_ud_oversigt',
      component: InUdOversigt,
      meta: {
          requiresAuth: true
        }
    },
    
]

const router = createRouter({
    history: createWebHistory(),
    routes
})



router.beforeEach((to, from, next) => {

    let localPasswordStorage = localStorage.getItem("Password")
    let accessPassword = process.env.VUE_APP_ACCESS_PIN
   
    if (to.matched.some(record => record.meta.requiresAuth)) {
      // this route requires auth, check if logged in
      // if not, redirect to login page.
      if (localPasswordStorage != accessPassword) {
        next('/login')
      } else {
        next() // go to wherever I'm going
      }
    } else {
      next() // does not require auth, make sure to always call next()!
    }
  })





export default router