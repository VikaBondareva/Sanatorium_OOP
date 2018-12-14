import OrserService from '../../api/order-service'
import * as types from '../mutation'
import {promise, promiseWithData} from '../promise.js'


const actions = {
    getServices({ commit }) {
        commit(types.SET_SPINNER, { value: true })
        return promise({func:OrserService.getServices },{commit});

    },
    getCardsBooking({commit}){
        commit(types.SET_SPINNER, { value: true })
         return promise({func:OrserService.getCards },{commit});

    },
    getOrdersActive({commit}){
        commit(types.SET_SPINNER, { value: true })
        return promise({func:OrserService.getOrdersActive },{commit});

    },
    getOrdersRequest({commit}){
        commit(types.SET_SPINNER, { value: true })
        return promise({func:OrserService.getOrdersRegister },{commit});

    },
    deleteOrderUser({commit}, {id}){
        commit(types.SET_SPINNER, { value: true })
        return promiseWithData({func: OrserService.deleteOrderUser}, {formData: id},{commit});

    },
    addTypeService({type}){
        return promiseWithData({func: OrserService.addTypeService}, {formData: type},{commit});
    },
    addService( {formData}){
        return promiseWithData({func: OrserService.addService}, {formData},{commit});

    },
    changeStatusOrder({commit}, {formData}){
        commit(types.SET_SPINNER, { value: true })
         return promiseWithData({func: OrserService.changeStatusOrder}, {formData},{commit});

    }
}
  
export default {
    actions
}
