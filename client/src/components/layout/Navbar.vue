<template>

  <v-toolbar dark color="primary">
        <v-toolbar-title class="white--text">Санаториум</v-toolbar-title>
        <v-spacer></v-spacer>
        <template v-if="isAuthenticated">
            <v-btn :small="true" @click="goToLoginPage">Войти</v-btn>
            <v-btn :small="true" @click="goToRegistrationPage">Регистрация</v-btn>

        </template>
          <template v-else >
               <v-btn :small="true" @click="goToUserPage">Профиль</v-btn>
               <v-btn :small="true" @click="exid">Выход</v-btn>-->
            </template>
    </v-toolbar>
</template>

<script>
    export default {
        methods: {
            goToUserPage() {
                        this.$router.push({
                            name: 'userProfile',
                        });
            },
            isAuthenticated() {
                return this.$cookies.isKey('Authentication')
            },
            goToRegistrationPage() {
                this.$router.push({
                    name: 'registration'
                })
            },
            goToLoginPage() {
                this.$router.push({
                    name: 'login'
                })
            }
        }
    }

</script>
