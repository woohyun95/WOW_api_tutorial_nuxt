<template>
  <v-card
    v-if="this.$store.state.characterName"
    class="mx-auto"
    max-width="1300"
  >

    <v-img
      class="align-center"
      height="900px"
      :src = "imgSource"
    >
      <v-container>
        <v-row>
          <v-col
            class="d-flex align-start flex-column"
          >
            <gear-slot :gear="gearData[0]" class="py-2 transParent"></gear-slot>
            <gear-slot :gear="gearData[1]" class="py-2 transParent"></gear-slot>
            <gear-slot :gear="gearData[2]" class="py-2 transParent"></gear-slot>
            <gear-slot :gear="gearData[3]" class="py-2 transParent"></gear-slot>
            <gear-slot :gear="gearData[4]" class="py-2 transParent"></gear-slot>
            <gear-slot :gear="gearData[5]" class="py-2 transParent"></gear-slot>
            <gear-slot :gear="gearData[6]" class="py-2 transParent"></gear-slot>
            <gear-slot :gear="gearData[7]" class="py-2 transParent"></gear-slot>
          </v-col>
          <v-col
            class="d-flex align-end flex-column"
          >
            <gear-slot :gear="gearData[8]" class="py-2 transParent"></gear-slot>
            <gear-slot :gear="gearData[9]" class="py-2 transParent"></gear-slot>
            <gear-slot :gear="gearData[10]" class="py-2 transParent"></gear-slot>
            <gear-slot :gear="gearData[11]" class="py-2 transParent"></gear-slot>
            <gear-slot :gear="gearData[12]" class="py-2 transParent"></gear-slot>
            <gear-slot :gear="gearData[13]" class="py-2 transParent"></gear-slot>
            <gear-slot :gear="gearData[14]" class="py-2 transParent"></gear-slot>
            <gear-slot :gear="gearData[17]" class="py-2 transParent"></gear-slot>
          </v-col>
        </v-row>
        <v-col
          class="d-flex align-center justify-center"
        >
          <gear-slot :gear="gearData[15]" class="px-2 transParent"></gear-slot>
          <gear-slot :gear="gearData[16]" class="px-2 transParent"></gear-slot>
        </v-col>
        <v-row>
        </v-row>
      </v-container>
    </v-img>
  </v-card>
</template>
<script>
  import GearSlot from "./GearSlot"

  export default {
    name: "CharacterGear",
    components: {
      GearSlot
    },
    data(){
      return {
      }
    },
    computed:{
      gearData(){
        return this.$store.state.characterGearSlot
      },
      imgSource(){
        if(this.$store.state.characterMedia.hasOwnProperty('render')){
          return this.$store.state.characterMedia['render']
        }
        return this.$store.state.characterMedia['main']
      }
    }
  }
</script>

<style scoped>
  .transParent {
    background-color: rgba(255,255,255,0);
  }
</style>
