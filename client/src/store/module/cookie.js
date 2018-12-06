import Cookie from 'vue-cookies'

const setCookie =(context,token, time)=>{
    context.$cookies.set(name, token, time);
}

const removeCookie = (context, name)=>{
    context.$cookies.remove(name);
}

