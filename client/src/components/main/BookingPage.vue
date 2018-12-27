<template>
    <v-container fluid fill-height>
        <v-layout justify-center>


            <v-flex xs10>
                <div v-if="result!==''">  
                    <h3 v-if="result.success">{{result.message}}</h3>
                    <h3 v-if="!result.success" style="color: red;">{{result.message}}</h3>
                </div>
                <div class="card" style="padding: 10px!important;">
                    <v-layout row>
                        <v-text-field v-model="user.name" label="Имя" readonly required>
                        </v-text-field>
                        <v-text-field v-model="user.surname" label="Фамилия" readonly required>
                        </v-text-field>
                        <v-text-field v-model="user.patronymic" label="Отчество" readonly required>
                        </v-text-field>
                    </v-layout>
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <v-layout row>
                            <v-text-field v-model="user.phone" mask="+### (##) ###-##-##" label="Телефон"  type="text" readonly required>
                            </v-text-field>
                             <v-text-field v-model="user.birth.toString().substr(0,10)" label="Дата рождения"  type="text" readonly required>
                            </v-text-field>
                        </v-layout>
                        <v-layout row>
                            <!--                        <v-text-field v-model="card.dateArrival" @click="showDatePicker('arrival')" @arrival="setDateArrival" label="Дата заезда" slot="activator" prepend-icon="event" readonly :rules="rules.dateArrival" required>-->
                            <!--                        </v-text-field>-->
                            <v-menu ref="menu1" :close-on-content-click="false" v-model="menu1" :return-value.sync="card.dateArrival">
                                <v-text-field slot="activator" required  :rules="rules.dateArrival" v-model="card.dateArrival" label="Дата заезда" prepend-icon="event" readonly></v-text-field>
                                <v-date-picker id="service_datepiker" v-model="card.dateArrival" :min="new Date().toISOString().substr(0, 10)" no-title>
                                    <v-spacer></v-spacer>
                                    <v-btn flat color="primary" @click="menu1 = false">Cancel</v-btn>
                                    <v-btn flat color="primary" @click="$refs.menu1.save(card.dateArrival)">OK</v-btn>
                                </v-date-picker>
                            </v-menu>

                            <v-menu ref="menu2" :close-on-content-click="false" v-model="menu2" :return-value.sync="card.dateDeparture">
                                <v-text-field slot="activator" :rules="rules.dateDeparture" required v-model="card.dateDeparture" label="Дата отьезда" prepend-icon="event" readonly></v-text-field>
                                <v-date-picker id="service_datepiker" v-model="card.dateDeparture" :min="card.dateArrival || new Date().toISOString().substr(0, 10)" no-title>
                                    <v-spacer></v-spacer>
                                    <v-btn flat color="primary" @click="menu2 = false">Cancel</v-btn>
                                    <v-btn flat color="primary" @click="$refs.menu2.save(card.dateDeparture)">OK</v-btn>
                                </v-date-picker>
                            </v-menu>
                        </v-layout>
                        <v-checkbox v-model="checkbox" checked="false" :rules="[v => !!v || 'You must agree to continue!']" label="Do you agree?" required></v-checkbox>

                        <v-btn :disabled="!valid" @click="submit">
                            Зарегестрироваться
                        </v-btn>
<!--                        <v-btn @click="clear">Очистить все поля</v-btn>-->
                    </v-form>
                </div>
            </v-flex>

            <date-picker v-if="modal" :item="dateItem"></date-picker>

        </v-layout>
    </v-container>

</template>

<script>
    import {
        mapActions,
        mapGetters
    } from 'vuex'
    //    import datePicker from '../dialogs/datePicker.vue'
    export default {
        //        components: {
        //            datePicker
        //        },
        data() {
            return {
                card: {
                    dateArrival: '',
                    dateDeparture: ''
                },
                user:"",
                date: null,
                menu: false,
                menu1: false,
                menu2: false,
                modal: false,
                error: "Вы уже забронированили",
                success: "Заявка отправлена",
                result:{
                    message: '',
                    succes:''
                },
                showPassword: false,
                repeatPassword: "",
                valid: false,
                dateItem: '',
                checkbox: '',
                emailRegex: /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
                rules: {
                    name: [v => !!v || "Введите имя!"],
                    surname: [v => !!v || "Введите фамилию!"],
                    patronymic: [v => !!v || "Введите отчество!"],
                    birth: [v => !!v || "Выберите дату рождения!"],
                    phone: [v => !!v || "Введите телефон!"],
                    addres: [v => !!v || "Введите аддресс проживания!"],
                    dateArrival: [v => !!v || "Выберите дату заезда!"],
                    dateDeparture: [v => !!v || "Выберите дату отьезда!"]
                },
            }
        },
        watch: {
            menu(val) {
                val && this.$nextTick(() => (this.$refs.picker.activePicker = 'YEAR'))
            }
        },
        methods: {
            ...mapActions(['registrationCard', 'getCurrentUser']),
            showDatePicker(item) {
                this.dateItem = item;
                this.modal = true;
            },
            getUser() {
                this.getCurrentUser()
                    .then((response)=>{
                        this.user = response.data;
                    })
            },
            save(date) {
                this.$refs.menu.save(date)
            },
            clear() {
                this.$refs.form.reset();
            },
            setDateArrival(date) {
                this.card.dateArrival = date;
            },
            setDateDeparture(date) {
                this.card.dateDeparture = date;
            },
            submit() {
                this.result.message="";
                 this.result.success="";
                if (this.$refs.form.validate()) {
                    this.registrationCard({formData: this.card})
                        .then(()=>{
                            this.result.message = this.success;
                            this.result.succes= true;
                        })
                        .catch(()=>{
                            this.result.message = this.error;
                            this.result.succes= false;
                        })
                    
                }
            }
        },
        created() {
            this.getUser();
        }
    }

</script>

<style scoped>
    .v-menu__content {
        top: 60px !important;
        left: 0 !important;

    }

    .v-text-field {
        margin: 10px !important;
    }

</style>
