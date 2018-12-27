<template>
    <v-layout row justify-center>
        <v-dialog v-model=" this.$parent.deleteCard" persistent max-width="450px">
            <v-card>
                <v-card-text>
                    <v-container grid-list-md>
                        <v-layout wrap>
                            <span class="headline"> Вы действительно хотите отменить бронирование? Вместе с этим отменятся все ваши записи на прием. </span>
                        </v-layout>
                    </v-container>
                </v-card-text>
                <v-driver></v-driver>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click="remove">ДА</v-btn>
                    <v-btn color="blue darken-1" flat @click="close">НЕТ</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-layout>
</template>

<script>
    import {mapActions} from 'vuex'
    
    export default {
        methods: {
            ...mapActions(['cancelBookingCard']),
            remove() {
                this.cancelBookingCard()
                this.close();
                this.$router.go();    
            },
            close() {
                this.$parent.deleteCard = false;
            }
            
        }
    }

</script>
