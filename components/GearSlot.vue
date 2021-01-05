<template>
  <div>
    <v-tooltip right>
      <template v-slot:activator="{ on }">
        <v-card
          v-on="on"
          max-width="75px"
          elevation="0"
        >
          <v-img
            :src="imgSource"
          ></v-img>
          <v-btn
            text
            max-height="22px"
            :style="itemColor"
            disabled
            tile
            block
          >
            {{itemLevel}}
          </v-btn>
        </v-card>
      </template>
      <gear-spec style="max-width: 25vw;" :gearData="gear"></gear-spec>
    </v-tooltip>
  </div>
</template>
<script>
  import GearSpec from "./GearSpec";

  export default {
    name: "GearSlot",
    components: {
      GearSpec
    },
    data() {
      return {
        imgUrl: 'https://render-us.worldofwarcraft.com/icons/56/inv_sword_39.jpg',
        defaultIMG: 'https://render-us.worldofwarcraft.com/icons/56/inv_sword_39.jpg'
      }
    },
    computed: {
      imgSource() {
        if(this.$store.state.gearImage[`${this.gear['gearType']}`]) {
          return this.$store.state.gearImage[`${this.gear['gearType']}`]
        }
        else{
          return 'https://render-us.worldofwarcraft.com/icons/56/inv_sword_39.jpg'
        }
      },
      itemLevel() {
        if (this.gear['gearData']) {
          return this.gear['gearData']['level']['value']
        }
      },
      itemColor() {
        let itemColor = this.$store.state.itemQualityRGBA

        let itemQuality = (this.gear.hasOwnProperty('gearData')) ? this.gear['gearData']['quality']['type'] : 'POOR'

        function getStyleObject(itemQuality) {
          return {
            color: 'rgba(255,255,255,255) !important',
            backgroundColor: `rgba(
              ${itemColor[itemQuality][0]},
              ${itemColor[itemQuality][1]},
              ${itemColor[itemQuality][2]},
              ${itemColor[itemQuality][3]})
              !important`
          }
        }

        return getStyleObject(itemQuality)
      }
    },
    methods: {},
    props: {
      gear: {
        type: Object,
        required: true
      }
    }
  }

</script>

<style scoped>

</style>
