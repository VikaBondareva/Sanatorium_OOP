<template>
    <v-layout column fill-height style="min-heigth: 1000px;">

        <div class="card" style="padding: 20px!important;">
           <v-layout>
                 <v-flex xs2>
                  <v-btn @click="goToUserPage" outline fab small color="teal">
                   <v-icon>arrow_back</v-icon> 
                </v-btn>
                </v-flex>
                <h4 class="text-center font-weight-bold text-uppercase py-3">Редактирование данных</h4>
           </v-layout>
           <hr>
            <v-flex xs8>
                <v-form v-model='valid' ref='form'>
                     
                    <v-layout row>
                        <v-flex xs5>
                            <v-subheader>Фамилия</v-subheader>
                        </v-flex>
                        <v-flex xs5>
                            <v-text-field v-model="user.surname"></v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs5>
                            <v-subheader>Имя</v-subheader>
                        </v-flex>
                        <v-flex xs5>
                            <v-text-field v-model="user.name"></v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs5>
                            <v-subheader>Отчество</v-subheader>
                        </v-flex>
                        <v-flex xs5>
                            <v-text-field v-model="user.patronymic"></v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs5>
                            <v-subheader>Дата рождения</v-subheader>
                        </v-flex>
                        <v-flex xs5>
                            <v-text-field v-model="user.birth"></v-text-field>
                        </v-flex>
                    </v-layout>
                     <v-layout row>
                        <v-flex xs5>
                            <v-subheader>Email</v-subheader>
                        </v-flex>
                        <v-flex xs5>
                            <v-text-field v-model="user.email"></v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs5>
                            <v-subheader>Адрес проживания</v-subheader>
                        </v-flex>
                        <v-flex xs5>
                            <v-text-field v-model="user.addres"></v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs5>
                            <v-subheader>Телефон</v-subheader>
                        </v-flex>
                        <v-flex xs5>
                            <v-text-field v-model="user.phone"></v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs5>
                            <v-subheader>Пол</v-subheader>
                        </v-flex>
                        <v-flex xs5>
                            <v-text-field v-model="user.genger"></v-text-field>
                        </v-flex>
                    </v-layout>
                    <h4 style="color: blue;" v-if='resultSave'>{{resultSave}}</h4>
                    <v-layout row>
                       
                        <v-flex xs5>
                            <v-btn @click="saveChange" color="rgb(69, 152, 152)">Сохранить изменения</v-btn>
                        </v-flex>
                        
                    </v-layout>
                </v-form>
               
            </v-flex>
        </div>
    </v-layout>
</template>

<script>
    import {
        mapActions
    } from 'vuex'
    export default {
        data() {
            return {
                editDate: false,
                user: '',
                valid: false,
                resultSave: '',
                successResult: 'Изменения сохранены',
                dangerResult: 'Не удалось сохранить. Попробуйте еще раз.'
            }
        },
        methods: {
            ...mapActions(['getCurrentUser', 'editUser']),
            getUser() {
                this.getCurrentUser()
                    .then(response => {
                        this.user = response.data;
                    })
            },
            saveChange() {
                this.resultSave = null;
                if (this.$refs.form.validate()){
                    this.editUser({user: this.user})
                        .then(()=>{
                            this.resultSave = this.successResult;
                        })
                        .catch(()=>{
                            this.resultSave = this.dangerResult;
                        })
                }
            },
            goToUserPage(){
                this.$router.push({
                    name: 'userPage'
                })
            }
        },
        created() {
            this.getUser();
        },
        filters: {
            dateFilter(item) {
                var date = new Date(item);
                var monthNames = [
                    "Января", "Февраля", "Марта",
                    "Апреля", "Мая", "Июня", "Июля",
                    "Августа", "Сентября", "Октября",
                    "Ноября", "Декабря"
                    ];
                var day = date.getDate();
                var monthIndex = date.getMonth();
                var year = date.getFullYear();
        
                return day + ' ' + monthNames[monthIndex] + ', ' + year;
            }
        }
    }

</script>

<style scoped>
    .user-information {
        margin-top: 20px;
        margin-bottom: 20px;
        padding: 20px;
        height: 200px;
        /*        border: 1px solid;*/
    }

    .information {
        margin: 20px;

    }

    .information__title {
        margin-bottom: 20px;
        font-size: 20px;
    }

    .information__field {
        font-size: 15px;
    }

</style>
