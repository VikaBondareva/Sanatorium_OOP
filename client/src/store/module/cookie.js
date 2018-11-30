import Cookie from 'vue-cookies'

const state = {
    user: Cookie.get('user'),
    token: Cookie.get('token')
}

const mutations = {
    [types.SET_TOKEN](state, {value}){
        state.user= value.user;
        state.token = value.token;
        Cookie.set('user', value.user, '20min');
        Cookie.set('token', value.token, '20min');
    },
    [types.REMOVE_TOKEN](state){
        state.user = null;
        state.token = null;
        Cookie.remove('user');
        Cookie.remove('token');
    }
}