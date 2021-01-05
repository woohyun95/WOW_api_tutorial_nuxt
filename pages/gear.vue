<template>
  <div>
    <search-box></search-box>
    <name-plate></name-plate>
    <character-gear></character-gear>
  </div>
</template>

<script>
  import SearchBox from "../components/SearchBox";
  import CharacterGear from "../components/CharacterGear";
  import NamePlate from "../components/NamePlate";
  export default {
    name: "characterPage",
    components: {
      CharacterGear,
      NamePlate,
      SearchBox
    }
  }
</script>

<style scoped>

</style>
