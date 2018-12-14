<template>
 <v-container fluid fill-height>
        <v-layout  justify-center>
          <v-flex xs12>
              <v-card-text>
                <div v-if='showError' style="color:red;">{{error}}</div>
                <v-form>
                  <v-text-field prepend-icon="person" v-model='user.email' label="Email" type="text"></v-text-field>
                  <v-text-field prepend-icon="lock" v-model='user.password' label="Пароль" type="password"></v-text-field>
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
        props:['method'],
        data() {
            return {
                user: {
                    email: '',
                    password: '',
                },
                error: null,
                showError: false
            }
        },
        methods: {
            ...mapActions(['login']),
            sumbit() {
                this.error = null;
                this.login({user: this.user})
                    .then(()=>{
                        this.$router.go();
                        this.method();
                    })
                    .catch((err) => {
                        this.error = "Неверной email или пароль";
                        this.showError = true;
                    })
            }
        }
    }

</script>

<style scoped>
</style>
