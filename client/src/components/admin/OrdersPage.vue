<template>
    <v-container fluid>
        <v-layout>
            <v-flex>
                <v-layout>
                    <span>Заявки на прием услуг</span>
                </v-layout>
                <table id="dtBasicExample" class="table table-striped table-bordered" cellspacing="0" width="100%">
                    <thead>
                        <tr>
                            <th class="th-sm">ФИО
                            </th>
                            <th class="th-sm">Телефон для связи
                            </th>
                            <th class="th-sm">Дата приема
                            </th>
                            <th class="th-sm">Время приема
                            </th>
                            <th class="th-sm">Действия
                            </th>
                        </tr>
                    </thead>
                    <tbody v-for="(item, index) in orders">
                        <tr>
                            <td>{{item.user.name}} {{item.user.surname}} {{item.user.patronymic}}</td>
                            <td >{{item.user.phone}}</td>
                            <td>{{item.date | dateFilter}}</td>
                            <td>{{item.date | timeFilter}}</td>
                            <td>
                               <v-btn @click="acceptBooking(item._id)">Принять</v-btn>
                                <v-btn  @click="rejectBooking(item._id)">Оклонить</v-btn>
                            </td>
                            
                        </tr>
                    </tbody>
                </table>
            </v-flex>
        </v-layout>
    </v-container>

</template>

<script>
import {mapActions} from 'vuex'
export default {
        data() {
            return {
                orders: '',
                changeStatus: {
                    statusId: '',
                    id: ''
                }
            }
        },
        methods: {
            ...mapActions(['getOrdersRequest', 'changeStatusOrder']),
            getOrders() {
                this.getOrdersRequest()
                    .then((response) => {
                        this.orders = response.data.orders;
                        this.statuts = response.data.statuts;
                    })
            },
            rejectBooking(id){
                this.change("CANCELED", id);
            },
            acceptBooking(id){
                this.change("ACTIVE", id);
            },
            change(status, id){
                const st = this.statuts.find(x=>x.name === status);
                
                this.changeStatus.statusId = st;
                this.changeStatus.id = id;
                this.changeStatusOrder({formData: this.changeStatus})
                    
                this.getOrders();
            }
        },
        created() {
            this.getOrders();
        },
        filters:{
            dateFilter(item){
                var date=  new Date(item);
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
            },
            timeFilter(item){
                var date = new Date(item);

                var hh = date.getUTCHours();
                var mm = date.getUTCMinutes();

                if (hh < 10) {hh = "0"+hh;}
                if (mm < 10) {mm = "0"+mm;}
                return  hh+":"+mm;
            }
        }
    }
</script>
