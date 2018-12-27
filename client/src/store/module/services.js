import OrserService from '../../api/order-service'
import ScheduleService from '../../api/schedule-service'
import * as types from '../mutation'
import {promise, promiseWithData} from '../promise.js'

const actions = {
    orderService({commit}, {formData}){
        commit(types.SET_SPINNER, { value: true })
        return promiseWithData({func: OrserService.orderService}, {formData},{commit});

    },
    registrationCard({commit}, {formData}){
        commit(types.SET_SPINNER, { value: true })
        return promiseWithData({func: OrserService.registrationCard}, {formData},{commit});

    },
    changeDateOrder({commit}, {formData}){
        commit(types.SET_SPINNER, { value: true })
        return promiseWithData({func: OrserService.changeDateOrder}, {formData},{commit});
    },
    getSchedules({commit}){
        commit(types.SET_SPINNER, { value: true })
        return promise({func: ScheduleService.getSchedules},{commit});
    }
}

export default {
    actions
}
