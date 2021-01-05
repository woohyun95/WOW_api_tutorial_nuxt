<template>
  <v-layout
    row
  >
    <v-flex
      class="px-6"
      xs12>
      <v-card>
        <v-layout>
          <v-img
            xs2
            min-height="150px"
            min-width="150px"
            max-width="180px"
            max-height="180px"
            :src=imgSource
          ></v-img>
          <v-flex xs12>
            <v-card-title primary-title>
              <v-col
                xs="12"
                md="5"
                lg="2"
                style="min-width: 400px;"
              >
                <h5>{{this.$store.state.characterProfile['title']}}</h5>
                <h1 :style="characterNameStyle">
                  {{this.$store.state.characterName}}
                </h1>
                <!--<h1 style="color: #d59012">color test</h1>-->
              </v-col>
              <v-col xs="12" md="6">
                <v-row>
                  <h3 v-if="this.$store.state.characterProfile['level']">
                    {{this.$store.state.characterProfile['equipped_item_level']}} LV
                  </h3>
                </v-row>
                <v-row>
                  {{this.$store.state.characterProfile['level']}}
                  {{this.$store.state.characterProfile['race']}}&nbsp
                  <span :style="characterNameStyle">{{this.$store.state.characterProfile['active_spec']}}</span>&nbsp
                  <span :style="characterNameStyle">{{this.$store.state.characterProfile['character_class']}}</span>
                </v-row>
                <v-row>
                  <span style="color: #ffa500;" v-if="this.$store.state.characterProfile['guild']">
                    <{{this.$store.state.characterProfile['guild']}}>
                  </span>
                  &nbsp
                  {{this.$store.state.characterProfile['realm']}}
                </v-row>
              </v-col>
              <v-col>

              </v-col>
            </v-card-title>
          </v-flex>
        </v-layout>
      </v-card>
    </v-flex>


  </v-layout>
</template>

<script>
  export default {
    name: "NamePlate",
    data(){
      return{
      }
    },
    computed: {
      imgSource:function(){
        return this.$store.state.characterMedia['avatar']
      },
      characterNameStyle: function () {
        let red = 255
        let green = 255
        let blue = 255
        let alpha = 255
        let characterClass = this.$store.state.characterProfile['character_class']

        let characterRGBA = {
          none: [255, 255, 255, 255], // RGBA
          Warrior: [175, 145, 100, 255],
          Mage: [140, 200, 255, 255],
          'Death Knight': [205, 0, 0, 255],
          Hunter: [130, 210, 90, 255],
          Priest: [255, 255, 255, 255],
          'Demon Hunter': [130, 60, 120, 255],
          Monk: [70, 210, 150, 255],
          Paladin: [255, 170, 220, 255],
          Rogue: [240, 255, 150, 255],
          Shaman: [40, 60, 255, 255],
          Warlock: [100, 70, 200, 255],
          Druid: [210, 145, 20, 255]
        }
        if (characterRGBA.hasOwnProperty(characterClass)) {
          return {
            color: `rgba(
            ${characterRGBA[characterClass][0]},
            ${characterRGBA[characterClass][1]},
            ${characterRGBA[characterClass][2]},
            ${characterRGBA[characterClass][3]})`
          }
        } else {
          return {
            color: `rgba(
            ${characterRGBA['none'][0]},
            ${characterRGBA['none'][1]},
            ${characterRGBA['none'][2]},
            ${characterRGBA['none'][3]})`
          }
        }
      }
    }
  }
</script>

<style scoped>

</style>
