<template>
    <div class="main__header" color="rgba(70, 68, 68, 0.66)">
        <div class="header__block header__block__first">
            <div class="header__block-center">
                <div class="header__icon" @click='goToMainPage'>
                    <!--                 <v-icon>border_color</v-icon>-->
                    <img src="../../assets/images/592.jpg" style="color: #111;width: 165px; max-width: 165px; height: 122px; max-height: 122px;" />
                </div>
            </div>
        </div>
        <div class="header__block header__block__second">
            <div class=" header__block-center block__text-left">
                Беларусь, Минская обл., Мядельский р-н, Мядельский сельсовет, д.Сосны, д.7
            </div>
        </div>
        <div class="header__block .header__block__third">
            <div class="header__btn">
                <ul class="header__menu">
                    <li class="menu-btn-hover menu__li">
                        <button class="li__link " @click="goToServices">УСЛУГИ</button>
                    </li>
                    <li class="menu-btn-hover menu__li">
                        <button class="li__link" @click="goToAbout">О НАС</button>
                    </li>
                    <li class="menu-btn-hover menu__li">
                        <button class="li__link" @click="goToBooking">БРОНИРОВАНИЕ</button>
                    </li>
                    <li class="menu-btn-hover menu__li">
                        <button class="li__link" @click="goToContacts">КОНТАКТЫ</button>
                    </li>
                    
                    <li class="menu-btn-hover menu__li" v-if='isAdmin'>
                        <b-dropdown text="УПРАВЛЕНИЕ" >
                            <b-dropdown-item @click="serviseRequest">ЗАЯВКИ НА УСЛУГИ</b-dropdown-item>
                            <b-dropdown-item @click="serviseActive">АКТИВНЫЕ ЗАЯВКИ</b-dropdown-item>
                            <b-dropdown-item @click="bookingArrival">КАРТОЧКИ УЧАЩИХСЯ</b-dropdown-item>
<!--
                            <b-dropdown-item>Third Action</b-dropdown-item>
                            <b-dropdown-divider></b-dropdown-divider>
                            <b-dropdown-item>Something else here...</b-dropdown-item>
                            <b-dropdown-item disabled>Disabled action</b-dropdown-item>
-->
                        </b-dropdown>
                    </li>
                    <li class="menu-btn-hover menu__li" v-if='!isAuthenticated'>
                        <button class="li__link" @click="auth" >АВТОРИЗАЦИЯ</button>
                    </li>
                    <li class="menu-btn-hover menu__li" v-else>
                        <b-dropdown text="Профиль" >
                            <b-dropdown-item @click="goToProfile">ПРОФИЛЬ</b-dropdown-item>
                            <b-dropdown-divider></b-dropdown-divider>
                            <b-dropdown-item @click="logoutUser">ВЫХОД</b-dropdown-item>
                        </b-dropdown>
                    </li>
                </ul>
            </div>
        </div>
        <auth v-if='showAuth'></auth>
    </div>
</template>

<script>
    import Auth from '../auth/Auth.vue'
    import {
        mapGetters,
        mapActions
    } from 'vuex'
    export default {
        components: {
            "auth": Auth
        },
        data() {
            return {
                showAuth: false,
//                isAuth: this.$store.getters.isAuthenticated
            }
        },
        watch:{
            isAuth: ()=>{ 
                if(this.$store.getters.isAuthenticated)
                    return true;
                return false;
            } 
        },
        methods: {
            ...mapActions(['logout']),
            auth() {
                this.showAuth = true;
            },
//            isAuthenticated() {
//                return this.$cookies.isKey('user')
//            },
            logoutUser(){
                this.logout();
            },
            goToMainPage() {
                this.$router.push({
                    name: 'home'
                })
            },
            goToServices() {
                this.$router.push({
                    name: 'services'
                })
            },
            goToAbout() {
                this.$router.push({
                    name: 'about'
                })
            },
            goToProfile(){
                this.$router.push({
                    name: 'userPage'
                })
            },
            goToBooking() {
                this.$router.push({
                    name: 'booking'
                })
            },
            goToContacts() {

            },
            bookingArrival(){
                this.$router.push({name: 'cards'})
            },
            serviseRequest(){
                this.$router.push({name: 'ordersRegister'})
            },
            serviseActive(){
                this.$router.push({name: 'ordersActive'})
            },
        },
        computed:{
            ...mapGetters(['isAuthenticated', 'user']),  
            isAdmin(){ 
                if(this.$store.getters.user) {
                     if(this.$store.getters.user.role===1) 
                        return true;
                }
                return false;
            }
        }
    }

</script>

<style scoped>
    .header__block__first {
        width: 250px;
    }

    .header__block__second {
        width: 200px;
    }

    .header__block__third {
        width: 700px;
    }

    .main__header {
        margin: 0 auto;
        display: flex;
        background: #ffffffa6;
    }

    .header__block {
        position: relative;
        z-index: 1;
        float: left;
        padding: 30px 0 30px 0;
    }

    .header__block-center {
        padding: 10px 0;
        text-align: center;
    }

    .text__width-600 {
        font: bold 18px/1.5 Times, 'New Century Schoolbook', sans-serif;
    }

    .block__text-left {
        padding-top: 30px;
        font-size: 13px;
        text-align: left;
    }

    .header__btn {
        padding: 20px 30px;
    }

    .menu__li {
        margin: 0;
        padding-top: 8px !important;
        padding-bottom: 8px !important;
        padding-left: 6px !important;
        padding-right: 6px !important;
        border-width: 1px !important;
        border-style: solid !important;
        border-color: transparent !important;
    }

    .menu-btn-hover {
        font: 17px 'Roboto Condensed', sans-serif;
        font-weight: 700;
    }

    .menu-btn-hover:hover {
        border-width: 1px !important;
        border-style: solid !important;
        border-color: #000000 !important;
        background-color: transparent !important;
    }

    .header__menu {
        list-style: none;
        padding: 0;
    }

    .li__link {
        text-decoration: none;
        color: #111;
    }

</style>
