<template>
  <v-card
    class="mx-auto"
    max-width="300"
    style="background-color: #273239; !important;"
  >
    <v-img
      class="white--text align-end"
      gradient="to top, rgba(0,5,10,0.95), rgba(255,255,255,0)"
      :height="imgHeight"
      :src="stateData"
    >
      <v-card-title
        class="justify-end"
        style="font-size: 15px"

      >{{dungeon[0].name}}
      </v-card-title>
    </v-img>

    <v-card-text
      class="text--primary"
      style="font-size: 12px"
    >
      <v-row
        v-for="(item, index) in difficultyList"
        :key="index"
        class="my-4"
        no-gutters
      >
        <v-col
          cols="4"
          align="start"
          class="align-self-center pl-1"
        >
          {{item}}
        </v-col>
        <v-col
          class="pr-1"
          cols="8"
        >
          <v-progress-linear
            :value="(levelClear[item].clear/levelClear[item].total *100)"
            :color="levelClear[item].percent === 100 ? clearedColor:defaultColor"
            :height="height"
            background-color="grey darken-4"
          >
            <template v-slot>
              {{levelClear[item].clear}}/{{levelClear[item].total}}
            </template>
          </v-progress-linear>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "RaidProgressCard",
  data() {
    return {
      progress: 0,
      height: 28,
      imgHeight: "200px",
      clearedColor: 'green darken-2',
      defaultColor: 'orange darken-2',
      barColor: 'orange',
      name: 'no name',
      SRC: '',
      difficultyList: ['LFR', 'NORMAL', 'HEROIC', 'MYTHIC']
    }
  },
  computed: {
    stateData() {
      return this.$store.state.dungeonImageData[this.dungeon[0].id]
    },
    levelClear() {
      let obj = {}
      this.difficultyList.forEach(level => {
        obj[level] = {}
        obj[level].total = this.dungeon[0].totalCount
        obj[level].clear = 0
        obj[level].percent = 0
      })
      this.dungeon.forEach(dungeonObj => {
        if (this.difficultyList.includes(dungeonObj['difficulty'])) {
          obj[dungeonObj['difficulty']].clear = dungeonObj['completedCount']
          obj[dungeonObj['difficulty']].total = dungeonObj['totalCount']
          obj[dungeonObj['difficulty']].percent = dungeonObj['completedCount'] / dungeonObj['totalCount'] * 100
        }
      })
      return obj
    }
  },
  props: {
    dungeon: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
  .custom-gradient {
    height: 28px;
    background-image: linear-gradient(to top, rgba(0, 0, 0, 0.5), rgba(255, 255, 255, 0)); /* Standard syntax (must be last) */
  }
</style>
