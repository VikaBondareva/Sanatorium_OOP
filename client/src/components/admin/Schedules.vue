<template>
    <v-container fluid>
        <v-layout>
            <v-flex>
               <v-layout>
                   <span>Посещения</span>
               </v-layout>
                <table id="dtBasicExample" class="table table-striped table-bordered" cellspacing="0" width="100%">
                    <thead>
                        <tr>
                            <th class="th-sm">ФИО
                            </th>
                            <th class="th-sm">Возраст
                            </th>
                            <th class="th-sm">Дата прибытия
                            </th>
                            <th class="th-sm">Дата отьезда
                            </th>
                        </tr>
                    </thead>
                    <tbody v-for="(item, index) in items">
                        <tr>
                            <td>{{item.user.name}} {{item.user.surname}} {{item.user.patronymic}}</td>
                            <td>{{getAge(item.birth.substr(0, 10))}}</td>
                            <td>{{item.dateArrival.substr(0, 10)}}</td>
                            <td>{{item.dateDeparture.substr(0, 10)}}</td>
                        </tr>
<!--
                        <tr>
                            <td>Tiger Nixon</td>
                            <td>61</td>
                            <td>2011/04/25</td>
                            <td>$320,800</td>
                        </tr>
                        <tr>
                            <td>Garrett Winters</td>
                            <td>63</td>
                            <td>2011/07/25</td>
                            <td>$170,750</td>
                        </tr>
                        <tr>
                            <td>Ashton Cox</td>
                            <td>66</td>
                            <td>2009/01/12</td>
                            <td>$86,000</td>
                        </tr>
-->
                    </tbody>
                </table>
            </v-flex>
        </v-layout>
    </v-container>

</template>

<script>
    import {mapActions,
        mapGetters
    } from 'vuex'
    export default {
        data() {
            return {
                fields: ['№', 'Наименование платной медицинской услуги', 'Еденица измерения', 'Цены, бел. руб'],
                items: ''
            }
        },
        methods: {
            ...mapActions(['getCardsBooking']),
            getBooking() {
                this.getCardsBooking()
                    .then((response) => {
                        this.items = response.data
                    })
            },
            getAge(date){
                const now = new Date();
                const birth = new Date(date);
                return now.getFullYear() - birth.getFullYear();
            }
        },
        created() {
            this.getBooking();
        },
        computed: {
           
        }
    }

</script>

