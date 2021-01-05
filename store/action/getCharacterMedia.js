export function getCharacterMedia(store){
  this.$axios.$get('https://kr.api.blizzard.com/data/wow/realm/index',{
    params:{
      region:'kr',
      namespace:'dynamic-kr',
      locale:'ko-KR',
      access_token:store.state.accessToken
    }
  })
    .then(function (result) {
      store.commit('setRealmSlugList',getRealmSlugList(result))
    })
    .catch(function (error) {
      console.log(error)
    })
}
