<template>
  <div class="info">

    
                    <v-layout row mb-2>
                        <v-flex xs3>
                            <span >Дата заезда: </span>
                        </v-flex>
                        <v-flex xs5>
                            <span> {{card.dateArrival.toString().substr(0,10)}}</span>
                        </v-flex>
                    </v-layout>

                 <v-layout row mb-2>
                        <v-flex xs3>
                            <span >Дата выезда:  </span>
                        </v-flex>
                        <v-flex xs5>
                            <span> {{card.dateDeparture.toString().substr(0,10)}}</span>
                        </v-flex>
                    </v-layout>

  </div>
   
</template>

<script>
    export default {
        props: ['card']
    }
</script>


<style scoped>
    div.info > div{
        font-family: 18px serif;
    }
</style>