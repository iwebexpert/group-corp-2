import Vue from 'vue'
import Router from 'vue-router'
import UsersPage from '@/components/UsersPage'
import Auth from '@/components/Auth'
import Registr from '@/components/Registr'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: UsersPage
        },

        {
            path: '/auth',
            component: Auth
        },

        {
            path: '/registr',
            component: Registr
        }
    ]
}) 