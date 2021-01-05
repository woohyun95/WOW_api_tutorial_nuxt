<template>
  <div>
    <div v-if="item">
      <span :style="itemColor">{{item['name']}}</span><br>
      <div v-if="hasLimitCategory">
        <span>{{item['limit_category']}}</span>
      </div>
      <div v-if="hasNameDescription">
        <span style="color:greenyellow">{{item["name_description"]['display_string']}}</span><br>
      </div>
      <div v-if="isTransMogged">
        <span>{{item['transmog']['display_string']}}</span>
      </div>
      <span>{{item['level']['display_string']}}</span><br>
      <span>{{item['binding']['name']}}</span><br>
      <span>{{item['inventory_type']['name']}}</span><br>
      <div v-if="hasStatus">
        <div
          v-for="status in item['stats']"
        >
          <div v-if="status['is_negated']">
            <span style="color: rgba(179,179,179,0.5)">{{status['display']['display_string']}}</span>
          </div>
          <div v-else>
            <span
              v-if="status['type']['name'] ==='체력'
              ||status['type']['name'] ==='힘'
              ||status['type']['name'] ==='지능'
              ||status['type']['name'] ==='민첩성'"
              style="color:white">{{status['display']['display_string']}}
            </span>
            <span v-else style="color:#c1f15d">{{status['display']['display_string']}}</span>
          </div>
        </div>
        <div v-if="hasEnchant">
          <br>
          <span
            v-for="enchant in item['enchantments']"
            style="color: #c1f15d"
          >{{enchant['display_string']}}<br></span></div>
      </div>
      <div v-if="AzeriteGear">
        <div v-if="AzeriteNecklace">
          <span
            v-for="essence in AzeriteNecklace"
            style="color: #ff8400"
          >
            <span>{{essence['essence']['name']}}</span><br>
          </span>
        </div>
        <div v-else>
          <span style="color: #ffd500">{{item['azerite_details']['selected_powers_string']}}</span><br>
          <span
            v-for="spell in reversedAbility"
          >
          <span>-{{spell['spell_tooltip']['spell']['name']}}</span><br>&nbsp&nbsp
         <span style="color: greenyellow">{{spell['spell_tooltip']['description']}}</span><br>
        </span>
        </div>
      </div>
      <div v-if="hasSpell">
        <br>
        <span v-for="spell in item['spells']" style="color: #c1f15d">{{spell['description']}}<br></span>
      </div>
      <div v-if="hasSocket">
        <br>
        <div v-for="socket in item['sockets']">
          <span style="color: #ffe6b5">{{socket['item']['name']}}</span>:&nbsp
          <span>{{socket['display_string']}}</span>
        </div>
      </div>
      <div v-if="hasSet">
        <span style="color: gold"><br>{{item['set']['display_string']}}</span>
        <span v-for="itemPart in item['set']['items']" style="color:palegoldenrod"><br>{{itemPart['item']['name']}}</span>
        <span v-for="effect in item['set']['effects']" style="color: #c1f15d"><br><br>{{effect['display_string']}}</span>
      </div>
    </div>
    <div v-else>
      장착 아이템 없음
    </div>
  </div>
</template>

<script>
  export default {
    name: "GearSpec",
    data() {
      return {

      }
    },
    computed: {
      item(){
        return this.gearData['gearData']
      },
      hasSet(){
        return this.item['set']
      },
      hasSocket(){
        return this.item['sockets']
      },
      hasEnchant(){
        return this.item['enchantments']
      },
      hasLimitCategory(){
        return this.item['limit_category']
      },
      hasNameDescription() {
        return this.item['name_description']
      },
      isTransMogged() {
        return this.item['transmog']
      },
      hasStatus() {
        return this.item['stats']
      },
      AzeriteGear() {
        return this.item['azerite_details']
      },
      AzeriteNecklace() {
        return this.item['azerite_details']['selected_essences']
      },
      reversedAbility() {
        return this.item['azerite_details']['selected_powers'].slice().reverse()
      },
      hasSpell(){
        return this.item['spells']
      },
      itemColor() {
        let itemColor = this.$store.state.itemQualityRGBA

        let itemQuality = (this.gearData.hasOwnProperty('gearData')) ? this.gearData['gearData']['quality']['type'] : 'POOR'

        function getStyleObject(itemQuality) {
          return {
            color: `rgba(
              ${itemColor[itemQuality][0]+60},
              ${itemColor[itemQuality][1]+60},
              ${itemColor[itemQuality][2]+60},
              ${itemColor[itemQuality][3]})
              !important`
          }
        }

        return getStyleObject(itemQuality)
      }
    },
    props: {
      gearData: {
        type: Object,
        required: true
      }
    }
  }
</script>
<style scoped>
</style>
