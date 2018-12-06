<template>
    <v-container>
        <section>
            <v-layout column wrap class="my-5" align-center>
                <v-flex xs12 sm4 class="my-3">
                    <div class="text-xs-center">
                        <h2 class="headline">The best way to start developing</h2>
                        <span class="subheading">
                            Cras facilisis mi vitae nunc
                        </span>
                    </div>
                </v-flex>
                <div>
                    <b-carousel id="carousel1" style="text-shadow: 1px 1px 2px #333;" controls indicators background="#ababab" :interval="4000" img-width="1024" img-height="480" v-model="slide" @sliding-start="onSlideStart" @sliding-end="onSlideEnd">

                        <b-carousel-slide caption="Территория санатория" text="  На территории санатория созданы все условия, чтобы вы почувствовали единение с природой и отдохнули от городских будней." img-src="https://picsum.photos/1024/480/?image=52"></b-carousel-slide>

                        <!-- Slides with custom text -->
                        <b-carousel-slide img-src="https://picsum.photos/1024/480/?image=54">
                            <h1>Hello world!</h1>
                        </b-carousel-slide>

                        <!-- Slides with image only -->
                        <b-carousel-slide img-src="https://picsum.photos/1024/480/?image=58">
                        </b-carousel-slide>

                        <!-- Slides with img slot -->
                        <!-- Note the classes .d-block and .img-fluid to prevent browser default image alignment -->
                        <b-carousel-slide>
                            <img slot="img" class="d-block img-fluid w-100" width="1024" height="480" src="https://picsum.photos/1024/480/?image=55" alt="image slot">
                        </b-carousel-slide>

                        <!-- Slide with blank fluid image to maintain slide aspect ratio -->
                        <b-carousel-slide caption="Blank Image" img-blank img-alt="Blank image">
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                eros felis, tincidunt a tincidunt eget, convallis vel est. Ut pellentesque
                                ut lacus vel interdum.
                            </p>
                        </b-carousel-slide>

                    </b-carousel>
                </div>
                <v-flex xs12>
                    <v-container grid-list-xl>
                        <v-layout row wrap align-center>
                            <v-flex xs12 md4>
                                <v-card class="elevation-0 transparent">
                                    <v-card-text class="text-xs-center">
                                        <v-icon x-large class="blue--text text--lighten-2">color_lens</v-icon>
                                    </v-card-text>
                                    <v-card-title primary-title class="layout justify-center">
                                        <div class="headline text-xs-center">Территория санатория</div>
                                    </v-card-title>
                                    <v-card-text>
                                        На территории санатория созданы все условия, чтобы вы почувствовали единение с природой и отдохнули от городских будней.
                                    </v-card-text>
                                </v-card>
                            </v-flex>
                            <v-flex xs12 md4>
                                <v-card class="elevation-0 transparent">
                                    <v-card-text class="text-xs-center">
                                        <v-icon x-large class="blue--text text--lighten-2">flash_on</v-icon>
                                    </v-card-text>
                                    <v-card-title primary-title class="layout justify-center">
                                        <div class="headline">Уютные номера для комфортного отдыха</div>
                                    </v-card-title>
                                    <v-card-text>
                                        Приглашаем посетить наш санаторий. Комфорт наших номеров вас не разочарует!
                                    </v-card-text>
                                </v-card>
                            </v-flex>
                            <v-flex xs12 md4>
                                <v-card class="elevation-0 transparent">
                                    <v-card-text class="text-xs-center">
                                        <v-icon x-large class="blue--text text--lighten-2">build</v-icon>
                                    </v-card-text>
                                    <v-card-title primary-title class="layout justify-center">
                                        <div class="headline text-xs-center">Приятного аппетита</div>
                                    </v-card-title>
                                    <v-card-text>
                                        Организация питания порадует вас не только ассортиментом блюд, но и приятными интерьерами залов.
                                    </v-card-text>
                                </v-card>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-flex>
            </v-layout>
        </section>

        <section>
            <v-parallax src="../../assets/images/main.jpg" height="380">
                <v-layout column align-center justify-center>
                    <div class="headline white--text mb-3 text-xs-center">Web development has never been easier</div>
                    <em>Kick-start your application today</em>
                    <v-btn v-if='isAuthentication' class="blue lighten-2 mt-5" dark large @click="goToBooking">
                        ЗАБРОНИРОВАТЬ
                    </v-btn>
                </v-layout>
            </v-parallax>
        </section>
    </v-container>
</template>

<script>
    export default {
        data() {
            return {
                slide: 0,
                sliding: null,
                items: [{
                        src: '../../assets/images/main/13220b.jpg'
                    },
                    {
                        src: '../../assets/images/main/img_4909.jpg'
                    },
                    {
                        src: '../../assets/images/main/hotel_6696_61256_stolovaya_1.jpg'
                    },
                    {
                        src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg'
                    }
                ]
            }
        },
        methods: {
            onSlideStart(slide) {
                this.sliding = true
            },
            onSlideEnd(slide) {
                this.sliding = false
            },
            goToBooking() {
                this.$router.push({
                    name: 'booking'
                })
            },
            isAuthentication(){
                return this.$store.getters.isAuthenticated;
            }
        }
    }

</script>
