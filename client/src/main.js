import 'es6-promise/auto'
import Vue from 'vue'
import App from './App'
import router from './router'
import VueRouter from 'vue-router'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"
import Vuetify from 'vuetify'



Vue.use(Vuetify)
Vue.use(VueRouter)
Vue.config.productionTip = false

import 'vuetify/dist/vuetify.min.css'
import './assets/styles/app.css'
//import 'material-design-icons-iconfont/dist/material-design-icons.css'

new Vue({
    el: '#app',
    router,
    render: h=>h(App)
})
