<template>
        <v-dialog v-model="this.$parent.modal" persistent lazy full-width width="290px">
            <v-date-picker v-model="date" scrollable :min="new Date().toISOString().substr(0, 10)">
                <v-spacer></v-spacer>
                <v-btn flat color="primary" @click="close">Cancel</v-btn>
                <v-btn flat color="primary" @click="saveDate">OK</v-btn>
            </v-date-picker>
        </v-dialog>
</template>

<script>
    export default {
        props:['item'],
        data() {
            return {
                date: new Date().toISOString().substr(0, 10),
                eventItem : this.item
            }
        },
        methods:{
            saveDate(){
                if(this.item === 'arrival')
                    this.$emit('arrival', this.date);
                else if(this.item === 'departure')
                     this.$emit('departure', this.date);
                this.close();
            },
            close(){
                this.$parent.modal = false
            }
         
        },
        filters:{
            
        }
    }

</script>
