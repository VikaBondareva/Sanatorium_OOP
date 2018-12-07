import OrserService from '../../api/order-service'
import * as types from '../mutation'
import { handleResponse } from '../../helpers/handler.js'

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
                    console.log("CATHING ERROR");
                    handleResponse(error.response)
                        .then(data => {
                             OrserService.getCards()
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
    getOrdersActive({commit}){
        commit(types.SET_SPINNER, { value: true })
        return new Promise((resolve, reject) => {
            OrserService.getOrdersActive()
                .then(response => {
                    console.log(response);
                    commit(types.SET_SPINNER, { value: false })
                    resolve(response);

                })
                .catch(error => {
                    console.log("CATHING ERROR");
                    handleResponse(error.response)
                        .then(data => {
                             OrserService.getOrdersActive()
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
    getOrdersRequest({commit}){
        commit(types.SET_SPINNER, { value: true })
        return new Promise((resolve, reject) => {
            OrserService.getAllOrders()
                .then(response => {
                    console.log(response);
                    commit(types.SET_SPINNER, { value: false })
                    resolve(response);

                })
                .catch(error => {
                    console.log("CATHING ERROR");
                    handleResponse(error.response)
                        .then(data => {
                             OrserService.getAllOrders()
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
    addTypeService({type}){
        return new Promise((resolve, reject) => {
            OrserService.addTypeService(type)
                .then(response => {
                    console.log(response);
                    resolve(response);
                })
                .catch(error => {
                    console.log("CATHING ERROR");
                    handleResponse(error.response)
                        .then(data => {
                             OrserService.addTypeService(type)
                                .then(response => {
                                    resolve(response);
                                })
                        })
                        .catch(data => {
                            reject(data);
                        });
                })
        })
    },
    addService( {formData}){
        return new Promise((resolve, reject) => {
            OrserService.addService(formData)
                .then(response => {
                    console.log(response);
                    resolve(response);
                })
                .catch(error => {
                    console.log("CATHING ERROR");
                    handleResponse(error.response)
                        .then(data => {
                             OrserService.addService(formData)
                                .then(response => {
                                    resolve(response);
                                })
                        })
                        .catch(data => {
                            reject(data);
                        });
                })
        })
    },
    changeStatusOrder({commit}, {formData}){
        commit(types.SET_SPINNER, { value: true })
        return new Promise((resolve, reject) => {
            OrserService.changeStatusOrder(formData)
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
                            OrserService.changeStatusOrder(formData)
                                .then(response => {
                                    console.log(response);
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
  
export default {
    actions
}
