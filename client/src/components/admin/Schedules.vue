<template>
    <v-container fluid>
        <v-layout>
            <v-flex>
               <v-layout>
                   <span>График посещений</span>
               </v-layout>
                <table id="dtBasicExample" class="table table-striped table-bordered" cellspacing="0" width="100%">
                    <thead>
                        <tr>
                            <th class="th-sm">Процедура
                            </th>
                            <th class="th-sm">Дата посещения
                            </th>
                            <th class="th-sm">Время осещения
                            </th>
                            <th class="th-sm">ФИО
                            </th>
                        </tr>
                    </thead>
                    <tbody v-for="(item, index) in schedules">
                        <tr>
                            <td>{{item.name}}</td>
                            <td>{{item.shedule.date | dateFilter}}</td>
                            <td>{{item.shedule.date | timeFilter}}</td>
                            <td>dfsf</td>
                        </tr>
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
                items: []
            }
        },
        methods: {
            ...mapActions(['getSchedules']),
            getAllSchedule() {
                this.getSchedules()
                    .then((response) => {
                        this.items = response.data
                    })
            }
        },
        created() {
            this.getAllSchedule();
        },
        computed:{
            schedules(){
                let schedules = this.items.filter((value)=>{
                    if(value.schedule)
                        return value;
                })
            }
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

