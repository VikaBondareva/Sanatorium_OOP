import Axios from 'axios'
import { authHeader } from '../helpers/headers.js'

export default {
    getCards(){
        return Axios.request({
            method: 'GET',
            url: '/api/cards',
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