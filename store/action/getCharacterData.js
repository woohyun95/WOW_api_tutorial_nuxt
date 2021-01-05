import waterfall from 'async/waterfall.js'
import every from 'async/every.js'
export function getCharacterData(store, payload) {
  let This = this
  waterfall([
    getProfile,
    getCharacterImage,
    getDungeonProgress,
    getGearData,
    getGearMedia,
    gatherGearData,
    commitData
  ], function (err, result) {
    //console.log(`err=${err}, result=${result}`)
  })

  function getProfile(callback) {
    This.$axios.$get(`https://kr.api.blizzard.com/profile/wow/character/${payload.realmSlug}/${payload.characterName}`, {
      params: {
        region: 'kr',
        namespace: 'profile-kr',
        locale: 'en_US',
        access_token: store.state.accessToken
      }
    })
      .then(function (response) {
        callback(null, getProfileData(response))
      })
      .catch(function (error) {
       // console.log(error)
        callback('profile axios error')
      })
  }

  function getCharacterImage(characterData, callback) {
    let characterImage = {}
    This.$axios.$get(`https://kr.api.blizzard.com/profile/wow/character/${payload.realmSlug}/${payload.characterName}/character-media`, {
      params: {
        region: 'kr',
        namespace: 'profile-kr',
        locale: 'en_US',
        access_token: store.state.accessToken
      }
    })
      .then(function (response) {
        if (response.hasOwnProperty('assets')) {
          characterImage = getCharacterMediaUrl_New(response)
        } else {
          characterImage = getCharacterMediaUrl_Old(response)
        }
        let charData = {characterData, characterImage}
        callback(null, charData)
      })
      .catch(function (error) {
        //console.log(error)
        callback('characterMedia axios error')
      })
  }

  function getDungeonProgress(characterData, callback) {
    This.$axios.$get(`https://kr.api.blizzard.com/profile/wow/character/${payload.realmSlug}/${payload.characterName}/encounters/raids`,
      {
        params: {
          region: 'kr',
          namespace: 'profile-kr',
          locale: 'ko-KR',
          access_token: store.state.accessToken,
        }
      })
      .then(function (result) {
        let dungeonProgress = {['dungeonProgress']: progressData.getRaidProgress(result)}
        Object.assign(characterData, dungeonProgress)
        callback(null, characterData)
      })
      .catch(function (error) {
        //console.log(error)
        callback('dungeon data axios error')
      })
  }

  function getGearData(characterData, callback) {
    This.$axios.$get(`https://kr.api.blizzard.com/profile/wow/character/${payload.realmSlug}/${payload.characterName}/equipment`, {
      params: {
        region: 'kr',
        namespace: 'profile-kr',
        locale: 'ko_KR',
        access_token: store.state.accessToken
      }
    })
      .then(function (result) {
        let characterGearData = {['characterGearData']: result['equipped_items']}
        Object.assign(characterData, characterGearData)
        callback(null, characterData)
      })
      .catch(function (error) {
        //console.log(error)
      })
  }

  function getGearMedia(characterData, callback) {
    let characterGearMedia ={}
    let count = 0;
    every(characterData.characterGearData, function(gear,callback){
      This.$axios.$get(`https://kr.api.blizzard.com/data/wow/media/item/${gear['media']['id']}`, {
          params: {
            namespace: "static-kr",
            locale: "ko_KR",
            access_token:store.state.accessToken
          }
        }
      )
        .then(function (response) {
          count++
          Object.assign(characterGearMedia, addSubObj(gear['slot']['type'],response['assets'][0]['value']))
          callback(null,true)
        })
        .catch(function (error){
          callback('gear image axios error',false)
        })
    }, function(err, result){
      Object.assign(characterData,addSubObj('gearImage',characterGearMedia))
      callback(null,characterData)
    })
  }

  function gatherGearData(characterData, callback) {
    let gearData = [
      {
        gearType: 'HEAD'
      },
      {
        gearType: 'NECK'
      },
      {
        gearType: 'SHOULDER'
      },
      {
        gearType: 'SHIRT'
      },
      {
        gearType: 'CHEST'
      },
      {
        gearType: 'WAIST'
      },
      {
        gearType: 'LEGS'
      },
      {
        gearType: 'FEET'
      },
      {
        gearType: 'WRIST'
      },
      {
        gearType: 'HANDS'
      },
      {
        gearType: 'FINGER_1'
      },
      {
        gearType: 'FINGER_2'
      },
      {
        gearType: 'TRINKET_1'
      },
      {
        gearType: 'TRINKET_2'
      },
      {
        gearType: 'BACK'
      },
      {
        gearType: 'MAIN_HAND'
      },
      {
        gearType: 'OFF_HAND'
      },
      {
        gearType: 'TABARD'
      },
    ]
    gearData.forEach(gearType=>{
      characterData['characterGearData'].forEach(gear=>{
        if(gear['slot']['type'] === gearType['gearType']){
          Object.assign(gearType, addSubObj('gearData', gear))
        }
      })
    })
    Object.assign(characterData,addSubObj('gearSlot',gearData))
    callback(null,characterData)
  }

  function commitData(characterData) {
    store.commit('setSearchInfo', payload)
    store.commit('setCharacterProfile',characterData['characterData'])
    store.commit('setCharacterMedia', characterData['characterImage'])
    store.commit('setRaidProgressData', characterData['dungeonProgress'])
    store.commit('setGearImage', characterData['gearImage'])
    store.commit('setCharacterGearData', characterData['characterGearData'])
    store.commit('setCharacterGearSlot', characterData['gearSlot'])
  }
}

function getProfileData(rawData) {
  let profile = {
    faction: rawData['faction']['type'],
    title: '',
    realm: rawData['realm']['name'],
    active_spec: rawData['active_spec']['name'],
    race: rawData['race']['name'],
    character_class: rawData['character_class']['name'],
    equipped_item_level: rawData['equipped_item_level'],
    guild: '',
    level: rawData['level'],

  }
  if (rawData.hasOwnProperty('active_title')) {
    profile['title'] = rawData['active_title']['name']
  }
  if (rawData['guild'].hasOwnProperty('name')) {
    profile['guild'] = rawData['guild']['name']
  }
  return profile
}

function getCharacterMediaUrl_Old(rawData) {
  let mediaUrl = {
    bust: rawData['bust_url'],
    avatar: rawData['avatar_url'],
    render: rawData['render_url']
  }
  return mediaUrl
}

function getCharacterMediaUrl_New(rawData) {
  let mediaUrl = {}
  rawData['assets'].forEach(img => {
    mediaUrl[img['key']] = img['value']
  })
  return mediaUrl
}

let progressData = {
  raidProgress: [],
  getRaidProgress: function (rawData) {
    this.raidProgress = this.getRaidProgressData(rawData)
    return this.raidProgress
  },
  getInstanceData: function (data, dungeonName, dungeonId) {
    if (data.difficulty.type === 'LEGACY_10_MAN_HEROIC') {
      data.difficulty.type = 'HEROIC'
    } else if (data.difficulty.type === 'LEGACY_25_MAN_HEROIC') {
      data.difficulty.type = 'HEROIC'
    } else if (data.difficulty.type === 'LEGACY_10_MAN') {
      data.difficulty.type = 'NORMAL'
    } else if (data.difficulty.type === 'LEGACY_25_MAN') {
      data.difficulty.type = 'NORMAL'
    }

    let instanceData = {
      name: dungeonName,
      id: dungeonId,
      difficulty: data.difficulty.type,
      status: data.status.type,
      completedCount: data.progress.completed_count,
      totalCount: data.progress.total_count,
      bossData: []
    }
    data.progress.encounters.forEach(boss => {
      instanceData.bossData.push(boss)
    })
    return instanceData
  },
  getDungeonData: function (data) {
    let data_sorted_by_difficulty = []
    let dungeonName = data.instance.name
    let dungeonId = data.instance.id
    data.modes.forEach(difficulty => {
      data_sorted_by_difficulty.push(this.getInstanceData(difficulty, dungeonName, dungeonId))
    })
    return data_sorted_by_difficulty
  },
  getExpansionData: function (data) {//rawData.expansions[]
    let expansionData = {
      expansionName: data.expansion.name,
      dungeonData: []
    }
    data.instances.forEach(dungeon => {
      expansionData.dungeonData.push(this.getDungeonData(dungeon))
    })
    return expansionData
  },
  getRaidProgressData: function (data) {
    let RaidProgress = []
    //console.log(data.expansions)
    if (data.hasOwnProperty('expansions')) {
      data.expansions.forEach(expansion => {
        RaidProgress.push(this.getExpansionData(expansion))
      })
    }
    return RaidProgress
  }
}

function addSubObj(key, value) {
  return {[key]: value}
}

