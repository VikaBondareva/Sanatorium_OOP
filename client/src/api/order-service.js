import Axios from 'axios'
import { authRefreshHeader, authHeader } from '../helpers/headers.js'

export default {
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
    }
}   