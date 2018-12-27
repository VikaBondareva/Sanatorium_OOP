<template>
    <v-container fluid fill-height>
        <v-layout justify-center>
            <v-flex xs12>
                <v-card-text>
                    <div v-if='showError' style="color:red;">{{error}}</div>
                    <v-form v-model="valid" ref="form" lazy-validation>
                        <v-text-field prepend-icon="person" clearable :rules="rules.email" required v-model='user.email' label="Email" type="text">
                        </v-text-field>
                        <v-text-field prepend-icon="lock" :rules="rules.password" required v-model='user.password' label="Пароль" type="password">
                        </v-text-field>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn dark class="cyan" @click="sumbit">
                        Войти
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
        props: ['method'],
        data() {
            return {
                valid: false,
                user: {
                    email: '',
                    password: '',
                },
                error: null,
                showError: false,
                emailRegex: /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
                rules: {
                    email: [
                        v => !!v || "Введите Email!",
                        v => this.emailRegex.test(v) || "Введите корректный Email!"
                    ],
                    password: [
                        v => !!v || "Введите пароль!",
                        v => v.length >= 6 || "Пароль должен быть не менее 6 символов!"
                    ]
                }
            }
        },
        methods: {
            ...mapActions(['login']),
            sumbit() {
                this.error = null;
                if (this.$refs.form.validate()) {
                    this.login({user: this.user})
                        .then(() => {
                            this.$router.go(this.$router.path);
//                            this.method();
                        })
                        .catch((err) => {
                            this.error = "Неверной email или пароль";
                            this.showError = true;
                        })
                }
            }
        }
    }

</script>

<style scoped>
</style>
