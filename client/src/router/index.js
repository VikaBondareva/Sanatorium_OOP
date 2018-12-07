import Vue from 'vue'
import Router from 'vue-router'

import StartPage from '@/components/main/StartPage.vue'
import ProfilePage from '@/components/user/ProfilePage.vue'
import AboutUs from '@/components/main/AboutUs'
import ServicesPage from '@/components/main/ServicesPage'
import BookingPage from '@/components/main/BookingPage.vue'
import Cards from '@/components/admin/Cards.vue'
import OrdersPage from '../components/admin/OrdersPage.vue'
import ActiveOrders from '../components/admin/ActiveOrders.vue'
import store from '../store/store' // your vuex store 


Vue.use(Router)

const routes = [
    {
        path: '/',
        name: 'home',
        component: StartPage
    },
    {
        path: '/profile',
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
    },
    {
        path: '/orders/register',
        name: 'ordersRegister',
        component: OrdersPage,
        meta:{requiredAuth:true}
    },
    {
        path: '/orders/active',
        name: 'ordersActive',
        component: ActiveOrders,
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
            router.push('/')
        }
    } else {
        next()
    }
})

export default router;

