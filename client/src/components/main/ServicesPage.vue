<template>
    <v-container fluid>
        <v-layout>
            <v-flex>
                <v-layout>
                    <div>Платные услуги</div>
                </v-layout>
                <v-layout>
                    <div>
                        <table class="table table-hover table-bordered">
                            <thead class="table__head">
                                <tr>
                                    <th scope="col">№</th>
                                    <th scope="col">Наименование платной медицинской услуги</th>
                                    <th scope="col">Еденица измерения</th>
                                    <th scope="col">Цены, бел. руб</th>
                                </tr>
                            </thead>
                            <tbody class="services__body" v-for="(type, index) in types">
                                <tr>
                                    <td colspan='4' class="text-center text-uppercase bg-info text-white">{{type.name}}</td>
                                </tr>
                                <tr v-for="(item,index) in type.services">
                                    <td scope="row">{{index+1}}</td>
                                    <td>{{item.name}}</td>
                                    <td>{{item.measure}}</td>
                                    <td>{{item.price | number}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <v-flex xs4 v-if='user.role == 2'>
                        <div class="order">
                            <div class="order__title">
                                <h3>Запись на прием</h3>
                            </div>
                            <div class="order__form">
                                <div>
                                    <div class="form-group">
                                        <label for="inputType">Выберите тип услуги</label>
                                        <select v-model="typeSelect" ref="inputType" class="form-control">
                                            <option v-for="type in types" v-bind:value="type._id">{{type.name}}</option>
                                        </select>
                                    </div>
                                    <div class="form-group" v-if="typeSelect">
                                        <label for="inputService">Выберите услугу</label>
                                        <select v-model="making.service_id" ref="inputService" class="form-control">
                                            <option v-for="service in getServicesType" v-bind:value="service.id">{{service.name}} - {{service.price}} бел. руб</option>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <v-menu ref="menu" :close-on-content-click="false" v-model="menu" :return-value.sync="date">
                                            <v-text-field slot="activator" v-model="date" label="Дата приема" prepend-icon="event" readonly></v-text-field>
                                            <v-date-picker id="service_datepiker" v-model="date" no-title :min="new Date().toISOString().substr(0, 10)">
                                                <v-spacer></v-spacer>
                                                <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
                                                <v-btn flat color="primary" @click="$refs.menu.save(date)">OK</v-btn>
                                            </v-date-picker>
                                        </v-menu>
                                    </div>
<!--
                                    <div class="form-group">
                                        <v-menu ref="menu2" :close-on-content-click="false" v-model="menu2" :return-value.sync="time">
                                            <v-text-field slot="activator" v-model="time" label="Время приема" prepend-icon="event" readonly></v-text-field>
                                            <v-time-picker v-model="time" :allowed-hours="allowedHours" :allowed-minutes="allowedMinutes" class="mt-3" format="24hr" scrollable min="9:30" max="19:00">
                                                <v-spacer></v-spacer>
                                                <v-btn flat color="primary" @click="menu2 = false">Cancel</v-btn>
                                                <v-btn flat color="primary" @click="$refs.menu2.save(time)">OK</v-btn>
                                            </v-time-picker>
                                        </v-menu>
                                    </div>
-->
                                    <v-btn @click="order">Записаться на прием</v-btn>
                                </div>
                                <div v-if="error" style=" margin-top: 20px; margin-left: 20px;">
                                    <span style="color:#f34;">{{error}}</span>
                                    <router-link to="/booking" v-if="error==errorCard">Зарегестрировать карточку</router-link>
                                </div>
                            </div>
                        </div>
                    </v-flex>
                    
                    <v-flex xs4 v-if='user.role == 1'>
                        <div class="order">
                            <div class="order__title">
                                <h3>Добавления услуг</h3>
                            </div>
                                <v-btn @click="addType">Добавить тип услуг</v-btn>
                                <v-btn @click='addService'>Довавить услугу</v-btn>
                        </div>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>
        <add-type-dialog v-if="addTypeShow" :method='getServicesAll'></add-type-dialog>
        <add-service-dialog v-if="addServiceShow" :method='getServicesAll' :types='getTypes()'></add-service-dialog>
    </v-container>

</template>

<script>
    import {
        mapActions,
        mapGetters
    } from 'vuex'
    import addTypeDialog from './admin/AddTypeDialog.vue'
     import addServiceDialog from './admin/AddSeriviceDialog.vue'
    export default {
        components:{
            addTypeDialog, addServiceDialog
        },
        data() {
            return {
                addTypeShow:false,
                addServiceShow: false,
                fields: ['№', 'Наименование платной медицинской услуги', 'Еденица измерения', 'Цены, бел. руб'],
                types: '',
                typeSelect: '',
                error: null,
                errorDate: "На эту дату вы уже записались на прием. Выберите другую дату приема или другую процедуру.",
                errorCard: "У вас нет карточки. Пожалусйта зарегестрируйте сначало карточку посещения санатория!!",
                date: new Date().toISOString().substr(0, 10),
                menu: false,
                menu2: false,
                time: '11:15',
                making: {
                    service_id: '',
                    date: ''
                }
            }
        },
        methods: {
            ...mapActions(['getServices', 'orderService']),
            getServicesAll() {
                this.getServices()
                    .then(response => {
                        this.types = response.data
                    })
            },
            order() {
                this.error = null;
                this.making.date = this.date;
                this.orderService({
                        formData: this.making
                    })
                    .catch((err) => {
                        if (err === "error date")
                            this.error = this.errorDate;
                        else if (err === "error card")
                            this.error = this.errorCard;
                    })
            },
            addType(){
                this.addTypeShow =true;   
            },
            addService(){
                this.addServiceShow =true;   
            },
            getTypes(){
                return this.types;
            },
            allowedHours: v => v % 2,
            allowedMinutes: v => v >= 10 && v <= 50,
            allowedStep: m => m % 10 === 0
        },
        created() {
            this.getServicesAll();
        },
        filters:{
            number(n){
               return n.toFixed(2);
            }
        },
        computed: {
            ...mapGetters(['user']),
            getServicesType() {
                const services = this.types.find(x => x._id === this.typeSelect)["services"];
                return services;
            }
        }
    }

</script>

<style scoped>
    .order {
        width: 100%;
        margin: 0 20px;
    }

    .order__form {
        min-height: 300px;
        background: #bbcfe3;
        padding: 20px 20px 10px 10px;
        border: 1px solid;
    }

    .v-menu__content {
        top: 60px !important;
        left: 0 !important;
    }

    .services {
        margin: auto;
    }

    .table tr,
    th {
        height: 70px;
        text-align: justify;
    }

    .table__head {
        background: #ffffff;
    }

    .v-text-field {
        margin: 10px !important;
    }

</style>
