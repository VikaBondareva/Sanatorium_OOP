import Axios from 'axios'
import { authRefreshHeader, authHeader } from '../helpers/headers.js'

export default {
    changeDateOrder(formData){
        return Axios.request({
            method: 'PUT',
            url: '/api/user/orders/'+formData.id,
            data: formData,
            headers: authHeader()
        })
    },
    getServices() {
        return Axios.request({
            method: 'GET',
            url: '/api/services'
        })
    },
    getCards(){
        return Axios.request({
            method: 'GET',
            url: '/api/cards',
            headers: authHeader()
        })
    },
    orderService(order){
        return Axios.request({
            method: 'POST',
            url: '/api/user/orders',
            data: order,
            headers: authHeader()
        })
    },
    deleteOrderUser(id){
        return Axios.request({
            method: 'DELETE',
            url: '/api/user/orders/'+id,
            headers: authHeader()
        })
    },
    registrationCard(formData){
         return Axios.request({
            method: 'POST',
            url: '/api/user/cards',
            data: formData,
            headers: authHeader()
        })
    },
    addTypeService(name){
        return Axios.request({
            method: 'POST',
            url: '/api/services/types',
            data: name,
            headers: authHeader()
        })
    },
    addService(service){
        return Axios.request({
            method: 'POST',
            url: '/api/services',
            data: service,
            headers: authHeader()
        })
    },
    getOrdersRegister(){
        return Axios.request({
            method: 'GET',
            url: '/api/orders/register',
            headers: authHeader()
        })
    },
    getOrdersActive(){
         return Axios.request({
            method: 'GET',
            url: '/api/orders/active',
            headers: authHeader()
        })
    },
    changeStatusOrder(formData){
        return Axios.request({
            method: 'PUT',
            url: '/api/orders/'+formData.id,
            data: formData.statusId,
            headers: authHeader()
        })
    }
}   