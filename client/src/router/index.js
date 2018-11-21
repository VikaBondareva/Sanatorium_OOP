import Vue from 'vue'
import Router from 'vue-router'
import StartPage from '@/components/main/StarPage.vue'
import Service from '@/components/main/Service.vue'
import Login from '@/components/auth/Login.vue'
import Registraion from '@/components/auth/Registration.vue'
import ProfilePage from '@/components/user/ProfilePage.vue'

Vue.use(Router)

const routes = [
    {
        path: '/',
        name: 'home',
        component: StartPage
    },
    {
        path: '/login', name:'login',  component: Login  
    },
    {
        path: '/registration', name: 'registration', component: Registraion
    }
  ]

export default new Router({
    mode: 'history',
    routes: routes
})
