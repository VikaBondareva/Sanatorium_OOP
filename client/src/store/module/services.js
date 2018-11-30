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
    getServices({ commit }) {
        commit(types.SET_SPINNER, { value: true })
        return new Promise((resolve, reject) => {
            OrserService.getServices()
                .then(response => {
                    console.log(response);
                    commit(types.SET_SERVICES, {value: response.data})
                    commit(types.SET_SPINNER, { value: false })
                    resolve(response);

                })
                .catch(error => {
                    console.log("ERROR");
                    commit(types.SET_SPINNER, { value: false })
                    reject(data);
                })
        })
    },
    getCardsBooking({commit}){
        commit(types.SET_SPINNER, { value: true })
        return new Promise((resolve, reject) => {
            OrserService.getCards()
                .then(response => {
                    console.log(response);
                    commit(types.SET_SPINNER, { value: false })
                    resolve(response);

                })
                .catch(error => {
                    console.log("ERROR");
                    commit(types.SET_SPINNER, { value: false })
                    reject(data);
                })
        })
    },
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
                            reject(data);
                        });
                })
        })
    },
    deleteOrderUser({commit}, {id}){
        commit(types.SET_SPINNER, { value: true })
        return new Promise((resolve, reject) => {
            OrserService.deleteOrderUser(id)
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
                            OrserService.deleteOrderUser(id)
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
