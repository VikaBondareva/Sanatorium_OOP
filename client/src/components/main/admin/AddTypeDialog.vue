<template>
    <v-layout row justify-center>
        <v-dialog v-model=" this.$parent.addTypeShow" persistent max-width="450px">
            <v-card>
                <v-card-title>
                    <span class="headline"> Добавления типа </span>
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                    <v-container grid-list-md>
                       <v-layout wrap v-if="error">
                            <v-flex xs10>
                                <v-layout wrap>
                                    <span style="color:#f34;">Ошибка: {{error}}</span>
                                </v-layout>
                            </v-flex>
                        </v-layout>
                        <v-layout wrap>
                            <v-flex xs10>
                               <v-form ref='textField' lazy-validation>
                                    <v-text-field clearable type='text' v-model="type.name" label="Название" :rules="rules.name" required></v-text-field>
                               </v-form>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat  @click="addType">ДОБАВИТЬ</v-btn>
                    <v-btn color="green darken-1" flat @click="close">ОТМЕНИТЬ</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-layout>
</template>

<script>
    import {mapActions} from 'vuex'
    
    export default {
        props:['method'],
        data(){
            return{
                type: {
                    name: ""
                },
                error:null,
                rules:{
                   name: [v => !!v || "Введите имя!"],
                }
            }
        },
        methods: {
            ...mapActions(['addTypeService']),
            addType() {
                this.error = null;
                if(this.$refs.textField.validate()){
                    this.addTypeService({type:this.type})
                        .then(()=>{
                            this.close();
                            this.method();
                        })
                        .catch((err)=>{
                            this.error =err.data.message;
                        });
                }
            },
            close() {
                this.$parent.addTypeShow = false;
            }
        }
    }

</script>
