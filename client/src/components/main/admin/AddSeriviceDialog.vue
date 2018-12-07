<template>
    <v-layout row justify-center>
        <v-dialog v-model=" this.$parent.addServiceShow" persistent max-width="450px">
            <v-card>
                <v-card-title>
                    <span class="headline"> Добавления платной услуги </span>
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                    <v-container >
                      <v-layout wrap v-if="error">
                                <span style="color:#f34;">Ошибка: {{error}}</span>
                        </v-layout>
                        <v-form ref="form" v-model="valid" lazy-validation>
                           <v-flex xs10>
                                <v-layout wrap>
                                    <label for="inputType">Выберите тип услуги</label>
                                    <select v-model="service.serviceType_id" ref="inputType"  class="form-control">
                                        <option v-for="item in types" v-bind:value="item._id">{{item.name}}</option>
                                    </select>
                                </v-layout>
                                <v-layout wrap>
                                    <v-text-field type='text' clearable  v-model="service.name" :rules="rules.name" label="Название" required></v-text-field>
                                </v-layout>
                                <v-layout wrap>
                                    <v-text-field type='text' clearable v-model="service.price" :rules="rules.price" label="Цена" required></v-text-field>
                                </v-layout>
                                <v-layout wrap>
                                    <v-text-field type='text' v-model="service.measure" :rules="rules.measure" label="Единица измерения" required></v-text-field>
                                </v-layout>
                            </v-flex>
                        </v-form>
                         
                    </v-container>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click="add">ДОБАВИТЬ</v-btn>
                    <v-btn color="blue darken-1" flat @click="close">ОТМЕНИТЬ</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-layout>
</template>

<script>
    import {mapActions} from 'vuex'
    
    export default {
        props:['types', 'method'],
        data(){
            return{
               error : null,
               service:{
                   name: '',
                   price:'',
                   measure: 'процедура',
                   serviceType_id: ''
               },
               rules:{
                   type: [v => !!v || "Введите тип услуги!"],
                   name:[v => !!v || "Введите наименование услуги!"],
                   price: [v => !!v || "Введите цену!"],
                   measure: [v => !!v || "Введите единицу измерения!"],
               }
            }
        },
        methods: {
            ...mapActions(['addService']),
            add() {
                this.error = null;
                if(this.$refs.form.validate()){
                   if(!isNaN(parseFloat(this.service.price)) && isFinite(this.service.price)){
                        this.addService({formData: this.service})
                        .then(()=>{
                             this.method();
                        })
                        .catch((err)=>{
                            this.error =err.data.message;
                        });
                    } else {
                        this.error ="Введите конкретную цену";
                    }
                    
                }
            },
            close() {
                this.$parent.addServiceShow = false;
            }
        }
    }

</script>
