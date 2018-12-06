<template>
 <v-container fluid fill-height>
        <v-layout  justify-center>
          <v-flex xs12>
             <div v-if='showError'>{{error}}</div>
              <v-card-text>
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
                this.login({user: this.user})
                    .then(()=>{
                        this.$emit('closeLogin', false)
                    })
                    .catch((err) => {
                        this.error = err;
                        this.showError = true;
                    })
            }
        }
    }

</script>

<style scoped>
</style>
