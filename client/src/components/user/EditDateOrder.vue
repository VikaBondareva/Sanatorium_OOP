<template>
    <v-layout row justify-center>
        <v-dialog v-model="this.$parent.editDate" persistent full-width width="290px">
            <v-card>
                <v-date-picker v-model="orderChange.date" scrollable no-title :min="new Date().toISOString().substr(0, 10)">
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" @click="close">Отмена</v-btn>
                    <v-btn flat color="primary" @click="changeDate">Сохранить</v-btn>
                </v-date-picker>
            </v-card>
        </v-dialog>
    </v-layout>
</template>

<script>
    import {mapActions} from 'vuex'
    export default {
        props: ['order', 'method'],
        data() {
            return {
                orderChange:{
                     id: this.order._id,
                     date: new Date(this.order.date).toISOString().substr(0, 10), 
                }
            }
        },
        methods: {
            ...mapActions(['changeDateOrder']),
            changeDate() {
                this.changeDateOrder({formData:this.orderChange});
                this.close();
                this.method();
            },
            close() {
                this.$parent.editDate = false
            }
        }
    }

</script>
