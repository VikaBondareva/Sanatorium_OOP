import * as types from './mutation'
import { handleResponse} from '../helpers/handler.js'

function promiseWithData({func}, {formData}, {commit}){
    return new Promise((resolve, reject) => {
            func(formData)
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
                            func(formData)
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

function promise({func}, {commit}){
    return new Promise((resolve, reject) => {
            func()
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
                            func()
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
export {promise, promiseWithData};