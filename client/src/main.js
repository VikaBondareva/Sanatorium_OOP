import 'es6-promise/auto'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/store'
import VueRouter from 'vue-router'
import BootstrapVue from 'bootstrap-vue'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"
import Vuetify from 'vuetify'
import VueCookies from 'vue-cookies'
//import vueHeadful from 'vue-headful';

//Vue.component('vue-headful', vueHeadful);

Vue.use(Vuetify)
Vue.use(VueRouter)
Vue.use(BootstrapVue)
Vue.use(VueCookies)
Vue.config.productionTip = false

import 'vuetify/dist/vuetify.min.css'
import './assets/styles/app.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

new Vue({
    el: '#app',
    router,
    store,
    render: h=>h(App)
})
