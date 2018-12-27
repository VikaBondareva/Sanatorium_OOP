import Axios from 'axios'
import { authHeader } from '../helpers/headers.js'

export default {
    getSchedules() {
        return Axios.request({
            method: 'GET',
            url: '/api/schedules',
            headers: authHeader()
        })
    }
}   