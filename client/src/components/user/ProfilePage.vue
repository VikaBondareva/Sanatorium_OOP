<template>
    <v-layout column fill-height>

        <v-layout column align-center>
            <h3>{{user.surname}} {{user.name}} {{user.patronymic}}</h3>
        </v-layout>
        <div class="user-information">
            <div>
                <span>Email: {{user.email}}</span>
            </div>
        </div>

        <div class="card">
            <h4 class="card-header text-center font-weight-bold text-uppercase py-4">Забронированные услуги</h4>
            <table class="table table-hover table-bordered">
                <thead class="table__head">
                    <tr>
                        <th scope="col">№</th>
                        <th scope="col">Наименование платной медицинской услуги</th>
                        <th scope="col">Еденица измерения</th>
                        <th scope="col">Цены, бел. руб</th>
                        <th scope="col">Дата посещения</th>
                        <th scope="col">Отменить</th>
                        <th scope="col">Изменить</th>
                    </tr>
                </thead>
                <tbody class="services__body">
                    <tr v-for="(item,index) in user.orders">
                        <td scope="row">{{index+1}}</td>
                        <td>{{item.service.name}}</td>
                        <td>{{item.service.measure}}</td>
                        <td>{{item.service.price}}</td>
                        <td>{{item.date}}</td>
                        <td ><v-btn @click="deleteOrder(item._id)">Delete</v-btn></td>
                        <td ><v-btn @click="changeDate(item._id)">Изменить дату</v-btn></td>
                    </tr>
                
                </tbody>
                <tfoot>
                    
                </tfoot>
            </table>
            <!--
            <h3 class="card-header text-center font-weight-bold text-uppercase py-4">Забронированные услуги</h3>
            <div class="card-body">
                <mdb-table-editable :columns="columns" :rows="rows" class="text-center" striped bordered />
            </div>
-->
        </div>
    </v-layout>
    <!--    </v-container>-->
</template>

<script>
    import {
        mapGetters,
        mapActions
    } from 'vuex'
//    import {
//        mdbTableEditable
//    } from 'mdbvue';
    export default {
        data(){
            return {
                changeDate: {
                    _id: '',
                    date: ''
                }
            }
        },
        methods: {
            ...mapActions(['getCurrentUser', 'deleteOrderUser', 'changeDateOfVisit']),
            getUser() {
                this.getCurrentUser();
            },
            deleteOrder(id){
                this.deleteOrderUser({id: id});
            },
            changeDate(){
                this.changeDateOfVisit({formData: this.changeDate});
            }
        },
        created() {
            this.getUser();
        },
        computed: {
            ...mapGetters(['user'])
        }
    }
</script>

<style scoped>
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
