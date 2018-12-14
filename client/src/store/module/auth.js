import AuthService from '../../api/auth-service'
import * as types from '../mutation'
import {promise, promiseWithData} from '../promise.js'

const state = {
    spinner: false,
    authAlerts: [],
    user:'',
    authenticated: localStorage.getItem('user'),
    admin: localStorage.getItem('user')? JSON.parse(localStorage.getItem('user')).admin : false,
    auth: false
//    refreshToken: Cookie.get('refreshToken'),
//    accesstoken: Cookie.get('token')
}
    
const getters = {
    spinner: state => state.spinner,
    authAlerts: state => state.authAlerts,
    user: state=> state.user,
    isAuthenticated: state => !!state.authenticated,
    isAdmin: state=> !!state.admin,
    isAuth: state=> state.auth
}

const actions = {
    registration({ commit }, { formData }) {
        commit(types.SET_SPINNER, { value: true })
        return new Promise((resolve, reject) => {
             promiseWithData({func: AuthService.registration}, {formData}, {commit})
                .then(data => {
                    commit(types.ADD_AUTH_ALERT, { value: 'Registration was successfull', variant: 'success' })
                    resolve(data)
                })
                .catch(error => {
                    commit(types.ADD_AUTH_ALERT, { value: error.response.data.message, variant: 'danger' })
                    reject(error)
                })

        })
    },
    login({ commit }, { user }) {
        commit(types.SET_SPINNER, { value: true })
        return new Promise((resolve, reject) => {
            promiseWithData({func:AuthService.login}, {formData: user}, {commit})
                .then(response => {
                    console.log("SUCCESSFULLY LOGIN_____");
                    console.log(response);
                    if (response.data.accessToken) {
                        localStorage.setItem('user', JSON.stringify(response.data));
                    }
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                })
        })
    },
    getCurrentUser({ commit }) {
          commit(types.SET_SPINNER, { value: true })
          return promise({func: AuthService.getCurrentUser}, {commit});

    },
    logout({commit}){
        commit(types.SET_SPINNER, { value: true })
        promise({func:AuthService.logout}, {commit})
            .then(response => {
                localStorage.removeItem('user')
                return response;
            })
            .catch(data => {
                return data;
            });          

    },
    editUser({commit}, {user}){
        commit(types.SET_SPINNER, { value: true })
        return promiseWithData({func: AuthService.editProfile},{formData: user}, {commit});
    }
}
  
const mutations = {
    [types.SET_SPINNER](state, { value }) {
        state.spinner = value
    },
    [types.ADD_AUTH_ALERT](state, message) {
        state.authAlerts.push(message)
        console.log(state.authAlerts)
    },
    [types.SET_TOKEN](state, {value}){
        state.refreshToken= value.refreshToken;
        state.accesstoken = value.accesstoken;
        this.$cookies.set('refreshToken', value.refreshToken, '1d');
        this.$cookies.set('accesstoken', value.accesstoken, '2min');
    },
    [types.REMOVE_TOKEN](state){
        state.refreshToken = null;
        state.accesstoken = null;
        this.$cookies.remove('refreshToken');
        this.$cookies.remove('accesstoken');
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
