<template>
  <div>
    <search-box></search-box>
    <name-plate></name-plate>
    <raid-process-card-iter> </raid-process-card-iter>
  </div>

</template>

<script>
  import NamePlate from "../components/NamePlate";
  import SearchBox from "../components/SearchBox";
  import RaidProcessCardIter from "../components/RaidProcessCardIter";
  export default {
    components: {
      RaidProcessCardIter,
      SearchBox,
      NamePlate
    },
    data() {
      return {
      }
    }
  }
</script>
