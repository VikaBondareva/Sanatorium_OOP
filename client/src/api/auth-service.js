import Axios from 'axios'
import { authRefreshHeader, authHeader } from '../helpers/headers.js'

export default {
    registration(formData) {
        return Axios.request({
            method: 'POST',
            url: 'api/auth/register',
            data: formData
        })
    },
    login(formData) {
        return Axios.request({
            method: 'POST',
            url: 'api/auth/login',
            data: formData
        })
    },
    refreshToken() {
        return Axios.request({
            method: 'POST',
            url: '/api/auth/refresh-token',
            headers: authRefreshHeader()
        })
    },
    getCurrentUser() {
        return Axios.request({
            method: 'GET',
            url: '/api/users/current',
            headers: authHeader()
        })
    },
    logout(){
        return Axios.request({
            method: 'POST',
            url: '/api/auth/logout',
            headers: authHeader()
        })
    },
    editProfile(user){
         return Axios.request({
            method: 'PUT',
            url: '/api/users/',
            data: user,
            headers: authHeader()
        })
    },
    cancelBookingCard(){
        return Axios.request({
            method: 'DELETE',
            url: '/api/users/cards',
            headers: authHeader()
        })
    }
}   