<template>
  <v-form>
    <v-container>
      <v-layout>
        <v-flex xs4>
        </v-flex>
        <v-flex
          xs4
          md1
          mr-1
        >
          <v-select
            v-model="characterData.realmSlug"
            :items="realms"
            item-text="ko_KR"
            item-value="slug"
            label="서버 이름"
            solo
          ></v-select>
        </v-flex>
        <v-flex
          xs4
          md4
        >
          <v-text-field
            v-model="characterData.characterName"
            placeholder="캐릭터 이름"
            :append-outer-icon="'mdi-magnify'"
            type="text"
            @click:append-outer = "getData"
            solo
          ></v-text-field>
        </v-flex>
        <v-flex
          xs4
          md4
          align-center
        >
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
</template>
<script>
  export default {
    name: "SearchBox",
    data(){
      return{
        characterData: {
          characterName: '',
          realmSlug: ''
        }
      }
    },
    methods:{
      getData(){
        this.$store.dispatch('getCharacterData',this.getSearchData())
      },
      getSearchData(){
        return {
          characterName : this.characterData['characterName'],
          realmSlug : this.characterData['realmSlug']
        }
      }
  },
    computed:{
      realms(){
        return this.$store.state.realmSlugList
      }
    }
  }
</script>

<style scoped>

</style>
