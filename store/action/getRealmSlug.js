export function getRealmSlug(store){
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

function getRealmSlugList(rawData){
  let data = []
  rawData.realms.forEach(realm => {
    let tmp = {
      slug: realm['slug'],
      ko_KR: realm['name']['ko_KR'],
      en_US: realm['name']['en_US']
    }
    data.push(tmp)
  })
  return data
}
