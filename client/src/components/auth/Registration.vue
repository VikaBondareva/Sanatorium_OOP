<template>
    <v-container fluid fill-height>
        <v-layout justify-center>
            <v-flex>
                <v-card-text>
                    <form name="tab-tracker-form" v-model="valid" ref="form" lazy-validation>
                        <v-text-field v-model="user.name" label="Имя" :counter="25" :rules="rules.name" clearable required>
                        </v-text-field>
                        <v-text-field v-model="user.surname" label="Фамилия" :counter="25" :rules="rules.surname" clearable required>
                        </v-text-field>
                        <v-text-field v-model="user.patronymic" label="Отчество" :counter="25" :rules="rules.patronymic" clearable required>
                        </v-text-field>
                        <v-text-field v-model="user.email" label="Email" :counter="30" :rules="rules.email" type="email" clearable required>
                        </v-text-field>
                        <br>
                        <v-layout row>
                            <v-text-field label="Пароль" :counter="30" v-model="user.password" :rules="rules.password" :type="showPassword ? 'text' : 'password'" autocomplete="new-password"></v-text-field>
                            <v-text-field label="Подтвердите пароль" :counter="30" :type="showPassword ? 'text' : 'password'" v-model="repeatPassword" autocomplete="new-password" :rules="rules.repeatPassword" :append-icon="showPassword ? 'visibility_off' : 'visibility'" @click:append="showPassword = !showPassword"></v-text-field>
                        </v-layout>
                    </form>
                </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn dark class="cyan" @click="sumbit">
                            Регистрация
                        </v-btn>
                    </v-card-actions>
            </v-flex>
        </v-layout>
    </v-container>

</template>

<script>
    import {
        mapActions
    } from 'vuex'
    export default {
        data() {
            return {
                user: {
                    name: '',
                    surname: '',
                    patronymic: '',
                    email: '',
                    password: '',
                },
                error: null,
                showPassword: false,
                repeatPassword: "",
                valid: false,
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
                        v => v === this.user.password || "Пароли не совпадают!"
                    ]
                },
            }
        },
        methods: {
            ...mapActions(['registration']),
            sumbit() {
//                if (this.$refs.form.validate()) {
                    this.registration({formData: this.user})
                        .then(()=>{
                            this.$emit('closeRegister', false)
                        })
//                }
            }
        } 
    }

</script>

<style scoped>
    .v-text-field {
        margin: 10px !important;
    }

</style>
