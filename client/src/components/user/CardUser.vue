<template>
  <div class="info">

                
    <div>
        <div >Адрес:   {{card.addres}}</div>
    </div>
    <div>
        <div >Телнфон:   {{card.phone}}</div>
    </div>
    <div>
        <div >Дата рождения:   {{card.birth.toString().substr(0,10)}}</div>
    </div>
    <div>
        <div >Дата заезда:   {{card.dateArrival.toString().substr(0,10)}}</div>
    </div>
    <div>
        <div >Дата выезда:   {{card.dateDeparture.toString().substr(0,10)}}</div>
    </div>
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