<template>
  <div>
       <div>
        <span class="font-weight-bold">Адрес: {{card.addres}}</span>
    </div>
    <div>
        <span class="font-weight-bold">Телнфон: {{card.phone}}</span>
    </div>
    <div>
        <span class="font-weight-bold">Дата рождения: {{card.birth.toString().substr(0,10)}}</span>
    </div>
    <div>
        <span class="font-weight-bold">Дата заезда: {{card.dateArrival.toString().substr(0,10)}}</span>
    </div>
    <div>
        <span class="font-weight-bold">Дата выезда: {{card.dateDeparture.toString().substr(0,10)}}</span>
    </div>
  </div>
   
</template>

<script>
    export default {
        props: ['card']
    }
</script>
