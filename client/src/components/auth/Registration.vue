<template>
   <v-container fluid>
        <v-layout row xs6>
        <v-flex xs6 xs3>
                <form name="tab-tracker-form" v-model="valid" ref="form" autocomplete="off">
                   <v-text-field v-model="user.name"
                                label="Имя"
                                :counter="25"
                                :rules="rules.name"
                                clearable
                                required>
                  </v-text-field>
                  <v-text-field v-model="user.surname"
                                label="Фамилия"
                                :counter="25"
                                :rules="rules.surname"
                                clearable
                                required>
                  </v-text-field>
                  <v-text-field v-model="user.patronymic"
                                label="Отчество"
                                :counter="25"
                                :rules="rules.patronymic"
                                clearable
                                required>
                  </v-text-field>
                    <v-text-field v-model="user.email"
                              label="Email"
                              :counter="30"
                              :rules="rules.email"
                              type="email"
                              clearable
                              required>
                     </v-text-field>
                    <br>
                    <v-text-field 
                        label="Пароль"
                        :counter="30"
                        :rules="rules.password"
                        :type="showPassword ? 'text' : 'password'"
                        autocomplete="new-password"></v-text-field>
                     <v-text-field
                        label="Подтвердите пароль"
                        :counter="30"
                        :type="showPassword ? 'text' : 'password'"
                        v-model="user.repeatPassword" 
                        autocomplete="new-password"
                        :rules="rules.repeatPassword"
                        :append-icon="showPassword ? 'visibility_off' : 'visibility'"
                        @click:append="showPassword = !showPassword"
                    ></v-text-field>
                </form>
                <br>
                <div class="danger-alert" v-html="error" />
                <br>
                <v-btn dark class="cyan" @click="register">
                    Register
                </v-btn>
        </v-flex>
    </v-layout>
   </v-container>
   
</template>

<script>
    import AuthService from '@/services/AuthService'
    export default {
        data() {
            return {
               user:{
                    name: '',
                    surname: '',
                    patronymic: '',
                    email: '',
                    password: '',
                }, 
                error: null,
                showPassword: false,
                repeatPassword: "",
                emailRegex: /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
                rules: {
                    name: [v => !!v || "Введите имя!"],
                    surname: [v => !!v || "Введите фамилию!"],
                    nickname: [v => !!v || "Введите имя пользователя!"],
                    email: [
                      v => !!v || "Введите Email!",
                      v => this.emailRegex.test(v) || "Введите корректный Email!"
                    ],
                    password: [
                      v => !!v || "Введите пароль!",
                      v => v.length >= 6 || "Пароль должен быть не менее 6 символов!"
                    ],
                    repeatPassword: [
                      v => !!v || "Подтвердите пароль!",
                      v => v === this.newUser.password || "Пароли не совпадают!"
                    ]
                },  
            }
        },
        methods: {
            async register() {
                if (this.$refs.form.validate()) {
                   try {
                        const response = await AuthService.register({
                            email: this.user.email,
                            password: this.user.password,
                            name: this.user.name,
                            surname: this.user.surname,
                            patronymic : this.user.patronymic
                        })
                        console.log(response)
    //                    this.$store.dispatch('setToken', response.data.token)
    //                    this.$store.dispatch('setUser', response.data.user)
    //                    this.$router.push({
    //                        name: 'songs'
    //                    })
                    } catch (error) {
                        this.error = error.response.data.error
                        console.log(error)
                    }
                }  
            }
        }
    }

</script>

<style scoped>
.v-text-field {
  margin: 10px !important;
}
</style>