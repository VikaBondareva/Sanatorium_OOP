import OrserService from '../../api/order-service'
import * as types from '../mutation'
import {promise, promiseWithData} from '../promise.js'

//import { handleResponse } from '../../helpers/handler.js'
const actions = {
    orderService({commit}, {formData}){
        commit(types.SET_SPINNER, { value: true })
        return promiseWithData({func: OrserService.orderService}, {formData},{commit});
//        return new Promise((resolve, reject) => {
//            OrserService.orderService(formData)
//                .then(response => {
//                    console.log("CURRENT ");
//                    console.log(response);
//                    commit(types.SET_SPINNER, { value: false })
//                    resolve(response);
//                })
//                .catch(error => {
//                    console.log("CATHING ERROR");
//                    handleResponse(error.response)
//                        .then(data => {
//                            OrserService.orderService(formData)
//                                .then(response => {
//                                    commit(types.SET_SPINNER, { value: false })
//                                    resolve(response);
//                                })
//                        })
//                        .catch(data => {
//                            commit(types.SET_SPINNER, { value: false })
//                            reject(data.data.message);
//                        });
//                })
//        })
    },
    registrationCard({commit}, {formData}){
         commit(types.SET_SPINNER, { value: true })
        return promiseWithData({func: OrserService.registrationCard}, {formData},{commit});
//        return new Promise((resolve, reject) => {
//            OrserService.registrationCard(formData)
//                .then(response => {
//                    console.log("CURRENT ");
//                    console.log(response);
//                    commit(types.SET_SPINNER, { value: false })
//                    resolve(response);
//                })
//                .catch(error => {
//                    console.log("CATHING ERROR");
//                    handleResponse(error.response)
//                        .then(data => {
//                            OrserService.registrationCard(formData)
//                                .then(response => {
//                                    commit(types.SET_SPINNER, { value: false })
//                                    resolve(response);
//                                })
//                        })
//                        .catch(data => {
//                            commit(types.SET_SPINNER, { value: false })
//                            reject(data);
//                        });
//                })
//        })
    },
    changeDateOrder({commit}, {formData}){
        commit(types.SET_SPINNER, { value: true })
        return promiseWithData({func: OrserService.changeDateOrder}, {formData},{commit});

//        return new Promise((resolve, reject) => {
//            OrserService.changeDateOrder(formData)
//                .then(response => {
//                    console.log("CURRENT ");
//                    console.log(response);
//                    commit(types.SET_SPINNER, { value: false })
//                    resolve(response);
//                })
//                .catch(error => {
//                    console.log("CATHING ERROR");
//                    handleResponse(error.response)
//                        .then(data => {
//                            OrserService.changeDateOrder(formData)
//                                .then(response => {
//                                    commit(types.SET_SPINNER, { value: false })
//                                    resolve(response);
//                                })
//                        })
//                        .catch(data => {
//                            commit(types.SET_SPINNER, { value: false })
//                            reject(data.data.message);
//                        });
//                })
//        })
    }
}

export default {
    actions,
}
