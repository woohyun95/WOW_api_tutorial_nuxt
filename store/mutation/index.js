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
  }
}
