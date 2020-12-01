<template>
  <div>
    <search-box></search-box>
    <name-plate></name-plate>
  </div>

</template>

<script>
  import NamePlate from "../components/NamePlate";
  import SearchBox from "../components/SearchBox";
  export default {
    components: {
      SearchBox,
      NamePlate
    },
    data() {
      return {
      }
    }
  }
</script>
