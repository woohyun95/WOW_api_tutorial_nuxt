export function getCharacterProfile(store){
  this.$axios.$get(`https://kr.api.blizzard.com/profile/wow/character/${store.state.realmSlug}/${store.state.characterName}`,{
    params:{
      region:'kr',
      namespace:'profile-kr',
      locale:'en_US',
      access_token: store.state.accessToken
    }
  })
    .then(function (response) {
      store.commit('setCharacterProfile',getProfileData(response))
    })
    .catch(function (error) {
      console.log(error)
    })
}

function getProfileData(rawData){
  let profile ={
    faction: rawData['faction']['type'],
    title:'',
    realm: rawData['realm']['name'],
    active_spec: rawData['active_spec']['name'],
    race: rawData['race']['name'],
    character_class: rawData['character_class']['name'],
    equipped_item_level: rawData['equipped_item_level'],
    guild:'',
    level: rawData['level'],

  }
  if(rawData.hasOwnProperty('active_title')){
    profile['title'] = rawData['active_title']['name']
  }
  if(rawData['guild'].hasOwnProperty('name')){
    profile['guild'] = rawData['guild']['name']
  }
  return profile
}
