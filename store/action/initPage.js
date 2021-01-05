import auto from 'async/auto.js'
import secret from "../apiAccount"

export function initPage(store, callback) {
  let vueThis = this
  auto({
    get_token: getToken,
    get_realm_data: ['get_token', getRealmData],
    get_dungeon_image: ['get_token', getDungeonImg],
    commit_data: ['get_token', 'get_realm_data', 'get_dungeon_image', commitData]
  }, function (err, results) {
    //console.log('err = ', err)
    //console.log('results = ', results)
  })

  function getToken(callback) {
    let data = `client_id=${secret.clientID}&client_secret=${secret.clientSecret}&grant_type=client_credentials`
    vueThis.$axios.$post('https://us.battle.net/oauth/token', data)
      .then(function (response) {
        //onsole.log(response.access_token)
        callback(null, response)
      })
      .catch(function (error) {
        //console.log(error)
        callback('get Token Axios Error')
      })
  }

  function getRealmData(tokenData, callback) {


    vueThis.$axios.$get('https://kr.api.blizzard.com/data/wow/realm/index', {
      params: {
        region: 'kr',
        namespace: 'dynamic-kr',
        locale: 'ko-KR',
        access_token: tokenData['get_token']['access_token']
      }
    })
      .then(function (result) {
        let realmData = getRealmSlugList(result)
        callback(null, realmData)
      })
      .catch(function (error) {
        //console.log(error)
        callback('realm data Axios Error')
      })
  }


  function getDungeonImg(tokenData, callback) {
    let dungeonImg = {}
    let dungeon = store.state.dungeonIdList
    for (let id = 0; id < store.state.dungeonIdList.length; id++) {
      vueThis.$axios.$get(`https://kr.api.blizzard.com/data/wow/media/journal-instance/${dungeon[id]}`, {
        params: {
          namespace: 'static-kr',
          locale: 'ko_KR',
          access_token: tokenData['get_token']['access_token']
        }
      })
        .then(function (response) {
          let imageData = {
            id: dungeon[id],
            url: response.assets[0].value
          }
          dungeonImg[`${imageData.id}`]= imageData.url;

        })
        .catch(function (error) {
          //console.log(error)
          callback('dungeonImg Axios error')
        })
    }
    callback(null, dungeonImg)
  }

  async function commitData(result, callback) {
    store.commit('setAccessToken', result['get_token']['access_token'])
    store.commit('setRealmSlugList', result['get_realm_data'])
    store.commit('setImgUrl', result['get_dungeon_image'])
    callback(null)
  }
}


function getRealmSlugList(rawData) {
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

