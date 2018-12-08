import OrserService from '../../api/order-service'
import * as types from '../mutation'
import { handleResponse } from '../../helpers/handler.js'

const state = {
    services: [],
}

const getters = {
    services: state => state.services
}

const actions = {
    orderService({commit}, {formData}){
        commit(types.SET_SPINNER, { value: true })
        return new Promise((resolve, reject) => {
            OrserService.orderService(formData)
                .then(response => {
                    console.log("CURRENT ");
                    console.log(response);
                    commit(types.SET_SPINNER, { value: false })
                    resolve(response);
                })
                .catch(error => {
                    console.log("CATHING ERROR");
                    handleResponse(error.response)
                        .then(data => {
                            OrserService.orderService(formData)
                                .then(response => {
                                    commit(types.SET_SPINNER, { value: false })
                                    resolve(response);
                                })
                        })
                        .catch(data => {
                            commit(types.SET_SPINNER, { value: false })
                            reject(data.data.message);
                        });
                })
        })
    },
    registrationCard({commit}, {formData}){
         commit(types.SET_SPINNER, { value: true })
        return new Promise((resolve, reject) => {
            OrserService.registrationCard(formData)
                .then(response => {
                    console.log("CURRENT ");
                    console.log(response);
                    commit(types.SET_SPINNER, { value: false })
                    resolve(response);
                })
                .catch(error => {
                    console.log("CATHING ERROR");
                    handleResponse(error.response)
                        .then(data => {
                            OrserService.registrationCard(formData)
                                .then(response => {
                                    commit(types.SET_SPINNER, { value: false })
                                    resolve(response);
                                })
                        })
                        .catch(data => {
                            commit(types.SET_SPINNER, { value: false })
                            reject(data);
                        });
                })
        })
    },
    changeDateOrder({commit}, {formData}){
        commit(types.SET_SPINNER, { value: true })
        return new Promise((resolve, reject) => {
            OrserService.changeDateOrder(formData)
                .then(response => {
                    console.log("CURRENT ");
                    console.log(response);
                    commit(types.SET_SPINNER, { value: false })
                    resolve(response);
                })
                .catch(error => {
                    console.log("CATHING ERROR");
                    handleResponse(error.response)
                        .then(data => {
                            OrserService.changeDateOrder(formData)
                                .then(response => {
                                    commit(types.SET_SPINNER, { value: false })
                                    resolve(response);
                                })
                        })
                        .catch(data => {
                            commit(types.SET_SPINNER, { value: false })
                            reject(data.data.message);
                        });
                })
        })
    }
}


  
const mutations = {
    [types.SET_SERVICES](state, value) {
        state.services= value
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
