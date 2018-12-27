<template>
    
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
                                    <div class="form-group">
                                        <v-menu ref="menu2" :close-on-content-click="false" v-model="menu2" :return-value.sync="time">
                                            <v-text-field slot="activator" v-model="time" label="Время приема" prepend-icon="event" readonly></v-text-field>
                                            <v-time-picker v-model="time"  class="mt-3" format="24hr" scrollable min="7:30" max="19:00">
                                                <v-spacer></v-spacer>
                                                <v-btn flat color="primary" @click="menu2 = false">Cancel</v-btn>
                                                <v-btn flat color="primary" @click="$refs.menu2.save(time)">OK</v-btn>
                                            </v-time-picker>
                                        </v-menu>
                                    </div>
                                    <v-btn @click="order">Записаться на прием</v-btn>
                                </div>
                                <div v-if="result.message!==''" style=" margin-top: 20px; margin-left: 20px;">
                                    <span style="color:#f34;">{{result.message}}</span>
                                    <router-link to="/booking" v-if="error==errorCard">Зарегестрировать карточку</router-link>
                                </div>
                            </div>
                        </div>
    
</template>


<script>
    import {mapActions} from 'vuex'

    export default {
        props: ['types'],
        data(){
            return{
                typeSelect: '',
                result: {
                    message:'',
                    success: ''
                },
                success: 'Запить на прием процедуры успешно зарегистрирована',
                errorDate: "На эту дату вы уже записались на прием. Выберите другую дату приема или другую процедуру.",
                errorCard: "У вас нет карточки. Пожалусйта зарегестрируйте сначало карточку посещения санатория!!",
                date: new Date().toISOString().substr(0, 10),
                menu: false,
                menu2: false,
                time: '7:30',
                making: {
                    service_id: '',
                    date: ''
                }
            }
        },
        methods:{
             ...mapActions(['getServices', 'orderService']),
             order() {
                this.error = null;
                this.making.date = this.formatDate(this.date,this.time)
                this.orderService({
                        formData: this.making
                    })
                    .then(()=>{
                        this.result.message = this.success;
                        this.result.success = true;
                    })
                    .catch((err) => {
                        this.result.success = true;
                        if (err === "error date")
                            this.result.message = this.errorDate;
                        else if (err === "error card")
                            this.result.message = this.errorCard;
                    })
            },
            formatDate(date,time){
                let timeFormat = time.split(':');
                if(timeFormat[0]<10)
                    timeFormat[0]='0'+timeFormat[0];
                return `${date}T${timeFormat[0]}:${timeFormat[1]}:00Z`;
            }, 
            allowedHours: v => v % 2,
            allowedMinutes: v => v >= 10 && v <= 50,
            allowedStep: m => m % 10 === 0,
           
        },
        computed: {
            getServicesType() {
                const services = this.types.find(x => x._id === this.typeSelect)["services"];
                return services;
            }
               
        }
    }
    
</script>