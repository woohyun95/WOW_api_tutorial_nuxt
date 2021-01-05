<template>
  <v-container fluid>
    <v-row
      v-for="expansion in reversedExpansions"
    >
      <v-col>
        <v-row>{{expansion['expansionName']}}</v-row>
        <v-row>
          <expansion-sort :expansion="expansion"></expansion-sort>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import RaidProcessCard from "./RaidProcessCard";
  import ExpansionSort from "./ExpansionSort";

  export default {
    name:'RaidProcessCardIter',
    components: {
      RaidProcessCard,
      ExpansionSort
    },
    data() {
      return {}
    },
    computed: {
      reversedExpansions(){
        return this.$store.state.raidProgressData
      },
      expansions() {
        return this.$store.state.raidProgressData
      },
      dungeons() {
        let dungeons = []
        let data = this.$store.state.raidProgressData
        data.forEach(expansion => {
          expansion.dungeonData.forEach(dungeon => {
            dungeons.push(dungeon)
          })
        })
        return dungeons
      }
    }
  }
</script>

<style scoped>

</style>
