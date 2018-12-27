<template>
    <v-layout column fill-height style="min-heigth: 1000px;">
               <delete v-if='deleteShow' :order="order" :method="getUser"></delete>
                <delete-card v-if="deleteCard"></delete-card>
        <v-layout column align-center>
            <h3 class="text-center font-weight-bold text-uppercase py-4">{{user.surname}} {{user.name}} {{user.patronymic}}</h3>
        </v-layout>
             <div class="card user-information">
                     <v-flex>
                      <v-layout row>
                    <div>
                      <v-btn color="rgb(69, 152, 152)" style="width: 250px;" @click="goToEditProfile">Редактировать профиль</v-btn>
                    </div>
                      <div v-if="user.card.dateArrival" >
                         <v-btn  color="rgb(69, 152, 152)" style="width: 250px;" @click="cancelArrival">Отменить заезд</v-btn>

                      </div>
                      </v-layout>

                    

           
                   <v-layout row mt-4 mb-2>
                        <v-flex xs3>
                            <span >Email: </span>
                        </v-flex>
                        <v-flex xs5>
                             <span >{{user.email}}</span>
                        </v-flex>
                    </v-layout>
                    <v-layout row mb-2>
                        <v-flex xs3>
                            <span >Телеофн:</span>
                        </v-flex>
                        <v-flex xs5>
                            <span>{{user.phone | checkField}}</span>
                        </v-flex>
                    </v-layout>
                    <v-layout row mb-2>
                        <v-flex xs3>
                            <span >Дата рождения: </span>
                        </v-flex>
                        <v-flex xs5>
                            <span>{{user.birth | checkField}}</span>
                        </v-flex>
                    </v-layout>
                    <v-layout row mb-2>
                        <v-flex xs3>
                            <span >Aдрес прописки:</span>
                        </v-flex>
                        <v-flex xs5>
                            <span> {{user.addres | checkField}}</span>
                        </v-flex>
                    </v-layout>
                    
                        <card-user :card='user.card' v-if="user.card!=={}" ></card-user>
                    </v-flex>
            </div>
        
        <div class="card" style="padding: 10px!important;">
            <h4 class="text-center font-weight-bold text-uppercase py-3">Забронированные услуги</h4>
            <table class="table table-hover table-bordered" >
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
                    <tr v-for="(item,index) in user.card.orders">
                        <td scope="row">{{index+1}}</td>
                        <td>{{item.service.name}}</td>
                        <td>{{item.service.measure}}</td>
                        <td class="price">{{item.service.price}}</td>
                        <td>{{item.date | dateFilter}}</td>
                        <td ><v-btn @click="remove(item)">Отменить</v-btn></td>
                        <td ><v-btn @click="changeDate(item)">Изменить дату</v-btn></td>
                    </tr>
                
                </tbody>
                <tfoot>
                    <tr>
                        <td colspan='3' class="bg-info text-white">Общая сумма за приемы:</td>
                        <td class="text-uppercase bg-info text-white">{{totalPrice}}</td>
                    </tr>
                </tfoot>
            </table>
        </div>
        <edit-date v-if="editDate" :order="order" :method="getUser"></edit-date>

    </v-layout>
</template>

<script>
    import {
        mapGetters,
        mapActions
    } from 'vuex'
    import Delete from '../dialogs/Delete.vue'
    import EditDateOrder from './EditDateOrder.vue'
    import cardUser from './CardUser.vue'
    import deleteCard from './DeleteCard.vue'
    export default {
        components:{
            Delete,
            cardUser,
            deleteCard,
            "edit-date": EditDateOrder
        },
        data(){
            return {
                order:'',
                editDate: false,
                deleteShow:false,
                deleteCard: false,
                user: ''
            }
        },
        methods: {
            ...mapActions(['getCurrentUser', 'changeDateOfVisit']),
            getUser() {
                this.getCurrentUser()
                    .then(response=>{
                        this.user = response.data;
                    })
            },
            cancelArrival(){
                this.deleteCard = true;
            },
            remove(order){
                this.order=order;
                this.deleteShow = true;
            },
            changeDate(item){
                this.order= item;
                this.editDate=true;
            },
            goToEditProfile(){
                this.$router.push({name: 'editUser'})
            },
           
        },
        created() {
            this.getUser();
        },
        computed: {
            totalPrice(){
                var price =0.0;
                var prices = document.querySelectorAll('.price');
                for(var i=0; i<prices.length; i++){
                    price +=parseFloat(prices[i].textContent);
                }
                return price.toFixed(2);
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
                checkField(item){
                    if(!item || item==="")
                        return "неустановлено"
                    return item
                }
        }
    }
</script>

<style scoped>
    .user-information {
        margin-top: 20px;
        margin-bottom: 20px;
        padding: 20px 50px;
        height: 280px;
        font: 17px sans-serif !important;
        border: 1px solid;
    }
    .user-information div{
        
    }
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
