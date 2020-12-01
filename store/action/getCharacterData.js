export function getCharacterData(store,payload){
  store.commit('setSearchInfo',payload)
  store.dispatch('getCharacterProfile')
}
