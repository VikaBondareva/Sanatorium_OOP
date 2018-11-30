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
                                    <td>{{item.price}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <v-flex xs3>
                        <div style="margin-left: 30px;">
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
                                    <v-date-picker id="service_datepiker" v-model="date" no-title>
                                        <v-spacer></v-spacer>
                                        <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
                                        <v-btn flat color="primary" @click="$refs.menu.save(date)">OK</v-btn>
                                    </v-date-picker>
                                </v-menu>
                            </div>
                            <v-btn @click="order">Записаться на прием</v-btn>
                        </div>
                    </v-flex>
                </v-layout>
            </v-flex>
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
                fields: ['№', 'Наименование платной медицинской услуги', 'Еденица измерения', 'Цены, бел. руб'],
                types: '',
                typeSelect: '',
                date: new Date().toISOString().substr(0, 10),
                menu: false,
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
                this.making.date=this.date;
                this.orderService({formData:this.making});
            }
        },
        created() {
            this.getServicesAll();
        },
        computed: {
            getServicesType() {
                const services = this.types.find(x=>x._id===this.typeSelect)["services"];
                return services;
            }
        }
    }

</script>

<style scoped>
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
