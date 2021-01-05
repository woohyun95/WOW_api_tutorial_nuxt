export default {
  setAccessToken(state, payload) {
    state.accessToken = payload
  },
  setRealmSlugList(state, payload) {
    state.realmSlugList = payload
  },
  setCharacterProfile(state, payload) {
    state.characterProfile = payload
  },
  setSearchInfo(state,payload){
    state.characterName = payload['characterName']
    state.realmSlug = payload['realmSlug']
  },
  setRaidProgressData(state, payload) {
    state.hasRaidProgressData = false
    state.raidProgressData = payload
    state.hasRaidProgressData = true
  },
  setRawData(state, payload) {
    state.rawData = payload
  },
  setImgUrl(state, payload) {
    state.dungeonImageData = payload;
  },
  setCharacterMedia(state,payload){
    state.characterMedia = payload
  },
  setCharacterGearData(state, payload){
    state.characterGearData = payload
  },
  setCharacterGearSlot(state, payload){
    state.characterGearSlot = payload
    state.characterGearSlot.push(1)
    state.characterGearSlot.pop()
  },
  setGearImage(state,payload){
    state.gearImage = payload
  }
}

