import Vue from 'vue'
import Router from 'vue-router'
import StartPage from '@/components/main/StartPage.vue'
import Login from '@/components/auth/Login.vue'
import Registraion from '@/components/auth/Registration.vue'
import ProfilePage from '@/components/user/ProfilePage.vue'
import AboutUs from '@/components/main/AboutUs'
import ServicesPage from '@/components/main/ServicesPage'
import BookingPage from '@/components/main/BookingPage.vue'
import Cards from '@/components/main/Cards.vue'

import store from '../store/store' // your vuex store 


Vue.use(Router)

//const ifAuthenticated = (to, from, next) => {
//    if (store.getters.isAuthenticated) {
//        next()
//        return
//    }
//    next('/')
//}

const routes = [
    {
        path: '/',
        name: 'home',
        component: StartPage
    },
    {
        path: '/user/profile',
        name: 'userPage',
        component: ProfilePage,
        meta:{requiredAuth:true}
    },
    {
        path: '/services',
        name: 'services',
        component: ServicesPage
    },
    {
        path: '/about',
        name: 'about',
        component: AboutUs
    },
    {
        path: '/booking',
        name: 'booking',
        component: BookingPage,
       meta:{requiredAuth:true}
    },
    {
        path: '/booking/cards',
        name: 'cards',
        component: Cards,
        meta:{requiredAuth:true}
    }
  ]



const router = new Router({
    mode: 'history',
    routes: routes
})

router.beforeEach((to, from, next) => {
    if (to.meta.requiredAuth) {
        if (store.getters.isAuthenticated) {
            next()
        } else {
            router.push('/login')
        }
    } else {
        next()
    }
})

export default router;



//export default new Router({
//  mode: 'history',
//  routes: [
//    {
//      path: '/',
//      name: 'Home',
//      component: Home,
//    },
//    {
//      path: '/account',
//      name: 'Account',
//      component: Account,
//      beforeEnter: ifAuthenticated,
//    },
//    {
//      path: '/login',
//      name: 'Login',
//      component: Login,
//      beforeEnter: ifNotAuthenticated,
//    },
//  ],
//})
