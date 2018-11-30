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
                            <td>{{item.name}} {{item.surname}} {{item.patronymic}}</td>
                            <td>{{item.age}}</td>
                            <td>{{item.dateArrivel}}</td>
                            <td>{{item.dateDeparture}}</td>
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
                items: '' //this.services
            }
        },
        methods: {
            ...mapActions(['getCardsBooking']),
            getBooking() {
                this.getCardsBooking()
                    .then((response) => {
                        this.items = response.data
                    })
            }
        },
        created() {
            this.getBooking();
        }
//        computed: {
//            ...mapGetters(['cardsBooking'])
//        }
    }

</script>

<style scoped>
   table.dataTable thead>tr>td.sorting,
table.dataTable thead>tr>td.sorting_asc,
table.dataTable thead>tr>td.sorting_desc,
table.dataTable thead>tr>th.sorting,
table.dataTable thead>tr>th.sorting_asc,
table.dataTable thead>tr>th.sorting_desc {
  padding-right: 30px
}

table.dataTable thead .sorting,
table.dataTable thead .sorting_asc,
table.dataTable thead .sorting_asc_disabled,
table.dataTable thead .sorting_desc,
table.dataTable thead .sorting_desc_disabled {
  cursor: pointer;
  position: relative
}

table.dataTable thead .sorting:after,
table.dataTable thead .sorting:before,
table.dataTable thead .sorting_asc:after,
table.dataTable thead .sorting_asc:before,
table.dataTable thead .sorting_asc_disabled:after,
table.dataTable thead .sorting_asc_disabled:before,
table.dataTable thead .sorting_desc:after,
table.dataTable thead .sorting_desc:before,
table.dataTable thead .sorting_desc_disabled:after,
table.dataTable thead .sorting_desc_disabled:before {
  position: absolute;
  bottom: .9em;
  display: block;
  opacity: .3
}

table.dataTable thead .sorting:before,
table.dataTable thead .sorting_asc:before,
table.dataTable thead .sorting_asc_disabled:before,
table.dataTable thead .sorting_desc:before,
table.dataTable thead .sorting_desc_disabled:before {
  right: 1em;
  content: "\f0de";
  font-family: FontAwesome;
  font-size: 1rem
}

table.dataTable thead .sorting:after,
table.dataTable thead .sorting_asc:after,
table.dataTable thead .sorting_asc_disabled:after,
table.dataTable thead .sorting_desc:after,
table.dataTable thead .sorting_desc_disabled:after {
  content: "\f0dd";
  font-family: FontAwesome;
  right: 16px;
  font-size: 1rem
}

table.dataTable thead .sorting_asc:before,
table.dataTable thead .sorting_desc:after {
  opacity: 1
}

table.dataTable thead .sorting_asc_disabled:before,
table.dataTable thead .sorting_desc_disabled:after {
  opacity: 0
}

</style>
