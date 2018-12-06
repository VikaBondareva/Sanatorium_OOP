import AuthService from '../api/auth-service'
//import Cookie from 'vue-cookies'

export function handleResponse(response) {
    return new Promise(function (resolve, reject) {
        console.log("RESPONSE ERROR HANDLING")
        console.log(response);
        if (response.status === 401) {
            AuthService.refreshToken()
                .then(response => {
                    console.log("SUCCESSFULLY REFRESH TOKEN");
                    if (response.data.accessToken) {
//                        Cookie.set('user',JSON.stringify(response.data));
                        localStorage.setItem('user', JSON.stringify(response.data));
                    }
                    resolve("OK");
                })
                .catch(error => {
                    console.log("ERROR REFRESH TOKEN");
                    console.log(error);
                    return reject("ERROR");
                })
        } else {
            reject(response);
        }
    })
}


