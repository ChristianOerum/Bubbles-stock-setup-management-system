import {createRouter, createWebHistory } from 'vue-router'

import Lager from '../page/Lager_page.vue'
import Login from '../page/Login_screen.vue'
import Systemer from '../page/Systemer_page.vue'

const routes = [
    {
        path: '/',
        component: Lager
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/systemer',
        component: Systemer
    },
    
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router