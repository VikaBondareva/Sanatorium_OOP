import AuthService from '../../api/auth-service'
import * as types from '../mutation'
import { handleResponse} from '../../helpers/handler.js'
//import Cookie from 'vue-cookies'

const state = {
    spinner: false,
    authAlerts: [],
    user:'',
    authenticated: false
//    refreshToken: Cookie.get('refreshToken'),
//    accesstoken: Cookie.get('token')
}
    
const getters = {
    spinner: state => state.spinner,
    authAlerts: state => state.authAlerts,
    user: state=> state.user,
    isAuthenticated: state => !!state.authenticated,
}

const actions = {
    registration({ commit }, { formData }) {
        commit(types.SET_SPINNER, { value: true })
        AuthService.registration(formData)
            .then(data => {
                commit(types.SET_SPINNER, { value: false })
                commit(types.ADD_AUTH_ALERT, { value: 'Registration was successfull', variant: 'success' })
                return data
            })
            .catch(error => {
                commit(types.SET_SPINNER, { value: false })
                commit(types.ADD_AUTH_ALERT, { value: error.response.data.message, variant: 'danger' })
                console.log(error)
            })
    },
    login({ commit }, { user }) {
        commit(types.SET_SPINNER, { value: true })
        return new Promise((resolve, reject) => {
            AuthService.login(user)
                .then(response => {
                    console.log("SUCCESSFULLY LOGIN_____");
                    console.log(response);
                    if (response.data.accessToken) {
                       
//                        commit(types.SET_TOKEN,response.data );
                        commit(types.SET_AUTHENTICATED, {value:true});
                        localStorage.setItem('user', JSON.stringify(response.data));
                    }
                    commit(types.SET_SPINNER, { value: false })
                    resolve(response);
                })
                .catch(error => {
                    commit(types.SET_SPINNER, { value: false })
                    reject(data);
                })
        })
    },
    getCurrentUser({ commit }) {
        commit(types.SET_SPINNER, { value: true })
        return new Promise((resolve, reject) => {
            AuthService.getCurrentUser()
                .then(response => {
                    console.log("CURRENT ");
                    console.log(response);
                    commit(types.SET_USER, {value: response.data});
                    commit(types.SET_SPINNER, { value: false })
                    resolve(response);

                })
                .catch(error => {
                    console.log("CATHING ERROR");
                    handleResponse(error.response)
                        .then(data => {
                            AuthService.getCurrentUser()
                                .then(response => {
                                    commit(types.SET_USER, {value: response.data});
                                    resolve(response);
                                })
                            commit(types.SET_SPINNER, { value: false })
                        })
                        .catch(data => {
                            reject(data);
                            commit(types.SET_SPINNER, { value: false })
                        });
                })
        })
    },
    logout({commit}){
        commit(types.SET_SPINNER, { value: true })
            AuthService.logout()
                .then(response => {
                    console.log("CURRENT ");
                    console.log(response);
                    localStorage.removeItem('user')
//                    commit(types.REMOVE_TOKEN);
                    commit(types.SET_SPINNER, { value: false })
                    return response;

                })
                .catch(error => {
                    console.log("CATHING ERROR");
                    handleResponse(error.response)
                        .then(data => {
                            AuthService.logout()
                                .then(response => {
//                                    commit(types.REMOVE_TOKEN); localStorage.removeItem('user')
                                     return response;
                                })
                            commit(types.SET_SPINNER, { value: false })
                        })
                        .catch(data => {
                            return data;
                            commit(types.SET_SPINNER, { value: false })
                        });
                })
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
    [types.SET_AUTHENTICATED](state, {value}){
        state.authenticated = value
    },
//    [types.SET_USER](state, {value}){
//        state.user = value;
//    },
//         [types.SET_TOKEN](state, {value}){
//        state.refreshToken= value.refreshToken;
//        state.accesstoken = value.accesstoken;
//        Cookie.set('refreshToken', value.refreshToken, '20min');
//        Cookie.set('accesstoken', value.accesstoken, '20min');
//    },
//    [types.REMOVE_TOKEN](state){
//        state.refreshToken = null;
//        state.accesstoken = null;
//        Cookie.remove('refreshToken');
//        Cookie.remove('accesstoken');
//    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
