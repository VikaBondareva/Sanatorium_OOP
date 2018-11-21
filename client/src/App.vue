<template>
    <div class="main">
        <navbar></navbar>
        <router-view></router-view>
        <footer></footer>
    </div>
</template>

<script>
    //import { mapGetters } from "vuex";
    //import VueElementLoading from "vue-element-loading";
    import Navbar from "./components/layout/Navbar.vue";
    import Footer from "./components/layout/Footer.vue";
    import StartPage from './components/main/StarPage.vue'

    export default {
        components: {
            //    "vue-element-loading": VueElementLoading,
            Navbar,
            Footer,
            "main-page": StartPage
        },
        //  computed: {
        //    ...mapGetters(["spinner"])
        //  },
    };

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    div.main {
        height: 100vh;
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
