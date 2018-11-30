import Vue from 'vue'
import Vuex from 'vuex'
import Auth from './module/auth'
import Services from './module/services'
//import Cookie from 'vue-cookies'
Vue.use(Vuex)
//Vue.use(Cookie)
export default new Vuex.Store({
    modules: {
        Auth,
        Services
    }
})