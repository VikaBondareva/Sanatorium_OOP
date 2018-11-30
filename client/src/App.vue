<template>
    <div class="main">
        <navbar></navbar>
        <div class="main__container">
           <div class="container__cover">
               <router-view></router-view>
           </div>
        </div>
        <div class="main__footer">
            <footer-san></footer-san>
        </div>
        <vue-element-loading :active="spinner" :is-full-screen="true"/>
    </div>
</template>

<script>
    import { mapGetters } from "vuex"
    import Footer from "./components/layout/Footer.vue"
    import VueElementLoading from "vue-element-loading"
    import Navbar from "./components/layout/Navbar.vue"
    import StartPage from './components/main/StartPage.vue'

    export default {
        components: {
            "vue-element-loading": VueElementLoading,
            Navbar,
            "footer-san":Footer,
            "main-page": StartPage
        },
        computed: {
            ...mapGetters(["spinner"])
        },
    };

</script>

<style >
    div.main {
        width: 85%;
        margin: 30px auto 10px;
    }
    .main__footer{
        height: 150px;
        background: rgba(41, 43, 46, 0.7);
        z-index: 1;
        margin-top: 50px;
    }
    
    .main__container{
        background: #0000009c;
        margin-top: 40px;
        border: 2px solid;
        padding: 30px;
    }
    .container__cover{
        margin-top: 30px !important;
        margin-bottom: 30px !important;
        padding-top: 30px !important;
        padding-bottom: 30px !important;
        padding-left: 50px !important;
        padding-right: 50px !important;
        background-color: rgba(255, 255, 255, 0.81) !important;
    }
    h1,
    h2 {
        font-weight: normal;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }

</style>
