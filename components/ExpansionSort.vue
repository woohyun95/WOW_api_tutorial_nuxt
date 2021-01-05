<template>
  <v-row>
    <v-col
      style="max-width: 400px; min-width: 300px"
      :items="dungeons"
      v-for="item in dungeons"
      :key="item.name"
      cols="12"
      sm="6"
      md="3"
      lg="2"
    >
      <raid-process-card :dungeon="item"></raid-process-card>
    </v-col>
  </v-row>
</template>

<script>
  import RaidProcessCard from "./RaidProcessCard";
  export default {
    name: "ExpansionSort"
    ,
    components:{
      RaidProcessCard
    },
    computed:{
      dungeons(){
        return this.expansion['dungeonData']
      }
    },
    props: {
      expansion:{
        type: Object,
        required: true
      }
    }
  }
</script>

<style scoped>

</style>
