<template>
    <v-layout row justify-center >
        <v-dialog v-model="this.$parent.showAuth" persistent max-width="600px" min-heigth="300px">
                <v-flex>
                    <v-tabs slot="extension" v-model="currentItem" color="#5badfe" slider-color="yellow">
                       <v-layout>
                           <v-tab v-for="item in items" :href="'#tab-' + item.name" :key="item.name">
                            {{ item.title }}
                        </v-tab>
                       </v-layout>
                        
                         <v-btn flat icon color="white" @click="close"><v-icon>close</v-icon></v-btn>
                    </v-tabs>
                    
                    <v-tabs-items v-model="currentItem">
                        <v-tab-item v-for="item in items" :id="'tab-' + item.name" :key="item.name">
                            <v-card flat>
                                <v-card>
                                    <login v-if='item.name=="Login"' :method="close"></login>
                                    <registration v-if='item.name=="Registration"' :method="close"></registration>
                                </v-card>
                            </v-card>
                        </v-tab-item>
                    </v-tabs-items>
                </v-flex>
        </v-dialog>
    </v-layout>

</template>

<script>
    import Login from './Login'
    import Registration from './Registration'
    export default {
        components: {
            Login,
            Registration
        },
        data() {
            return {
                authDialog:false,
                currentItem: 'tab-Login',
                items: [{
                        name: 'Login',
                        title: 'Вход'
                    },
                    {
                        name: 'Registration',
                        title: 'Регистрация'
                    }
                ]
            }
        },
        methods:{
            close(){
                this.$parent.showAuth=false;
            }
        }
    }

</script>

<style scoped>
</style>
