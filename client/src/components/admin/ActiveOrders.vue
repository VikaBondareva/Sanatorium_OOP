<template>
    <v-container fluid>
        <v-layout>
            <v-flex>
                <v-layout>
                    <span>Записи на приемы</span>
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
                        </tr>
                    </thead>
                    <tbody v-for="(item, index) in orders">
                        <tr>
                            <td>{{item.user.name}} {{item.user.surname}} {{item.user.patronymic}}</td>
                            <td>{{item.user.phone}}</td>
                            <td>{{item.date.substr(0, 10)}}</td>
                            <td>{{item.date.substr(11, 15)}}</td>
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
                orders: ''
            }
        },
        methods: {
            ...mapActions(['getOrdersActive']),
            getOrders() {
                this.getOrdersActive()
                    .then((response) => {
                        this.orders = response.data;
                    })
            }
        },
        created() {
            this.getOrders();
        }
    }
</script>
